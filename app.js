'use strict';
require('dotenv').config();
const request = require('request');
const uuidv4 = require('uuid/v4');
const express = require('express');
const app = express();
const http = require('http').Server(app);

const PORT = process.env.PORT || 3000;
const server = http.listen(PORT, ()=>{
  console.log(`server is listening on ${PORT}`);
});

const io = require('socket.io')(http);
io.on('connection',function(socket){
  console.log('connected');
  socket.on('recognize', (str)=>{
    console.log(str);

    //翻訳
    translate(str).then((str)=>{
      console.log("send translated text");
      io.emit('message', str);
    })
  })
});

app.set('view engine', 'ejs');
app.get("/", (req, res, next)=>{
  res.render("index", {});
})

app.get("/recognition", (req, res, next)=>{
  res.render("recognition", {});
})

app.get("/synthesis", (req, res, next)=>{
  res.render("synthesis", {});
})

function translate(_text){
  return new Promise((resolve, reject)=>{
    const subscriptionKey = process.env.TRANSLATOR_TEXT_KEY;
    if (!subscriptionKey) {
      throw new Error('Environment variable for your subscription key is not set.')
    };
    let options = {
      method: 'POST',
      baseUrl: 'https://api.cognitive.microsofttranslator.com/',
      url: 'translate',
      qs: {
        'api-version': '3.0',
        'to': 'ja'
      },
      headers: {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        'Content-type': 'application/json',
        'X-ClientTraceId': uuidv4().toString()
      },
      body: [{
        'text': _text
      }],
      json: true,
    };
    
    request(options, function(err, res, body){
      if(err) {
        console.log(err);
        return 
      }
      let json = JSON.stringify(body, null, 4); 
      let data = JSON.parse(json);
      resolve(data[0]["translations"][0]["text"]);
    
    });
  })
}