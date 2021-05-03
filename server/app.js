const express = require("express");
const mongoose = require("mongoose");
const{MONGOURI} = require('./config/keys');
const Certificates = require("./model/certificate");
const authRoutes = require('./routes/auth');
const certificateRoutes = require('./routes/certificate');
const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(MONGOURI, {useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true, useFindAndModify: false})
.catch(err => console.log(err));

app.use(express.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(authRoutes);
app.use(certificateRoutes);
  

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})

module.exports = { app };