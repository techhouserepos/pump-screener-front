import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    try {
      const response = await axios.get('http://localhost:3001/usd_market_cap');
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch Raydium data' });
    }
  }
  