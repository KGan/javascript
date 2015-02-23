var express = require('express')
var app = express()

app.use("" + __dirname + "/app")
app.listen(process.env.PORT || 5000)
