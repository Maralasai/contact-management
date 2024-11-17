const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/contactManagement', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Contact Schema and Model
const contactSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  company: String,
  jobTitle: String,
});

const Contact = mongoose.model('Contact', contactSchema);

// Routes

// GET /contacts - Get all contacts
app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching contacts' });
  }
});

// POST /contacts - Add new contact
app.post('/api/contacts', async (req, res) => {
  const { firstName, lastName, email, phoneNumber, company, jobTitle } = req.body;

  if (!firstName || !lastName || !email || !phoneNumber || !company || !jobTitle) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const contact = new Contact({ firstName, lastName, email, phoneNumber, company, jobTitle });
    await contact.save();
    res.status(201).json(contact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /contacts/:id - Update contact
app.put('/api/contacts/:id', async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, phoneNumber, company, jobTitle } = req.body;

  try {
    const contact = await Contact.findByIdAndUpdate(id, { firstName, lastName, email, phoneNumber, company, jobTitle }, { new: true });
    res.status(200).json(contact);
  } catch (err) {
    res.status(400).json({ message: 'Error updating contact' });
  }
});

// DELETE /contacts/:id - Delete contact
app.delete('/api/contacts/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Contact.findByIdAndDelete(id);
    res.status(200).json({ message: 'Contact deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting contact' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
