import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../utils/dbconnect';
import Url from '../../models/Url';
import { IUrl } from '../../models/Url';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const { originalUrl } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ error: 'Original URL is required' });
  }

  try {
    let url = await Url.findOne({ originalUrl });

    if (url) {
      res.status(200).json(url);
    } else {
      url = new Url({ originalUrl } as IUrl);
      await url.save();
      res.status(201).json(url);
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
