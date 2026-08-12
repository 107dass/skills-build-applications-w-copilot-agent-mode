import mongoose, { Schema } from 'mongoose';
const LeaderboardEntrySchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, required: true, default: 0 },
    rank: { type: Number, required: true, default: 0 },
    updatedAt: { type: Date, default: () => new Date() },
});
const LeaderboardEntry = mongoose.model('LeaderboardEntry', LeaderboardEntrySchema);
export default LeaderboardEntry;
