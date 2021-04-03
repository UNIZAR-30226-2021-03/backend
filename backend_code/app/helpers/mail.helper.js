const nodemailer = require('nodemailer');
const config = require('../config');
const pug = require('pug');


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
        subject: "Email de verificación KeyPax.",
        text: "Verifica tu email.",
        html: pug.renderFile(__dirname+'/../templates/verification_email.pug',
                            {token: token})
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
        subject: "Email de 2FA KeyPax.",
        text: "Tu código de verificación.",
        html: pug.renderFile(__dirname+'/../templates/2fa_email.pug',
                            {code: code})
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