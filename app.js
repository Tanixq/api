const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./src/routes')
const app = express()

// Connect to mongodb
require('./db')

app.use(bodyParser.json())

console.log("in app js");
app.use('/api', routes)

let port = process.env.PORT
if (port == null || port == "") {
  port = 5000
}
app.listen(port, function (reqest, response) {
  console.log(`Server Started Sucessfully on Port ${port} !`);
});