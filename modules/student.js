const mongoose = require('mongoose');
const { router } = require('../app');
mongoose.connect('mongodb+srv://m001:m001@sandbox.qhxgb.mongodb.net/student?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
const connect=mongoose.connection;
const studentSchema=new mongoose.Schema({
    stdName:String,
    email:String,
    age:Number,
    afterage:Number,
    mobileNo:Number
});

const studentModel=mongoose.model('student',studentSchema);

// studentSchema.methods.totalage=function (){
//     console.log("After Age of",this.stdName," 5 Year",this.age + this.afterage)
// }
module.exports=studentModel;