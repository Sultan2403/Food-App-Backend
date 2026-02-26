const emailClient = require("../Emails/email.client");

const sendEmailOTP = async ({ email }) => {
  const otp = generateOTP(email);
  return emailClient.sendMail({
    from: `"YourApp" <${process.env.SMTP_USER}>`,
    subject: "[Food Vendor App] One-Time Password (OTP)",
    to: email,
    html: `
      <h2>Your OTP Code</h2>
      <p>Your one-time password is: <strong>${otp}</strong></p>
      <p>Please use this code to complete your login process.</p>
      <p>This OTP is valid for 10 minutes.</p>
        <hr>`,
    text: `Your one-time password is: ${otp}. This OTP is valid for 10 minutes. Please use this code to complete your login process.`,
  });
};

module.exports = { sendEmailOTP };
