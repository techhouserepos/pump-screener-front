import axios from 'axios';
import secureHandler, { Handle } from '../../middlewares/secure_handler';

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

const dexTokens: Handle = async (req, res) => {
  try {
    const { mint } = req.query;
    const response = await axios.get<DexTokensResponse>(`https://api.dexscreener.com/latest/dex/tokens/${mint}`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Failed fetch dex token", error });
  }
}

export default secureHandler(dexTokens);
