import mongoose, { Document, Schema } from 'mongoose';
import shortid from 'shortid';

export interface IUrl extends Document {
  originalUrl: string;
  shortUrl: string;
  createdAt: Date;
}

const UrlSchema: Schema = new Schema({
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, default: shortid.generate },
  createdAt: { type: Date, default: Date.now, expires: '31d' },
});

export default mongoose.models.Url || mongoose.model<IUrl>('Url', UrlSchema);
