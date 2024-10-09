import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await axios.post("http://localhost:3001/profile_tokens", req.body);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Erro ao fazer a requisição externa:', error);
    res.status(500).json({ message: 'Erro ao buscar os tokens' });
  }
}
