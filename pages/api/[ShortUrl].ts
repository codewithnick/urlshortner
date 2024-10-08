import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../utils/dbconnect';
import Url from '../../models/Url';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const { ShortUrl } = req.query;

  try {
    const url = await Url.findOne({ shortUrl:ShortUrl });

    if (url) {
      res.redirect(url.originalUrl);
    } else {
      //render a client component for 404 page
      res.redirect('/404');
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
