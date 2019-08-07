import mongoose from 'mongoose';

export interface Song extends mongoose.Document {
  name: string;
  author: string;
  thumbnail: string;
  album: string;
  file: string;
  genre: string;
}

export const SongSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: { type: String, required: true },
  thumbnail: { type: String, required: true },
  album: { type: String, required: true },
  file: { type: String, required: true },
  genre: { type: String, required: true },
});

const Song = mongoose.model<Song>('Song', SongSchema);
export default Song;
