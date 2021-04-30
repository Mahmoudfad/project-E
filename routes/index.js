var express = require('express');
var router = express.Router();
const csv = require('csv-parser')
const fs = require ('fs')
const multer  = require('multer');
const translate = require('@vitalets/google-translate-api');
var listSchema = require ('../schema/list')
var result = []

fs.createReadStream("routes/Classeur1.csv").pipe(csv({
  mapHeaders: ({ header , index }) =>
  translate(header, {to: 'en'}).then(res => {
// console.log(res.text);
 let rp =res.text.replace(/\s/g, '')

})

}))
.on('data', (data) => result.push(data))
.on('end', () => {
  // console.log(result);


});




module.exports = router;
