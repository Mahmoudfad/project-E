var express = require('express');
var router = express.Router();
const csv = require('csv-parser')
const fs = require ('fs')
const multer  = require('multer');
const translate = require('@vitalets/google-translate-api');
var listSchema = require ('../schema/list')
var result = []
const storage = multer.diskStorage({
  destination: function (req, file, cb) { 
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+ '-' +  file.originalname  )
  }
})

const upload = multer({ storage: storage })

router.post('/add' ,upload.single('file'),  (req, res , next)=>{
  // convert to json 

fs.createReadStream(req.file.path)
.pipe(csv({
  mapHeaders: ({ header, index }) =>
  translate(header, {to: 'en'}).then(res => {
    res.text.replace(/\s/g, '')
    console.log(res.text);
    result.push(res.text)    
})
}))
.on('data', (data) =>{})
.on('end', () => {
  console.log(result);
});
setTimeout(() => {
  result.forEach(element => {
    const list = new listSchema({
      firstName: element.firstname,
      lastName: element.lastname ,
      age: element.age   ,
      email: element.email
     })
     list.save().then(x=>{
   
    }).catch(err=>res.send(err))
    
    })
}, 1500);

  res.status(201).json({
    message: " successfully",

});
});







// translate('prenom', {to: 'en'}).then(res => {
//     console.log(res.text);
//     console.log(res.from.language.iso);
// })








module.exports = router;