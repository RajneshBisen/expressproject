const mongoose = require('mongoose');
const { router } = require('../app');
mongoose.connect('mongodb+srv://m001:m001@sandbox.qhxgb.mongodb.net/student?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
const connect=mongoose.connection;

const uploadSchema=new mongoose.Schema({
   imageName:String,

});
const uploadModel=mongoose.model('uploadimage',uploadSchema);


module.exports=uploadModel;