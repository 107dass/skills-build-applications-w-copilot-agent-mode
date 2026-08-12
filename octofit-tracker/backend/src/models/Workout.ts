import mongoose, { Document, Schema } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  description?: string;
  durationMinutes: number;
  difficulty: 'easy' | 'medium' | 'hard';
  createdAt: Date;
}

const WorkoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true },
  description: { type: String },
  durationMinutes: { type: Number, required: true },
  difficulty: { type: String, required: true, enum: ['easy', 'medium', 'hard'] },
  createdAt: { type: Date, default: () => new Date() },
});

const Workout = mongoose.model<IWorkout>('Workout', WorkoutSchema);

export default Workout;
