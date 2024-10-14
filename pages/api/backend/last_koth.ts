import axios from 'axios';
import secureHandler, { Handle } from '../../../middlewares/secure_handler';

const lastKoth: Handle = async (req, res) => {
  try {
    const response = await axios.get('http://localhost:3001/king_of_the_hill');
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch KotH data' });
  }
}

export default secureHandler(lastKoth);
