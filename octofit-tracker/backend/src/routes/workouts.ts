import { Router } from 'express';
import Workout from '../models/Workout.js';

const router = Router();

router.get('/', async (req, res) => {
  const workouts = await Workout.find();
  res.json(workouts);
});

router.post('/', async (req, res) => {
  const workout = new Workout(req.body);
  await workout.save();
  res.status(201).json(workout);
});

export default router;
