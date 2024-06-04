// models/Url.js
import mongoose from 'mongoose';
import shortid from 'shortid';

const UrlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, default: shortid.generate },
  createdAt: { type: Date, default: Date.now, expires: '7d' }, // URLs expire after 7 days
});

module.exports = mongoose.models.Url || mongoose.model('Url', UrlSchema);
