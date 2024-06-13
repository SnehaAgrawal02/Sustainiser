const ContactModel = require('../models/contact')
const nodemailer = require('nodemailer');

class ContactController {
    static contactUs = async (req,res)=>{
        try{
            // console.log(req.body)
            // const {id} = req.userData
            const {name,email,subject,description} = req.body
            const result = new ContactModel({
                name:name,
                email:email,
                subject:subject,
                description:description,
            })
            await result.save();
            this.sendEmail(name,email,subject,description)
            req.flash('success', "Email sent successfully")
            res.redirect('/')
        }catch(err){
            console.log(err)
        }
    }

    static sendEmail = async (name,email,subject,description) => {
        // console.log(name,email,phone,course,description);
        let transporter = await nodemailer.createTransport({
            //For Gmail
            host: "smtp.gmail.com",
            port: 587,

            auth: {
                user: "collablab2243@gmail.com",
                pass: "obdojrysnnojlkyu"
            },
        });
        let info = await transporter.sendMail({
            from: "test@gmail.com", // sender address
            to: 'collablab2243@gmail.com', // list of receivers
            subject: `${subject}`, // Subject line
            text: "Details :", // plain text body
            // html body
            html: `Name : <b>${name}</b>
            <br> Email : <b>${email}</b>
            <br> Description : <b>${description}</b>` 
        });
    }
}

module.exports =ContactController