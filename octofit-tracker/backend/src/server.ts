import express from 'express';
import db from './config/database.js';
import usersRouter from './routes/users.js';
import teamsRouter from './routes/teams.js';
import activitiesRouter from './routes/activities.js';
import leaderboardRouter from './routes/leaderboard.js';
import workoutsRouter from './routes/workouts.js';

const app = express();
const port = Number(process.env.PORT) || 8000;

// Configure API base URL for both Codespaces and localhost environments
// When running in GitHub Codespaces, use the Codespace-specific URL format
// Otherwise, fall back to localhost for local development
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', environment: process.env.NODE_ENV || 'development', baseUrl });
});

app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to OctoFit Tracker backend', baseUrl });
});

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

db.once('open', () => {
  console.log('MongoDB connection opened');
});

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

app.listen(port, () => {
  console.log(`OctoFit Tracker backend is running on ${baseUrl}`);
});
