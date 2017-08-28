var express = require('express');
var router = express.Router();
var ContactMessage = require("../models/contact-message-model");
var nodemailer = require('nodemailer');

// API for posting contact message
router.post('/contact_message', function(req, res, next){
  var contactMessage = new ContactMessage({
    name: req.body.name,
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message
  });
  contactMessage.save(function(err, result){
    if(err){
      return res.status(500).json({
        title: "Cannot save message! An error occurred.",
        error: err
      });
    }else{
      //sent an email to fontdesk
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'toantranoffice@gmail.com',
          pass: 'Icyowl776new'
        }
      });

      var mailOptions = {
        from: 'toantranoffice@gmail.com',
        to: 'toantranoffice@gmail.com',
        subject: result.subject + " - Appointment from the office's website" ,
        html:  '<h1>A new Appointment form the website</h1>'
      }

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      res.status(201).json({
        title: "Saved message successfully",
        obj: result
      });
    }
  })
})

module.exports = router;
