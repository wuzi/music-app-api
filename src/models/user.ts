import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { Playlist } from './playlist';

export interface User extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  playlists: Playlist[];
}

export const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  playlists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Playlist' }],
});

/* istanbul ignore next */
UserSchema.pre('save', function (this: User): void {
  this.password = bcrypt.hashSync(this.password, 10);
});

const User = mongoose.model<User>('User', UserSchema);
export default User;
