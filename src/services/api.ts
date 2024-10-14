import axios from 'axios';
import { ApiToken } from '../../middlewares/api_token';
import { AES } from 'crypto-js';

export async function getData(slug: string): Promise<TokenData> {
  const res = await fetch(`/pumpfun/coins/${slug}`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export async function fetchComments(tokenAddress: string): Promise<Comment[]> {
  const response = await axios.get(`/pumpfun/replies/${tokenAddress}`);
  return response.data;
}

export async function fetchTrades(tokenAddress: string, limit: number, offset: number): Promise<Trade[]> {
  const response = await axios.get(`/pumpfun/trades/${tokenAddress}?limit=${limit}&offset=${offset}`);
  return response.data;
}

export function getApiToken() {
  const payload: ApiToken = {
    location: window.location.href,
    created: Date.now(),
  }
  console.log("api key", process.env.API_KEY)
  return AES.encrypt(JSON.stringify(payload), process.env.API_KEY || "secret").toString();
}

export function backend() {
  return axios.create({ baseURL: "/api/backend", headers: { api_token: getApiToken() } });
}

export function api() {
  return axios.create({ baseURL: "/api", headers: { api_token: getApiToken() } });
}
