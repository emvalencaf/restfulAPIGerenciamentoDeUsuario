
const express = require('express')
const consign = require('consign')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

//vai incluir todos os arquivos da pasta routes ao app
consign().include('./src/routes').include('./src/utils').into(app)



module.exports = app