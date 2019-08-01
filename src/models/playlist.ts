import mongoose from 'mongoose';

export interface IPlaylist extends mongoose.Document {
  title: string;
  description: string;
  thumbnail: string;
};

export const PlaylistSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  thumbnail: { type: String, required: true },
});

const Playlist = mongoose.model<IPlaylist>('Playlist', PlaylistSchema);
export default Playlist;
