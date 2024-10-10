// src/services/tradingViewDataFeed.ts
import axios from 'axios';

interface PumpData {
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  is_5_min: boolean;
  is_1_min: boolean;
  timestamp: number; // seconds
}

interface GmgnData {
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  time: number; // ms
}

export interface CandleStick {
  time: number;
  value: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export async function fetchPumpCandles(tokenMint: string) {
  try {
    const response = await axios.get<PumpData[]>(`/api/candlesticks/${tokenMint}?offset=0&limit=1000&timeframe=5`);
    return response.data.map((item): CandleStick => ({
      time: item.timestamp, // O lightweight-charts aceita timestamp em segundos
      open: item.open,
      high: item.high,
      low: item.low,
      close: item.close,
      volume: item.volume,
      value: item.volume,
    }));
  } catch (error) {
    console.error("Error fetching pump candles data:", error);
    throw error;
  }
}


export async function fetchGmgnCandles(mint: string, from: number, to: number) {
  try {
    const response = await axios.get<GmgnData[]>(`/api/trades/`, { params: { mint, from, to } });
    return response.data.map((item): CandleStick => ({
      time: Number(Math.round(item.time / 1000)), // O lightweight-charts aceita timestamp em segundos
      open: parseFloat(item.open),
      high: parseFloat(item.high),
      low: parseFloat(item.low),
      close: parseFloat(item.close),
      volume: parseFloat(item.volume),
      value: parseFloat(item.volume),
    }));
  } catch (error) {
    console.error("Error fetching trades candles data:", error);
    throw error;
  }
}
