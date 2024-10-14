import axios from 'axios';
import secureHandler, { Handle } from '../../../middlewares/secure_handler';

const profileTokens: Handle = async (req, res) => {
  try {
    const response = await axios.post("http://localhost:3001/profile_tokens", req.body);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Erro ao fazer a requisição externa:', error);
    res.status(500).json({ message: 'Erro ao buscar os tokens' });
  }
}

export default secureHandler(profileTokens);
