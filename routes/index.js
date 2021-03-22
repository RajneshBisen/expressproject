const  express = require('express');
const  router = express.Router();
const studentModel=require('../modules/student');

const student=studentModel.find({});

/* GET home page. */
router.get('/', function(req, res, next) {
  student.exec(function(err,data){
    if(err) throw err
    res.render('index', { title: 'Student Details',records:data});
  });
 
});

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


module.exports = router;
