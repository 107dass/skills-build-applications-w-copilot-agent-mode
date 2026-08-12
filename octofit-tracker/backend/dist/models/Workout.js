import mongoose, { Schema } from 'mongoose';
const WorkoutSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    durationMinutes: { type: Number, required: true },
    difficulty: { type: String, required: true, enum: ['easy', 'medium', 'hard'] },
    createdAt: { type: Date, default: () => new Date() },
});
const Workout = mongoose.model('Workout', WorkoutSchema);
export default Workout;
