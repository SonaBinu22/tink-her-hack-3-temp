const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize Express app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/evoting', { useNewUrlParser: true, useUnifiedTopology: true });

// Define User schema
const userSchema = new mongoose.Schema({
    studentId: { type: String, unique: true },
    password: String,
    voted: Boolean
});

// Define Vote schema
const voteSchema = new mongoose.Schema({
    chairperson: {
        "Eda Immanuel": { type: Number, default: 0 },
        "Pravda Siva": { type: Number, default: 0 }
    },
    viceChairperson: {
        "Krish S": { type: Number, default: 0 },
        "Sona George": { type: Number, default: 0 }
    },
    artsRep: {
        "Aniyan K Kuriakose": { type: Number, default: 0 },
        "Swas Lek": { type: Number, default: 0 }
    },
    sportsRep: {
        "Srutheer K": { type: Number, default: 0 },
        "Suh Sanj": { type: Number, default: 0 }
    }
});

// Create models
const User = mongoose.model('User', userSchema);
const Vote = mongoose.model('Vote', voteSchema);

// Register new user
app.post('/register', async (req, res) => {
    const { studentId, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ studentId });
    if (existingUser) {
        return res.status(400).send('User already exists');
    }

    const user = new User({ studentId, password, voted: false });
    await user.save();
    res.status(201).send('User registered');
});

// Login user
app.post('/login', async (req, res) => {
    const { studentId, password } = req.body;
    const user = await User.findOne({ studentId, password });

    if (user) {
        res.status(200).send(user);
    } else {
        res.status(400).send('Invalid credentials');
    }
});

// Vote submission
app.post('/vote', async (req, res) => {
    const { studentId, votes } = req.body;
    
    // Find the user who is submitting the vote
    const user = await User.findOne({ studentId });

    // Ensure that the user has not already voted
    if (user && !user.voted) {
        // Increment the vote counts in the Vote collection
        await Vote.findOneAndUpdate({}, { $inc: votes }, { upsert: true });

        // Mark the user as having voted
        user.voted = true;
        await user.save();

        res.status(200).send('Vote submitted successfully');
    } else {
        res.status(400).send('You have already voted');
    }
});

// Get voting results
app.get('/results', async (req, res) => {
    const results = await Vote.findOne();
    res.status(200).json(results);
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

