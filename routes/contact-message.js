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
      res.status(201).json({
        title: "Saved message successfully",
        obj: result
      });
      // sent an email to fontdesk
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
        html:  '<strong>Name: </strong>' + result.name + '<br> <strong>Email: </strong> '+result.email +'<br> <strong>Subject: </strong> ' + result.subject + '<br> <strong>Message: </strong> '+result.message
      }

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      // var transporter = nodemailer.createTransport('smtps://toantranoffice%40gmail.com:Icyowl776new@smtp.gmail.com');

      // create template based sender function
      // var sendContactMessage = transporter.templateSender({
      //     subject: '{{subject}} - New Appointment from website',
      //     text: 'name: {{name}}, email: {{ email }}, message: {{message}}',
      //     html: '<strong>Name: </strong> {{name}} <br> <strong>Email: </strong> {{email}} <br> <strong>Subject: </strong> {{subject}} <br> <strong>Message: </strong> {{message}}'
      // }, {
      //     from: 'toantranoffice@gmail.com',
      // });

      // use template based sender to send a message
      // sendContactMessage({
      //     to: 'toantranoffice@gmail.com'
      // }, {
      //     subject: result.subject,
      //     name: result.name,
      //     email: result.email,
      //     message: result.message
      //
      // }, function(err, info){
      //     if(err){
      //        console.log('Error');
      //     }else{
      //         console.log('contact message sent');
      //     }
      // });
    }
  })
})

module.exports = router;
