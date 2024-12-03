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
// for testing 
app.get('/', (req, res) => {
    res.send('Hello World!')
  })
// Route for predicting wait time
// app.post('/predict', (req, res) => {
//     // const { arrivalTime, department, doctorsAvailable } = req.body;
//     const { arrivalTime = 10.0, department = 1, doctorsAvailable = 0 } = req.body;


//     if (arrivalTime === undefined || department === undefined || doctorsAvailable === undefined) {
//         return res.status(400).json({ error: 'Missing required features: arrivalTime, department, or doctorsAvailable' });
//     }

//     // Prepare the features array
//     const features = [arrivalTime, department, doctorsAvailable];

//     // Properly format the full command
//     // const command = `${pythonPath} ${scriptPath} ${features.join(' ')}`; // for local host
//     const command = `python3 ${scriptPath} ${features.join(' ')}`; //for hosting on render


//     // Log the command for debugging
//     console.log(`Executing command 1-: ${command}`);

//     // Execute the Python script
//     exec(command, (error, stdout, stderr) => {
//     // exec(`python3 scripts/predict.py`, (error, stdout, stderr) => {
//         if (error) {
//             console.error(`Error executing Python script: ${error.message}`);
//             return res.status(500).json({ error: 'Error executing prediction model' });
//         }
//         if (stderr) {
//             console.error(`stderr: ${stderr}`);
//             return res.status(500).json({ error: stderr });
//         }

//         // Log stdout for debugging
//         console.log(`Python script output: ${stdout}`);

//         // Send the predicted wait time back to the client
//         res.json({ wait_time: stdout.trim() });
//     });
// });

app.post('/predict', (req, res) => {
    // Extract features from the request body
    // new_data = pd.DataFrame({
    //     'Consultation Revenue': [20.17],
    //     'CT_hour': [9],
    //     'ET_hour': [8],
    //     'Doctor Type_FLOATING': [False],
    //     'Doctor Type_LOCUM': [False],
    //     'Financial Class_HMO': [True],
    //     'Financial Class_INSURANCE': [False],
    //     'Financial Class_MEDICARE': [False],
    //     'Financial Class_PRIVATE': [False]
    // })
    const {
        consultationRevenue = 10.0,
        CT_hour = 9,
        ET_hour = 8,
        doctorTypeFloating = 0,
        doctorTypeLocum = 0,
        financialClassHMO = 0,
        financialClassInsurance = 0,
        financialClassMedicare = 0,
        financialClassPrivate = 0
    } = req.body;
    // const {
    //     consultationRevenue = 10.0, // Default values for testing
    //     doctorTypeFloating = 0,
    //     doctorTypeLocum = 0,
    //     financialClassHMO = 0,
    //     financialClassInsurance = 0,
    //     financialClassMedicare = 0,
    //     financialClassPrivate = 0
    // } = req.body;

    // Validate input
    if (
        consultationRevenue === undefined ||
        doctorTypeFloating === undefined ||
        doctorTypeLocum === undefined ||
        financialClassHMO === undefined ||
        financialClassInsurance === undefined ||
        financialClassMedicare === undefined ||
        financialClassPrivate === undefined
    ) {
        return res.status(400).json({
            error: 'Missing required features: consultationRevenue, doctorTypeFloating, doctorTypeLocum, financialClassHMO, financialClassInsurance, financialClassMedicare, financialClassPrivate'
        });
    }

    // Build the feature array
    const features = [
        consultationRevenue,
        CT_hour,
        ET_hour,
        doctorTypeFloating,
        doctorTypeLocum,
        financialClassHMO,
        financialClassInsurance,
        financialClassMedicare,
        financialClassPrivate
    ];
    console.log(features);
    // Path to your Python script
    const command = `python3 ${scriptPath} ${features.join(' ')}`; // Adjust `scriptPath` accordingly for Render hosting

    console.log(`Executing command: ${command}`);

    // Execute the Python script
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing Python script form route: ${error.message}`);
            return res.status(500).json({ error: 'Error executing prediction model' });
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return res.status(500).json({ error: stderr });
        }

        console.log(`Python script output: ${stdout}`);
        res.json({ wait_time: stdout.trim() }); // Send the predicted wait time back to the client
    });
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
