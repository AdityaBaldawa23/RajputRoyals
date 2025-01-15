const express = require('express');
const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://adityabaldawa23:<1YVoFLGsP2l9aqdh>@cluster0.soki0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Use Atlas URI here
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer'); // Import Nodemailer

const FormEntry = require('./models/FormEntry');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// Nodemailer Transporter Configuration
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service (e.g., Gmail, Yahoo, Outlook)
    auth: {
        user: 'rajputroyalmiraj@gmail.com', // Replace with your email
        pass: 'gvuq nxec gkjx zogh', // Replace with your email password or app password
    },
});

// API Endpoint to save form data and send email
app.post('/api/form', async (req, res) => {
    try {
        const { name, number, email, eventDate, eventType, message } = req.body;

        // Validate inputs
        if (!name || !number || !email || !eventDate || !eventType) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Save form data to the database
        const newEntry = new FormEntry({ name, number, email, eventDate, eventType, message });
        await newEntry.save();

        // Email content
        const mailOptions = {
            from: 'rajputroyalmiraj@gmail.com', // Replace with your email
            to: email, // Send confirmation email to the user
            subject: `Thank you for your inquiry, ${name}!`,
            text: `Hello ${name},

Thank you for reaching out to Rajput Royals. Here are the details you submitted:

- Name: ${name}
- Mobile Number: ${number}
- Email: ${email}
- Event Date: ${eventDate}
- Event Type: ${eventType}
- Message: ${message || 'No additional message provided'}

We will get back to you shortly. If you have any questions, feel free to contact us.

Best regards,  
Rajput Royals`,
        };

        const adminMailOptions = {
            from: 'rajputroyalmiraj@gmail.com',
            to: 'rishikarajput995@gmail.com', // Replace with your email
            subject: `New Inquiry from ${name}`,
            text: `New form submission:
        
        - Name: ${name}
        - Mobile Number: ${number}
        - Email: ${email}
        - Event Date: ${eventDate}
        - Event Type: ${eventType}
        - Message: ${message || 'No additional message provided'}`,
        };
        
        // Send admin notification
        transporter.sendMail(adminMailOptions, (err, info) => {
            if (err) {
                console.error('Error sending admin notification email:', err);
            } else {
                console.log('Admin notification email sent: ' + info.response);
            }
        });

        // Send email
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error('Error sending email:', err);
                return res.status(500).json({ error: 'Failed to send confirmation email' });
            }
            console.log('Email sent: ' + info.response);
        });

        res.status(201).json({ message: 'Form data saved and confirmation email sent successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});



