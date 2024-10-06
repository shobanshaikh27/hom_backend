const nodemailer = require('nodemailer');

// Create a transporter object using SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    port:465,
    secure: true,
    logger:true,
    debug:true,
    secureConnection: false,
    auth: {
        user: 'shobanshaikh27@gmail.com', // Your Gmail email address
        pass: 'eoxq podc ifkn sdwi' // Your Gmail password
    },
    tls:{
      rejectUnauthorized: true
    }
});

// Function to send meeting link
async function emailInquiry(name, email,phoneNumber, note){
  console.log("To",name)
  console.log("Sender email",email)
    // Setup email data
    const mailOptions = {
        from: 'shobanshaikh27@gmail.com',
        to:  'shobanshk04@gmail.com',
        subject: 'Inquiry About House of Memories',
        text: `We received an inquiry about House of Memories. Here are the details: Name: ${name}, Email: ${email}, Phone: ${phoneNumber}, Note: ${note}. Please reach out to them directly for further assistance.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Error occurred:', error);
        }
        console.log('Message sent:', info.messageId);
    });
}

module.exports = { emailInquiry};
