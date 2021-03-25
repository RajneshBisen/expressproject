const  express = require('express');
const  router = express.Router();
const studentModel=require('../modules/student');
const uploadModel=require('../modules/upload')
const multer=require('multer');
const path  = require('path');
const student=studentModel.find({});
const imageData=uploadModel.find({});
const jwt=require('jsonwebtoken')
router.use(express.static(__dirname+"./public/"))
if (typeof localStorage === "undefined" || localStorage === null) {
  const LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}
//upload
const Storage=multer.diskStorage({
  destination:"./public/uploads/",
  filename:(req,file,cb)=>{
  cb(null,file.fieldname + "_"+Date.now()+path.extname(file.originalname))
}
})
const uploads=multer({
  storage:Storage
}).single('file');
router.post('/upload/',uploads, function(req, res, next) {
  const imagfile=req.file.filename;
  const success=req.file.filename +" uploaded Successfully";
  const imagedetial=new uploadModel({
    imageName:imagfile
  })
  imagedetial.save(function(err,doc){
    if(err) throw err;
    imageData.exec((err,data)=>{
      if(err)throw err;
      res.render('upload-file', { title: 'Upload File',records:data, success:success} );

    })
  })

});


router.get('/upload', function(req, res, next) {
  // student.exec(function(err,data){
  //   if(err) throw err
  if(err) throw err;
    imageData.exec((err,data)=>{
      if(err)throw err;
    res.render('upload-file', { title: 'Upload File', records:data, success:''});
    });
  });
 


/* GET home page. */
router.get('/',checklogin,function(req, res, next) {
  student.exec(function(err,data){
    if(err) throw err
    res.render('index', { title: 'Student Details',records:data, success:''});
  });
 
});


function checklogin(req,res,next){
  const mytoken=localStorage.getItem('mytoken')

  try{
    jwt.verify(mytoken,'loginToken');

  }
  catch(err)
  {
    res.send('You Neeed To to Access This Page');
  }
  next();
}
router.post('/',function(req,res,next){

  const stdDetails = new studentModel({
    stdName:req.body.stdname,
    email:req.body.Email,
    age:req.body.Age,
    afterage:req.body.Afterage,
    mobileNo:req.body.MobileNo,
  });
console.log(stdDetails)
stdDetails.save(function(err,res1){
  if(err)throw err;
  else
  console.log(res1)
  student.exec(function(err,data){
  if(err) throw err
  res.render('index', { title: 'Student Details',records:data, success:'Record Inserted SuccessFully'});
});
})
//console.log(stdDetails)
// student.exec(function(err,data){
//   if(err) throw err
//   res.render('index', { title: 'Student Details',records:data});
// });
})
router.post('/search',function(req,res,next){
  const flterStdName=req.body.fltrstdName;
  const fltrEmail=req.body.fltremail;
  const fltrmobileNO=req.body.fltrmobile;
  let flterParameter='';
  if(flterStdName !='' && fltrEmail !='' && fltrmobileNO !=''){
    flterParameter={$and:[{stdName:flterStdName},
    {$and:[{email:fltrEmail},{mobileNo:fltrmobileNO}]}
    ]}
  }
  else if(flterStdName !='' && fltrEmail !='' && fltrmobileNO !='')
  {
    flterParameter={$and:[{stdName:flterStdName},{mobileNo:fltrmobileNO}]};
      
  }
  else if(flterStdName !='' && fltrEmail !='' && fltrmobileNO !='')
  {
    flterParameter={$and:[{email:fltrEmail},{mobileNo:fltrmobileNO}]};
  }
  else{
    flterParameter={};
  }
  const studentfltr=studentModel.find(flterParameter);
  studentfltr.exec(function(err,data){
  if(err) throw err
  res.render('index', { title: 'Student Details',records:data, success:'Record Inserted SuccessFully'});
});
}); 

router.get('/delete/:id', function(req, res, next) {
  const id=req.params.id;
  const del=studentModel.findByIdAndDelete(id)
  del.exec(function(err,data){
    if(err) throw err
    res.redirect('/')
   // res.render('index', { title: 'Student Record Deleted',records:data});
  });
 
});

router.get('/edit/:id', function(req, res, next) {
  const id=req.params.id;
  const edit=studentModel.findById(id)
  edit.exec(function(err,data){
    if(err) throw err
    //res.redirect('/')
   res.render('edit', { title: 'Student Record Edited',records:data});
  });
 
});

router.post('/update/', function(req, res, next) {
  //const id=req.params.id;
  let update=studentModel.findByIdAndUpdate(req.body.id,{
    stdName:req.body.stdname,
    email:req.body.Email,
    age:req.body.Age,
    afterage:req.body.Afterage,
    mobileNo:req.body.MobileNo,
  });
  console.log(update)
  update.exec(function(err,data){
  if(err) throw err
  //res.redirect('/')
   res.render('index', { title: 'Student Record ',records:data, success:'Record Update Successfully'});
  });
});

//console.log(stdDetails)
// student.exec(function(err,data){
//   if(err) throw err
//   res.render('index', { title: 'Student Details',records:data});
// });

router.get('/login', function(req, res, next) {
  
  const token=jwt.sign({foo:'bar'},'loginToken');
  localStorage.setItem('mytoken', token);
 res.send('Login Successfully')
});
router.get('/logout', function(req, res, next) {
  localStorage.removeItem('mytoken')
  res.send('Logout Successfully')
});


module.exports = router;
