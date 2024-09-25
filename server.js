const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');
const path = require('path'); // Import path module
const app = express();

app.use(express.json()); // For parsing JSON request body
app.use(cors()); // Allow Cross-Origin Requests

// Path to Python and script
const pythonPath = "/Users/abhishekkumar/Desktop/btp_project2/venv/bin/python3";
const scriptPath = path.join(__dirname, 'scripts', 'predict.py'); // Use path.join for safety

// Route for predicting wait time
app.post('/predict', (req, res) => {
    // const { arrivalTime, department, doctorsAvailable } = req.body;
    const { arrivalTime = 10.0, department = 1, doctorsAvailable = 0 } = req.body;


    if (arrivalTime === undefined || department === undefined || doctorsAvailable === undefined) {
        return res.status(400).json({ error: 'Missing required features: arrivalTime, department, or doctorsAvailable' });
    }

    // Prepare the features array
    const features = [arrivalTime, department, doctorsAvailable];

    // Properly format the full command
    const command = `${pythonPath} ${scriptPath} ${features.join(' ')}`;

    // Log the command for debugging
    console.log(`Executing command: ${command}`);

    // Execute the Python script
    exec(command, (error, stdout, stderr) => {
    // exec(`python3 scripts/predict.py`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing Python script: ${error.message}`);
            return res.status(500).json({ error: 'Error executing prediction model' });
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return res.status(500).json({ error: stderr });
        }

        // Log stdout for debugging
        console.log(`Python script output: ${stdout}`);

        // Send the predicted wait time back to the client
        res.json({ wait_time: stdout.trim() });
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
