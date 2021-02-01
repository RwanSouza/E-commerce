const nodemailer = require('nodemailer')

module.exports = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "31872b57d0a4d5",
    pass: "0349ccdfc15766"
  }
});

 