import { NextApiRequest, NextApiResponse } from 'next';
import { getOriginalUrl } from '../../models/redisUrl';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const { ShortUrl } = req.query;

  try {
    const url = await getOriginalUrl(ShortUrl as string);

    if (url) {
      res.redirect(url);
    } else {
      //render a client component for 404 page
      res.redirect('/404');
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
