import axios from 'axios';
import secureHandler, { Handle } from '../../../middlewares/secure_handler';

const likes: Handle = async (req, res) => {
  if (req.method === "POST") {
    try {
      const response = await axios.post('http://localhost:3001/likes', req.body);
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to interact with token icon' });
    }
  } else {
    try {
      const response = await axios.get(`http://localhost:3001/likes?mint=${req.query.mint}&userLikeToken=${req.query.userLikeToken}`);
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch like token icon' });
    }
  }
}

export default secureHandler(likes);
