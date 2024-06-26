import twilio from "twilio";

const generateOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);

  const otpExpiry = new Date();
  otpExpiry.setMinutes(otpExpiry.getMinutes() + 5); // OTP valid for 5 minutes

  return { otp, otpExpiry };
};

const verifyOTP = (userOTP, generatedOTP, otpExpiry) => {
  const currentTime = new Date();

  if (currentTime > otpExpiry) {
    return { isValid: false, message: "OTP has expired" };
  }

  const isValid = userOTP === generatedOTP;

  return {
    isValid,
    message: isValid ? "OTP is valid" : "Incorrect OTP",
  };
};

async function sendOTP(otp, phoneNumber) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

  const client = twilio(accountSid, authToken);

  try {
    await client.messages.create({
      from: fromPhoneNumber,
      to: `+977${phoneNumber}`,
      body: `Here is your otp: ${otp}`,
    });

    return { success: true, message: "OTP sent successfully" };
  } catch (error) {
    console.error("Error sending OTP:", error);
    return { success: false, message: "Error sending OTP. Please try again." };
  }
}

export { generateOTP, sendOTP, verifyOTP };
