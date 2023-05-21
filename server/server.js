const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
const mongoURI = 'mongodb+srv://bimmercap:anahya18@clustercaptured.c7jp0o4.mongodb.net/omcalculus?retryWrites=true&w=majority';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Define the MongoDB schema and models for the data
const omxpbaselineSchema = new mongoose.Schema({
  Id: Number,
  expensegrp: String,
  desc: String,
  monthprd: Date,
  grpamt: Number,
});

const omxpbaselineModel = mongoose.model('omxpbaseline', omxpbaselineSchema);

const omxpnccSchema = new mongoose.Schema({
  Sr: Number,
  "Expense Type": String,
  "Expense Item": String,
  "Expense Period": Date,
  Amount: Number,
  Date: Date,
});

const omxpnccModel = mongoose.model('omxpncc', omxpnccSchema);

// Define API routes for data retrieval
app.get('/api/omxpbaseline', (req, res) => {
  omxpbaselineModel.find({}, (err, data) => {
    if (err) {
      console.error('Error retrieving omxpbaseline data:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(data);
    }
  });
});

app.get('/api/omxpncc', (req, res) => {
  omxpnccModel.find({}, (err, data) => {
    if (err) {
      console.error('Error retrieving omxpncc data:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(data);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
