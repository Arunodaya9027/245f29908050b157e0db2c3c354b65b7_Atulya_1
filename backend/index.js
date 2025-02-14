// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors");

// Create an Express application
const app = express();
app.use(cors());

app.use(express.json())
// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Parse JSON bodies
app.use(bodyParser.json());

// Set up MongoDB connection
mongoose.connect("mongodb+srv://ishaanbharadwaj111:uAIqR4qprU5xOdZz@shaurya-db.mzfmfto.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp")

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const feedbackData = [
  { station: 'GANJ', heard: true },
  { station: 'ARIAN', heard: false },
  { station: 'NASIRABAD SADAR', heard: true }, // Add this line

  
];

// Define a MongoDB schema for the feedback form data
const feedbackSchema = new mongoose.Schema({
  complaintno: Number,
  username: String,
  address: String,
  email: String,
  phone: String,
  overallExperienceRating: Number,
  facilitiesRating: Number,
  review: String,
  range: String,
  district: String,
  station: String,
  remarks: String,
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User"
  // },
});

// Create a MongoDB model based on the schema
const Feedback = mongoose.model('Feedback', feedbackSchema);

const complaintSchema = new mongoose.Schema({
  complaintName: String,
  description: String,
  phone: String,
  favicon: String,
  likes: Number,
  comments: [String],
});

const Complaint = mongoose.model("Complaint", complaintSchema);



app.get('/get-chart-data', async (req, res) => {
  const { station } = req.query;

  try {
    // Implement your logic to fetch chart data for the selected station
    // Assume you have a function named fetchChartDataFromDB that fetches data from your database
    const chartData = await fetchChartDataFromDB(station);

    // Respond with the fetched chart data
    res.json({ data: chartData, options: yourChartOptions });
  } catch (error) {
    console.error('Error fetching chart data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




app.post("/api/complaints", async (req, res) => {
  try {
    const newComplaint = new Complaint(req.body);
    await newComplaint.save();
    res.status(201).json({ message: "Complaint created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


app.get('/get-heard-status', (req, res) => {
  const station = req.query.station;

  if (!station) {
    return res.status(400).json({ error: 'Station parameter is missing.' });
  }

  const stationData = feedbackData.find((data) => data.station === station);

  if (!stationData) {
    return res.status(404).json({ error: 'Station not found.' });
  }

  res.json({ heard: stationData.heard });
});


app.get('/get-chart-data', (req, res) => {
  const station = req.query.station;

  if (!station) {
    return res.status(400).json({ error: 'Station parameter is missing.' });
  }

  // Replace this with your actual logic to fetch chart data from your database
  // Example: const chartData = await fetchChartDataFromDB(station);
  const chartData = {
    labels: ['Label 1', 'Label 2', 'Label 3'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [3, 7, 2],
      },
      {
        label: 'Dataset 2',
        data: [5, 2, 8],
      },
    ],
  };

  res.json({ data: chartData });
});



app.post('/submit-feedback', async (req, res) => {
  console.log('Received data:', req.body);

  try {
    const newFeedback = new Feedback(req.body);
    await newFeedback.save();
    res.status(201).json({ message: "Successfully Saved" });
  } catch (error) {
    console.error("Error is:", error);
    res.status(500).json({error: "Interna srver error"});
  }

});


app.get('/get-feedback', async (req, res) => {
  try {
    const feedbackData = await Feedback.find();

    // Log the fetched data to the console
    console.log('Fetched Feedback Data:', feedbackData);

    res.status(200).json(feedbackData);
  } catch (error) {
    console.error("Error fetching feedback data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.get('/get-station-details', async (req, res) => {
  const { station } = req.query;
  try {
    const stationDetails = await Feedback.find({ station });

    if (!stationDetails || stationDetails.length === 0) {
      // If no station details are found, return a 404 status
      res.status(404).json({ error: "Station details not found" });
      return;
    }

    // Extract the necessary details for the response
    const responseDetails = stationDetails.map((details) => ({
      username: details.username,
      address: details.address,
      email: details.email,
      phone: details.phone,
      overallExperienceRating: details.overallExperienceRating,
      facilitiesRating: details.facilitiesRating,
      review: details.review,
      remarks: details.remarks,
    }));

    res.status(200).json(responseDetails);
  } catch (error) {
    console.error("Error fetching station details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Set up the Express server to listen on port 3001
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
