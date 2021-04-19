var express = require('express');
var router = express.Router();
const csv = require('csv-parser')
const fs = require ('fs')
const path = require ('path');
const { json } = require('express');
const { Schema } = require('mongoose');
var listSchema = require ('../schema/list')
const translate = require('@vitalets/google-translate-api');
const list = {}
var result = []

router.post('/add',  (req, res)=>{
  fs.createReadStream('Classeur1.csv')
  .pipe(csv())
  .on('data', (data) => result.push(data))
  .on('end', () => {
    console.log(result);
   
  });
result.forEach(element => {
 list = new listSchema({
    nom: element.nom,
    prenom: element.prenom,
    age: element.age,
    email: element.email
   })
   list.save().then(x=>{
    res.json({message:"sent"})})

}).catch(err=>{res.send(err)})
})







translate('prenom', {to: 'en'}).then(res => {
    console.log(res.text);
    console.log(res.from.language.iso);
})
// .catch(err => {
//     console.error(err);
// });







module.exports = router;