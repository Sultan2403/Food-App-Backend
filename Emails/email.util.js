const otpStore = new Map(); // In-memory store for OTPs

const generateOTP = (email) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiry = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
  otpStore.set(email, { otp, expiry });
  return otp;
};

const verifyOTP = ({ email, otp }) => {
  const record = otpStore.get(email);
  if (!record) return false;
  if (record.expiry < Date.now()) {
    otpStore.delete(email);
    return false;
  }
  if (record.otp !== otp) return false;

  otpStore.delete(email);
  return true;
};
