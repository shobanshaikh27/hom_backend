
const contactUs = require('../controllers/SendEmail');

const emailInquiry = async (req, res) => {
    const {name,email,phoneNumber, note} = req.body;
    
    try {
        const info = await contactUs.emailInquiry(name,email,phoneNumber, note);
        res.status(200).json({ message: "Email sent successfully", info });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to send email" });
    }
};

module.exports = {
    emailInquiry
};