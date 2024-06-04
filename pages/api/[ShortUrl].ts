import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../utils/dbconnect';
import Url from '../../models/Url';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const { shortUrl } = req.query;

  try {
    const url = await Url.findOne({ shortUrl });

    if (url) {
      res.redirect(url.originalUrl);
    } else {
      res.status(404).json({ error: 'URL not found' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
