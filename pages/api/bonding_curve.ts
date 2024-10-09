import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export type BondingCurveResponse = {
  marketCapSol: number;
  marketCapUSD: number;
  finalMarketCapSol: number;
  finalMarketCapUSD: number;
  realSolReserves: number;
  virtualSolReserves: number;
  realTokenReserves: number;
  virtualTokenReserves: number;
  percent: number;
};

export default async function GET(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await axios.get<BondingCurveResponse>('http://localhost:3001/bonding_curve', { headers: { ...req.headers } });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Raydium data' });
  }
}
