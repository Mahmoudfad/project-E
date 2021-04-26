var express = require('express');
var router = express.Router();
const csv = require('csv-parser')
const fs = require ('fs')
const translate = require('@vitalets/google-translate-api');
var listSchema = require ('../schema/list')
var result = []
var tra = []

router.post('/add',  (req, res , next)=>{
  // convert to json 
fs.createReadStream('routes/Classeur1.csv')
.pipe(csv())
.on('data', (data) => result.push(data))
.on('end', () => {
  console.log(result);

  // transtale 
  translate(result, {to: 'en'}).then(tra => {
    console.log(tra.text);  
})

});
 
tra.forEach(element => {
  const list = new listSchema({
    firstName: element.prenom,
    lastName: element.nom,
    age: element.age,
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