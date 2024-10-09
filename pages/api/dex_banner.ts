import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { mint } = req.query;
    const response = await axios.get(`http://localhost:3001/dex_banner?mint=${mint}`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Failed fetch dex banner", error });
  }
}
