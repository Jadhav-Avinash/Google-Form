require('dotenv').config();

const express=require('express');
const mongoose =require('mongoose');
const path=require('path');
const bodyParser=require('body-parser');

// console.log("my name is ", process.env.myname);
const app=express();

app.use(bodyParser.urlencoded({extended: false}));

const port= process.env.port || 3000;

app.use(express.static(path.join(__dirname,'public')));
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/Google_form.html');
})

console.log(__dirname+'/public/Google_form.html' );

mongoose.connect(process.env.Mongo_url).then(()=>{console.log('MongoDB Connected...');})

    const Schema=mongoose.Schema;

    const dataschema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    middlename: {
        type: String
    },
    lastname: {
        type: String,
        required: true
    },
    contactnumber: {
        type: String, // Assuming contact numbers might include characters like '+' or '-'
        required: true
    },
    altcontactnumber: {
        type: String
    },
    mail: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true
    },
    maritalstatus: {
        type: String,
        enum: ['Married', 'Unmarried', 'notprefer'],
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    blood_group: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Data', dataschema);


    const Data=mongoose.model('Data',dataschema);

    app.post('/submit', (req, res) => {
    const {
        firstname,
        middlename,
        lastname,
        contactnumber,
        altcontactnumber,
        mail,
        dob,
        gender,
        maritalstatus,
        nationality,
        blood_group
    } = req.body;

    // Create a new instance of the Data model
    const newData = new Data({
        firstname,
        middlename,
        lastname,
        contactnumber,
        altcontactnumber,
        mail,
        dob,
        gender,
        maritalstatus,
        nationality,
        blood_group
    });
        newdata.save();
        res.send('Data submitted successfully');
        res.redirect('/result.html');
        
    })
        
app.listen(port,()=>{
    console.log(`server listening on port ${port}`);
})