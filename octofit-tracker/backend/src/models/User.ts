import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  team?: mongoose.Types.ObjectId;
  joinedAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team' },
  joinedAt: { type: Date, default: () => new Date() },
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
