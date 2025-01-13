import { NextApiRequest, NextApiResponse } from 'next';
import { createShortUrl,getOriginalUrl } from '../../models/redisUrl';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { originalUrl } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ error: 'Original URL is required' });
  }

  try {
    let url = await getOriginalUrl(originalUrl);

    if (url) {
      res.status(200).json(url);
    } else {
      let url= await createShortUrl(originalUrl);
      res.status(201).json(url);
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
