const express = require('express');
const router = express.Router();
const Response = require('../models/Response'); // Assuming you have a Response model
const Form = require('../models/formModel'); // For form validation

// Route to submit a response
// router.post('/submit/:formId', async (req, res) => {
//   try {
//     const { formId } = req.params;
//     const { answers } = req.body;

//     // Check if the form exists
//     const form = await Form.findById(formId);
//     if (!form) {
//       return res.status(404).json({ message: 'Form not found' });
//     }

//     // Validate that answers match the questions
//     if (form.questions.length !== answers.length) {
//       return res.status(400).json({ message: 'Invalid number of answers' });
//     }

//     // Save the response
//     const newResponse = new Response({
//       formId,
//       answers,
//     });
//     await newResponse.save();

//     res.status(201).json({ message: 'Response submitted successfully', response: newResponse });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // Route to get all responses for a specific form
// router.get('/:formId', async (req, res) => {
//   try {
//     const { formId } = req.params;

//     // Fetch all responses for the given form
//     const responses = await Response.find({ formId });

//     if (!responses || responses.length === 0) {
//       return res.status(404).json({ message: 'No responses found for this form' });
//     }

//     res.status(200).json({ responses });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });
router.post('/submit/:formId', async (req, res) => {
  try {
    const { formId } = req.params;
    const { answers } = req.body;

    console.log('Received Answers:', answers); // Log answers to check the request body

    // Check if the form exists
    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    // Validate that answers match the questions
    if (form.questions.length !== answers.length) {
      return res.status(400).json({ message: 'Invalid number of answers' });
    }

    // Save the response
    const newResponse = new Response({
      formId,
      answers,
    });
    await newResponse.save();

    res.status(201).json({ message: 'Response submitted successfully', response: newResponse });
  } catch (error) {
    console.error('Error in response submission:', error); // Log the error to get more details
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


module.exports = router;
