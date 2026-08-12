import mongoose, { Schema } from 'mongoose';
const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    joinedAt: { type: Date, default: () => new Date() },
});
const User = mongoose.model('User', UserSchema);
export default User;
