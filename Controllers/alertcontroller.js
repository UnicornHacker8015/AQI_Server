const twilio = require('twilio');
const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendAqiAlert = (mobileNumber, aqiValue) => {
    const message = `The Live AQI value is ${aqiValue}. Please take necessary precautions.`;
    
    client.messages.create({
        body: message,
        to: mobileNumber,
        from: process.env.TWILIO_PHONE_NUMBER,
    })
    .then(message => console.log('Message sent:', message.sid))
    .catch(error => console.log('Error:', error));
};

module.exports = { sendAqiAlert };
