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
.pipe(csv())
.on('data', (data) => result.push(data))
.on('end', () => {
  console.log(result);


});
 
result.forEach(element => {
  const list = new listSchema({
    firstName: element.prenom || element.nome || element.الاسم,
    lastName: element.nom || element.cognome ||element.اللقب || element.nomDeFamille ,
    age: element.age || element.età || element.العمر  ,
    email: element.email
   })
   list.save().then(x=>{
    res.json(x)
  }).catch(err=>res.send(err))

  })
});







// translate('prenom', {to: 'en'}).then(res => {
//     console.log(res.text);
//     console.log(res.from.language.iso);
// })








module.exports = router;