// pages/api/shorten.js
import dbConnect from '../../utils/dbConnect';
import Url from '../../models/Url';

export default async function handler(req, res) {
  
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
      url = new Url({ originalUrl });
      await url.save();
      res.status(201).json(url);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
