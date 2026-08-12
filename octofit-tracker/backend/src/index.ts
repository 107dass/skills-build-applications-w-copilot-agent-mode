import express from 'express';
import mongoose from 'mongoose';
import db from './config/database.js';

const app = express();
const port = Number(process.env.PORT) || 8000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', environment: process.env.NODE_ENV || 'development' });
});

app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to OctoFit Tracker backend' });
});

mongoose.connection.once('open', () => {
  console.log('MongoDB connection opened');
});

mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

app.listen(port, () => {
  console.log(`OctoFit Tracker backend is running on http://localhost:${port}`);
});
