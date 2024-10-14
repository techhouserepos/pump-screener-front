import axios from 'axios';
import secureHandler, { Handle } from '../../../middlewares/secure_handler';

const dexBanner: Handle = async (req, res) => {
  try {
    const { mint } = req.query;
    const response = await axios.get(`http://localhost:3001/dex_banner?mint=${mint}`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Failed fetch dex banner", error });
  }
}

export default secureHandler(dexBanner);
