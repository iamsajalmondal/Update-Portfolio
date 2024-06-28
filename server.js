const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; // Change as needed

// Middleware
app.use(bodyParser.json());

// POST route to handle form submission
app.post('/send-email', (req, res) => {
    const { fullName, email, mobileNumber, emailSubject, message } = req.body;

    // Nodemailer configuration (using Gmail SMTP as an example)
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sajalsmondal2001@gmail.com', // Your Gmail email address
            pass: 'Sajal01@', // Your Gmail password or App Password if 2-Step Verification is enabled
        },
    });

    // Email message options
    let mailOptions = {
        from: email,
        to: 'recipient-email@example.com', // Email address where you want to receive messages
        subject: emailSubject,
        text: `
            Full Name: ${fullName}\n
            Email: ${email}\n
            Mobile Number: ${mobileNumber}\n\n
            Message: ${message}
        `,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Failed to send email');
        } else {
            console.log('Email sent:', info.response);
            res.status(200).send('Email sent successfully');
        }
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});