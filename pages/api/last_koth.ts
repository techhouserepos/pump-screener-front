import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    try {
      const response = await axios.get('http://localhost:3001/king_of_the_hill');
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch KotH data' });
    }
  }
  