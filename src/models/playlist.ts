import mongoose from 'mongoose';
import { ISong } from './song';

export interface IPlaylist extends mongoose.Document {
  title: string;
  description: string;
  thumbnail: string;
  songs: ISong[];
};

export const PlaylistSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  thumbnail: { type: String, required: true },
  songs: { type: Array, required: false },
});

const Playlist = mongoose.model<IPlaylist>('Playlist', PlaylistSchema);
export default Playlist;
