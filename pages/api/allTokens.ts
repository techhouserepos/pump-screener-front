import Cors from 'cors';
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const cors = Cors({
  methods: ['GET', 'HEAD'],
});

function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await runMiddleware(req, res, cors); 

  try {
    const response = await axios.get('https://frontend-api.pump.fun/coins', {
      params: {
        offset: 3,
        limit: 50,
        sort: 'created_timestamp',
        order: 'DESC',
        includeNsfw: false,
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Erro ao fazer a requisição externa:', error);
    res.status(500).json({ message: 'Erro ao buscar os tokens' });
  }
}
