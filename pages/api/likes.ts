import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const response = await axios.post('http://localhost:3001/likes', req.body);
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to interact with token icon' });
    }
  } else {
    try {
      const response = await axios.get(`http://localhost:3001/likes?mint=${req.query.mint}&userLikeToken=${req.query.userLikeToken}`);
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch like token icon' });
    }
  }
}

