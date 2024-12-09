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

// const { exec } = require('child_process');
// const scriptPath = '/path/to/python_script.py';

app.post('/predict', (req, res) => {
    const {
        Wait = 0,
        AvgHowEarlyWaiting = 0,
        LineCount0 = 0,
        FlowCount2 = 0,
        SchFlowCount4 = 0,
        FutFlowCount2 = 0,
        AheadCount = 0,
        BeforeSlot = 0,
        AfterSlot = 0,
        Median5 = 0,
        AvgWaitByTaskTypeLine = 0,
        SumTimeToCompleteInProgress = 0,
        ExpectedDelayNextExam = 0,
        AvgAgePeopleWaiting = 0,
        NumCustomersInLastW1 = 0,
        AvgWaitLastW1 = 0,
        SumTimeToCompleteNextSlot = 0,
        WithAndWithoutContrastCountWaiting = 0,
        WithContrastCountInProgress = 0, // Added missing argument
        WithAndWithoutContrastCountInProgress = 0 // Added missing argument
    } = req.body;

    const command = `python3 ${scriptPath} ${Wait} ${AvgHowEarlyWaiting} ${LineCount0} ${FlowCount2} ${SchFlowCount4} ${FutFlowCount2} ${AheadCount} ${BeforeSlot} ${AfterSlot} ${Median5} ${AvgWaitByTaskTypeLine} ${SumTimeToCompleteInProgress} ${ExpectedDelayNextExam} ${AvgAgePeopleWaiting} ${NumCustomersInLastW1} ${AvgWaitLastW1} ${SumTimeToCompleteNextSlot} ${WithAndWithoutContrastCountWaiting} ${WithContrastCountInProgress} ${WithAndWithoutContrastCountInProgress}`;
    
    console.log('Executing Python script with command:', command);


    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).json({ error: 'Error executing for prediction' });
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return res.status(500).json({ error: stderr });
        }

        const prediction = parseFloat(stdout.trim());
        res.json({ wait_time: prediction });
    });
});


// for testing 
app.get('/', (req, res) => {
    res.send('Hello World!')
  })

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
