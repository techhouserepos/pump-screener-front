import axios from 'axios';

export async function getData(slug: string): Promise<TokenData> {
  const res = await fetch(`/api/coins/${slug}`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export async function fetchComments(tokenAddress: string): Promise<Comment[]> {
  const response = await axios.get(`/api/replies/${tokenAddress}`);
  return response.data;
}

export async function fetchTrades(tokenAddress: string, limit: number, offset: number): Promise<Trade[]> {
  const response = await axios.get(`/api/trades/${tokenAddress}?limit=${limit}&offset=${offset}`);
  return response.data;
}
