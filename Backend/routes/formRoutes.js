

// module.exports = router;
const express = require('express');
const router = express.Router();
const Form = require('../models/formModel');



// Create a new form
// router.post('/create', async (req, res) => {
//   try {
//     console.log('Received request body:', req.body);
//     const form = new Form(req.body);
//     await form.save();
//     console.log('Received request:', req.body);

//     res.status(201).json({ message: 'Form created successfully', form });
//   } catch (error) {
//     console.error('Error:',error);
//     res.status(500).json({ error: 'Error creating form', details: error.message,stack:error.stack, });
//   }
// });
router.post('/create', async (req, res) => {
  try {
    // Log the incoming request body
    console.log('Received request body:', req.body);

    // Check if the request body is empty
    if (!req.body || !req.body.questions || req.body.questions.length === 0) {
      return res.status(400).json({ error: 'Invalid form data' });
    }

    // Create a new form
    const form = new Form(req.body);

    // Log the created form before saving
    console.log('Form to save:', form);

    // Save the form to the database
    await form.save();

    // Log after saving
    console.log('Form saved:', form);

    res.status(201).json({ message: 'Form created successfully', form });
  } catch (error) {
    // Log error and provide detailed info
    console.error('Error:', error.message);
    console.error('Stack trace:', error.stack);
    res.status(500).json({
      error: 'Error creating form',
      details: error.message,
      stack: error.stack,
    });
  }
});

// Get all forms
router.get('/', async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching forms', details: error.message });
  }
});

// Get a specific form by ID
router.get('/:id', async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) return res.status(404).json({ error: 'Form not found' });
    res.status(200).json(form);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching form', details: error.message });
  }
});

module.exports = router;
