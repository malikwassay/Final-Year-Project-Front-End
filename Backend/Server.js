const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/FYP', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

// User Schema
const userSchema = new mongoose.Schema({
  Email: String,
  Password: String
});

const User = mongoose.model('users', userSchema);

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const users = await User.findOne({ Email, Password });
    
    if (users) {
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

app.listen(8000, () => {
  console.log('Server running on port 8000');
});
