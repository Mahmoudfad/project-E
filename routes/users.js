// var express = require('express');
// var router = express.Router();
// let csvToJson = require('convert-csv-to-json');
// var langdetect = require('langdetect');

// console.log(langdetect.detect('Questo a che ora comincia '));

// let fileInputName = 'Classeur1.csv'; 
// let fileOutputName = 'myOutputFile.json';

// csvToJson.generateJsonFileFromCsv(fileInputName,fileOutputName);

var express = require('express');
var router = express.Router();
const csvtojson = require ('csvtojson')
const fs = require ('fs')
const path = require ('path');
const { json } = require('express');
const { Schema } = require('mongoose');
var listSchema = require ('../schema/list')


const csvfilepath = path.resolve('./csv', 'Classeur1.csv');

csvtojson()
.fromFile(csvfilepath)
.then((json)=>{
  console.log(json);

})







module.exports = router;