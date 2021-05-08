  
const express =  require('express');
const  router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const Certificates = require('../model/certificate');

router.get("/certificate/data/:id", (req, res) => {
    let certificateId = req.params.id;
    Certificates.findById(certificateId)
      .then(obj => {
        if (obj === null)
          res.status(400).send({ err: "Certificate data doesn't exist" });
        else res.send(obj);
      })
      .catch(err => res.status(400).send({ err }));
});
  
router.get("/certificate/verify/:id", (req, res) => {
    let certificateId = req.params.id;
  
    Certificates.findById(certificateId)
      .then(obj => {
        obj.verifyData().then(verified => {
          if (verified) res.status(200).send({message: "Certificate verified"});
          else res.status(401).send({err: "This is not a valid certificate"});
        });
      })
      .catch(err =>
        res.status(400).send({ err: "No data found for the given certificateId" })
      );
});
  
router.post("/certificate/generate", requireLogin, (req, res) => {
    const { candidateName, courseName, assignDate, duration, email } = req.body;
    const orgName = req.user.name;
    const given = new Date(assignDate);
  
    let expirationDate = given.setFullYear(given.getFullYear() + duration);
  
    expirationDate = expirationDate.toString();
  
    const certificate = new Certificates({
      candidateName,
      orgName,
      courseName,
      expirationDate,
      assignDate,
      duration,
      email
    });
  
    certificate
      .save()
      .then(obj => {
        console.log(obj)
        const dbRes = obj.toJSON();
        obj
          .appendBlockchain()
          .then(data => {
            console.log(`data: ${data}`)
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

router.post("/certificate/get/all", requireLogin, (req, res)=>{
    Certificates.find({email: req.user.email})
    .then(myCertificates =>{
        res.json({myCertificates})
    })
    .catch(err=>{
        console.log(err);
    })
})

module.exports = router;