const nodemailer = require('nodemailer')
const config = require('../config')


const sendVerify = (client,token) => {

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: config.USER_EMAIL,
            pass: config.USER_PASS
        }
    })

    const mailOptions = {
        from: config.USER_EMAIL,
        to: client,
        subject: "Email de verificación KeyPax",
        text: "https://keypax-api.hopto.org/public/"+token
    }

    transporter.sendMail(mailOptions, function(error,info)  {
        if (error){
            return true;
        } else { 
            return null;
        }
     })
}

const send2FA = (client,code) => {

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: config.USER_EMAIL,
            pass: config.USER_PASS
        }
    })

    const mailOptions = {
        from: config.USER_EMAIL,
        to: client,
        subject: "Email de 2FA KeyPax",
        text: code
    }

    transporter.sendMail(mailOptions, function(error,info)  {
        if (error){
            return true;
        } else { 
            return null;
        }
     })
}

module.exports = {sendVerify,send2FA}