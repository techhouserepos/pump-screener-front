import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export interface DexTokensPair {
  chainId: string;
  dexId: string;
  boosts: {
    active: number;
  }
}

export interface DexTokensResponse {
  pairs: DexTokensPair[]
}

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { mint } = req.query;
    const response = await axios.get<DexTokensResponse>(`https://api.dexscreener.com/latest/dex/tokens/${mint}`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Failed fetch dex token", error });
  }
}
