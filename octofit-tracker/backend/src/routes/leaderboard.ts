import { Router } from 'express';
import LeaderboardEntry from '../models/LeaderboardEntry.js';

const router = Router();

router.get('/', async (req, res) => {
  const entries = await LeaderboardEntry.find().populate('user').sort({ rank: 1, score: -1 });
  res.json(entries);
});

router.post('/', async (req, res) => {
  const entry = new LeaderboardEntry(req.body);
  await entry.save();
  res.status(201).json(entry);
});

export default router;
