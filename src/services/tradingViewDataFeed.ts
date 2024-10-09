// src/services/tradingViewDataFeed.ts
import axios from 'axios';

interface CommonData {
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  is_5_min: boolean;
  is_1_min: boolean;
}

interface ResponseData extends CommonData {
  timestamp: number;
}

export interface CandleStick extends CommonData {
  time: number;
  value: number;
}

export async function fetchTokenData(tokenMint: string) {
  try {
    const response = await axios.get<ResponseData[]>(`/api/candlesticks/${tokenMint}?offset=0&limit=1000&timeframe=5`);
    return response.data.map((item): CandleStick => ({
      time: item.timestamp, // O lightweight-charts aceita timestamp em segundos
      open: item.open,
      high: item.high,
      low: item.low,
      close: item.close,
      volume: item.volume,
      value: item.volume,
      is_5_min: item.is_5_min,
      is_1_min: item.is_1_min,
    }));
  } catch (error) {
    console.error("Error fetching token data:", error);
    throw error;
  }
}
