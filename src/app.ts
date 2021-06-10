require("dotenv").config()
var mode = process.env.MODE

import fs from "fs"
import path from "path"
import express from "express"
import https from "https"
import http from "http"
import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_DB, {
    'useFindAndModify': true,
    'useUnifiedTopology': true,
    'useNewUrlParser': true,
})

const countdownClock = require('./schema/clockSchema')

const app = express();
const routes = require("./routes")

app.set('views', path.join(__dirname, '../src/views'))
app.set('view engine', 'ejs');
app.use('/', routes)

if(mode == "LIVE){
  const httpServer = http.createServer(app);
  const httpsServer = https.createServer({
    key: fs.readFileSync(`/etc/letsencrypt/live/${process.env.DOMAIN_NAME}/privkey.pem`),
    cert: fs.readFileSync(`/etc/letsencrypt/live/${process.env.DOMAIN_NAME}/fullchain.pem`),
  }, app);
  
  httpServer.listen(80, () => {
      console.log('HTTP Server running on port 80');
  });
  
  httpsServer.listen(443, () => {
      console.log('HTTPS Server running on port 443');
  });
} else {
  app.listen(80, (() => {
    console.log('App listening on port ' + 80)
  }))
}
