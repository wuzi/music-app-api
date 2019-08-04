import mongoose from 'mongoose';
import { ISong } from './song';
import { IUser } from './user';

export interface IPlaylist extends mongoose.Document {
  author: IUser;
  title: string;
  description: string;
  thumbnail: string;
  songs: ISong[];
};

export const PlaylistSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  title: { type: String, required: true },
  description: { type: String, required: true },
  thumbnail: { type: String, required: true },
  songs: { type: Array, required: false },
});

const Playlist = mongoose.model<IPlaylist>('Playlist', PlaylistSchema);
export default Playlist;
