const twilio = require("twilio");


//twillo credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_SERVICE_SID;

const client = new twilio(accountSid, authToken);

//send otp to phone number
const sendOtpToPhoneNumber = async(phoneNumber) =>{
    try {
        console.log("Sending OTP to phone number:", phoneNumber);
        if(!phoneNumber){
            throw new Error("Phone number is required");
        }

        const response = await client.verify.v2.services(`${serviceSid}`)
            .verifications
            .create({to: phoneNumber, channel: 'sms'});

        console.log("OTP sent successfully:", response);
    } catch (error) {
        console.error("Error sending OTP:", error);
        throw new Error("Failed to send OTP");
    }
}

const verifyOtp = async (phoneNumber, otp) => {
    try {
        console.log("OTP:", otp);
        console.log("Verifying OTP for phone number:", phoneNumber);
       
        if(!phoneNumber || !otp){
            throw new Error("Phone number and OTP are required");
        }

        const response = await client.verify.v2.services(`${serviceSid}`)
            .verificationChecks
            .create({to: phoneNumber, code: otp});

        console.log("OTP verified successfully:", response);
        return response;

    } catch (error) {
        console.error("Error verifying OTP:", error);
        throw new Error("Failed to verify OTP");
    }
} 

module.exports = {
    sendOtpToPhoneNumber,
    verifyOtp
}
