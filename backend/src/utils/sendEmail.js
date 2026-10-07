const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

const sendOtpEmail = async (toEmail, otp) => {
    const mailOptions = {
        from: `"tawheed store app" <${process.env.EMAIL_USER}>`,
        to: toEmail,
        subject: "Account verified code (OTP)",
        html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
                <h2 style="color: #1976d2;">Complete register</h2>
                <p>Enter the 6-digit verification code below to complete registration on our tawheed-store app:
</p>
                <div style="background-color: #f5f5f5; padding: 15px; text-align: center; border-radius: 5px; margin: 20px 0;">
                    <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #333;">${otp}</span>
                </div>
                <p style="color: #666; font-size: 14px;">This code is valid for <strong>5 minutes</strong></p>
            </div>
        `
    }
    await transporter.sendMail(mailOptions);
}

module.exports = { sendOtpEmail };