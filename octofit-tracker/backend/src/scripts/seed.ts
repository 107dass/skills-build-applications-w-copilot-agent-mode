import mongoose from 'mongoose';
import User from '../models/User.js';
import Team from '../models/Team.js';
import Activity from '../models/Activity.js';
import LeaderboardEntry from '../models/LeaderboardEntry.js';
import Workout from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await mongoose.connection.db?.dropDatabase();

    const [velocityTeam, summitTeam] = await Team.insertMany([
      {
        name: 'Velocity',
        description: 'Fast-paced cardio and interval training.',
        members: [],
      },
      {
        name: 'Summit',
        description: 'Strength building and endurance challenges.',
        members: [],
      },
    ]);

    const users = await User.insertMany([
      { name: 'Ava Patel', email: 'ava.patel@octofit.com', team: velocityTeam._id },
      { name: 'Liam Chen', email: 'liam.chen@octofit.com', team: velocityTeam._id },
      { name: 'Noah Kim', email: 'noah.kim@octofit.com', team: summitTeam._id },
      { name: 'Sofia Rodriguez', email: 'sofia.rodriguez@octofit.com', team: summitTeam._id },
    ]);

    const velocityUserIds = [users[0]._id, users[1]._id];
    const summitUserIds = [users[2]._id, users[3]._id];

    await Team.findByIdAndUpdate(velocityTeam._id, { members: velocityUserIds });
    await Team.findByIdAndUpdate(summitTeam._id, { members: summitUserIds });

    const activities = await Activity.insertMany([
      {
        user: users[0]._id,
        type: 'Running',
        durationMinutes: 35,
        caloriesBurned: 420,
        date: new Date('2026-08-10T06:30:00.000Z'),
      },
      {
        user: users[1]._id,
        type: 'Cycling',
        durationMinutes: 50,
        caloriesBurned: 540,
        date: new Date('2026-08-11T18:15:00.000Z'),
      },
      {
        user: users[2]._id,
        type: 'Strength Training',
        durationMinutes: 45,
        caloriesBurned: 510,
        date: new Date('2026-08-09T17:00:00.000Z'),
      },
      {
        user: users[3]._id,
        type: 'Yoga',
        durationMinutes: 30,
        caloriesBurned: 240,
        date: new Date('2026-08-12T07:10:00.000Z'),
      },
      {
        user: users[0]._id,
        type: 'HIIT',
        durationMinutes: 25,
        caloriesBurned: 330,
        date: new Date('2026-08-12T12:45:00.000Z'),
      },
    ]);

    const leaderboardEntries = await LeaderboardEntry.insertMany([
      { user: users[0]._id, score: 980, rank: 1 },
      { user: users[2]._id, score: 940, rank: 2 },
      { user: users[1]._id, score: 890, rank: 3 },
      { user: users[3]._id, score: 860, rank: 4 },
    ]);

    const workouts = await Workout.insertMany([
      {
        title: 'Sunrise HIIT Circuit',
        description: 'Bodyweight intervals designed to improve cardio endurance and coordination.',
        durationMinutes: 30,
        difficulty: 'hard',
      },
      {
        title: 'Core Balance Flow',
        description: 'Low-impact mobility and core strengthening session for recovery days.',
        durationMinutes: 25,
        difficulty: 'easy',
      },
      {
        title: 'Power Lift Builder',
        description: 'Compound strength workout focused on legs, back, and upper body stability.',
        durationMinutes: 45,
        difficulty: 'medium',
      },
    ]);

    console.log(
      `Database seeding complete: users=${users.length}, teams=${2}, activities=${activities.length}, leaderboard=${leaderboardEntries.length}, workouts=${workouts.length}`
    );

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
