import dbConnect from '../../utils/dbConnect';
import Url from '../../models/Url';

export default async function handler(req, res) {
  await dbConnect();
  const { ShortUrl } = req.query;

  try {
    const url = await Url.findOne({ shortUrl:ShortUrl });

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
