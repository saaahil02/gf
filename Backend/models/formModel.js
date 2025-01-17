

const mongoose = require('mongoose');



const formSchema = new mongoose.Schema({
  questions: [
    {
      questionText: { type: String, required: true },  // Ensure this field matches the frontend
      questionType: { type: String, enum: ['text', 'multiple-choice'], required: true },
      options: [{ type: String }], // Optional for multiple-choice questions
    },
  ],
}, { timestamps: true });


module.exports = mongoose.model('formModel', formSchema);
// const formSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   questions: [
//     {
//       text: { type: String, required: true },
//       type: { type: String, required: true },
//       options: [String], // for 'radio' or 'checkbox'
//       required: { type: Boolean, default: false },
//     },
//   ],
// }, { timestamps: true });

// module.exports = mongoose.model('Form', formSchema);
