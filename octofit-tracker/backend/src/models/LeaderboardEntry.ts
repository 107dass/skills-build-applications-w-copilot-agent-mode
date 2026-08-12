import mongoose, { Document, Schema } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  user: mongoose.Types.ObjectId;
  score: number;
  rank: number;
  updatedAt: Date;
}

const LeaderboardEntrySchema = new Schema<ILeaderboardEntry>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true, default: 0 },
  rank: { type: Number, required: true, default: 0 },
  updatedAt: { type: Date, default: () => new Date() },
});

const LeaderboardEntry = mongoose.model<ILeaderboardEntry>('LeaderboardEntry', LeaderboardEntrySchema);

export default LeaderboardEntry;
