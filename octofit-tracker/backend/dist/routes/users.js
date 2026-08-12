import { Router } from 'express';
import User from '../models/User.js';
const router = Router();
router.get('/', async (req, res) => {
    const users = await User.find().populate('team');
    res.json(users);
});
router.post('/', async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
});
export default router;
