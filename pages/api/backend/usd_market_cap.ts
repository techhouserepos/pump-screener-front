import axios from 'axios';
import secureHandler, { Handle } from '../../../middlewares/secure_handler';

const usdMarketCap: Handle = async (req, res) => {
  try {
    const response = await axios.get('http://localhost:3001/usd_market_cap');
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch More Close Raydium data' });
  }
}

export default secureHandler(usdMarketCap);
