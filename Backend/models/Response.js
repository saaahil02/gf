
// const mongoose = require('mongoose');

// const answerSchema = new mongoose.Schema({
//   questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
//   answerText: { type: String, required: true },
// });

// const responseSchema = new mongoose.Schema({
//   formId: { type: mongoose.Schema.Types.ObjectId, ref: 'Form', required: true },
//   answers: [answerSchema],
// }, { timestamps: true });

// module.exports = mongoose.model('Response', responseSchema);
const responseSchema = new mongoose.Schema({
  formId: { type: mongoose.Schema.Types.ObjectId, ref: 'Form', required: true },
  answers: [{
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
    answerText: { type: String, required: true }
  }],
}, { timestamps: true });
