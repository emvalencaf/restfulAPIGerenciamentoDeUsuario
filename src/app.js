
const express = require('express')
const consign = require('consign')
const bodyParser = require('body-parser')



const app = express()

app.use(bodyParser.json({limit:'2mb'}))
app.use(bodyParser.urlencoded({extended: false, limit: '2mb'}))


//vai incluir todos os arquivos da pasta routes ao app
consign().include('./src/routes').include('./src/utils').into(app)

module.exports = app