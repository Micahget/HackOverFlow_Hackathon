const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

// Import required modules

// Create an Express app
const app = express();

// Configure body-parser middleware to parse JSON data
app.use(bodyParser.json());

app.use(cors());

// Define a route to receive user input from the React application
app.post('/user-input', (req, res) => {
    // Extract the user input from the request body
    const userInput = req.body;

    // Send the user input to the Streamlit application
    axios.post('http://streamlit-app-url/user-input', userInput)
        .then(response => {
            // Handle the response from the Streamlit application
            console.log(response.data);
            res.status(200).send('User input sent to Streamlit application successfully');
        })
        .catch(error => {
            // Handle any errors that occurred during the request
            console.error(error);
            res.status(500).send('Error sending user input to Streamlit application');
        });
});

// Start the Express server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});