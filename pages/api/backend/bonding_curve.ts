import axios from 'axios';
import secureHandler, { Handle } from '../../../middlewares/secure_handler';

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

const bondingCurve: Handle = async (req, res) => {
  const headers = { ...req.headers };
  delete headers.api_token;
  try {
    const response = await axios.get<BondingCurveResponse>('http://localhost:3001/bonding_curve', { headers });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bonding curve data' });
  }
}

export default secureHandler(bondingCurve);
