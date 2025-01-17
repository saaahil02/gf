const express = require('express');
const mongoose = require('mongoose');
const formRoutes = require('./routes/formRoutes');
const questionRoutes = require('./routes/QuestionRoutes');
const responseRoutes = require('./routes/responseRoutes');
require('dotenv').config();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('MongoDB connection error:', err));

app.use('/api/forms', formRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/responses', responseRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
