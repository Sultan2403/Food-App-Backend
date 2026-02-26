// Services/email.service.js
const nodemailer = require("nodemailer");

// ---- internal setup (hidden) ----
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false, // TLS via STARTTLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Optional: verify connection on startup (dev only)
transporter.verify((err) => {
  if (err) {
    console.error("❌ Email transporter error:", err.message, err);
  } else {
    console.log("✅ Email transporter ready");
  }
});


module.exports = transporter;