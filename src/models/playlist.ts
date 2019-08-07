import mongoose from 'mongoose';
import { Song } from './song';
import { User } from './user';

export interface Playlist extends mongoose.Document {
  author: User;
  title: string;
  description: string;
  thumbnail: string;
  songs: Song[];
}

export const PlaylistSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  title: { type: String, required: true },
  description: { type: String, required: true },
  thumbnail: { type: String, required: true },
  songs: { type: Array, required: false },
});

const Playlist = mongoose.model<Playlist>('Playlist', PlaylistSchema);
export default Playlist;
