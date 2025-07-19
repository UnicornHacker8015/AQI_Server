const express = require('express');
const { sendAqiAlert } = require('../Controllers/alertcontroller');
const router = express.Router();

router.post('/', (req, res) => {
    const { mobileNumber, aqiValue } = req.body;
    
    if (!mobileNumber || !aqiValue) {
        return res.status(400).json({ message: 'Mobile number and AQI value are required' });
    }

    sendAqiAlert(mobileNumber, aqiValue);
    res.status(200).send('Alert sent!');
});

module.exports = router;
