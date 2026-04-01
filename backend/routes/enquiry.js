const express = require('express');
const router = express.Router();
const Enquiry = require('../models/Enquiry');
const auth = require('../middleware/auth');

// POST /api/enquiry - Submit a new enquiry
router.post('/enquiry', async (req, res) => {
  try {
    const { name, phone, message } = req.body;

    // Validation
    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Name is required.' });
    }
    if (!phone || !phone.trim()) {
      return res.status(400).json({ error: 'Phone number is required.' });
    }
    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message is required.' });
    }

    const enquiry = new Enquiry({
      name: name.trim(),
      phone: phone.trim(),
      message: message.trim(),
    });

    await enquiry.save();
    res.status(201).json({ message: 'Enquiry submitted successfully!', enquiry });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ error: messages.join(', ') });
    }
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
});

// GET /api/enquiries - Get all enquiries (admin only)
router.get('/enquiries', auth, async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch {
    res.status(500).json({ error: 'Failed to fetch enquiries.' });
  }
});

// DELETE /api/enquiry/:id - Delete single enquiry (admin only)
router.delete('/enquiry/:id', auth, async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ error: 'Enquiry not found.' });
    }
    res.json({ message: 'Enquiry deleted successfully.' });
  } catch {
    res.status(500).json({ error: 'Failed to delete enquiry.' });
  }
});

module.exports = router;
