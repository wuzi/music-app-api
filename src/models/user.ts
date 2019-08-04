import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { IPlaylist } from './playlist';

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  playlists: IPlaylist[];
};

export const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  playlists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Playlist' }],
});

UserSchema.pre('save', function (this: IUser) {
  this.password = bcrypt.hashSync(this.password, 10);
});

const User = mongoose.model<IUser>('User', UserSchema);
export default User;
