const express = require("express");
const mongoose = require("mongoose");
const{MONGOURI} = require('./config/keys');
const Certificates = require("./model/certificate");
const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(MONGOURI, {useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true, useFindAndModify: false})
.catch(err => console.log(err));

app.use(express.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

  app.get("/certificate/data/:id", (req, res) => {
    let certificateId = req.params.id;
    Certificates.findById(certificateId)
      .then(obj => {
        if (obj === null)
          res.status(400).send({ err: "Certificate data doesn't exist" });
        else res.send(obj);
      })
      .catch(err => res.status(400).send({ err }));
  });
  
  app.get("/certificate/verify/:id", (req, res) => {
    let certificateId = req.params.id;
  
    Certificates.findById(certificateId)
      .then(obj => {
        obj.verifyData().then(verified => {
          if (verified) res.status(200).send({message: "Certificate verified"});
          else res.status(401).send();
        });
      })
      .catch(err =>
        res.status(400).send({ err: "No data found for the given certificateId" })
      );
  });
  
  app.post("/certificate/generate", (req, res) => {
    const { candidateName, orgName, courseName, assignDate, duration } = req.body;
  
    const given = new Date(assignDate);
  
    let expirationDate = given.setFullYear(given.getFullYear() + duration);
  
    expirationDate = expirationDate.toString();
  
    const certificate = new Certificates({
      candidateName,
      orgName,
      courseName,
      expirationDate,
      assignDate,
      duration
    });
  
    certificate
      .save()
      .then(obj => {
        const dbRes = obj.toJSON();
        obj
          .appendBlockchain()
          .then(data => {
            const { transactionHash, blockHash } = data.receipt;
            res.status(201).send({
              receipt: {
                transactionHash,
                blockHash
              },
              data: dbRes
            });
          })
          .catch(err => res.status(500).send(err));
      })
      .catch(err => {
        res.status(400).send(err);
      });
  });
  

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})

module.exports = { app };