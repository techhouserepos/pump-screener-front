import axios from 'axios';
import secureHandler, { Handle } from '../../../middlewares/secure_handler';

const candlesticks: Handle = async (req, res) => {
  try {
    const { mint, from, to } = req.query;
    const response = await axios.get(`http://localhost:3001/trades?mint=${mint}&from=${from}&to=${to}`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Failed fetch raydium candlesticks", error });
  }
}

export default secureHandler(candlesticks);
