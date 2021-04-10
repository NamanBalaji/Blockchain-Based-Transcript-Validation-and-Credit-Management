const express = require("express");
const mongoose = require("mongoose");
const{MONGOURI} = require('./config/keys');
const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(MONGOURI, {useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true, useFindAndModify: false})
.catch(err => console.log(err));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });


app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})

module.exports = { app };