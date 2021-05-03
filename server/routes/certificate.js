  
const express =  require('express');
const  router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const Post = require('../models/certificate');

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
          else res.status(401).send();
        });
      })
      .catch(err =>
        res.status(400).send({ err: "No data found for the given certificateId" })
      );
});
  
router.post("/certificate/generate", requireLogin, (req, res) => {
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

module.exports = router;