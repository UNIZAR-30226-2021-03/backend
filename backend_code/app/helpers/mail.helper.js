const nodemailer = require('nodemailer')
const config = require('../config')


const sendVerify = async(client,token) => {

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
        text: "https://keypax-api.hopto.org/"+token
    }

    transporter.sendMail(mailOptions, function(error,info)  {
        if (error){
            return false;
        } else { 
            return true;
        }
     })
}

module.exports = {sendVerify}