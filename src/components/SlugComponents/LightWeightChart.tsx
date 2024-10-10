// src/SlugComponents/LightweightChart.tsx
"use client";

import React, { useEffect, useRef, useState } from 'react';
import { CandlestickData, CandlestickSeriesOptions, createChart, IChartApi, ISeriesApi, Range, Time, WhitespaceData } from 'lightweight-charts';
import { CandleStick, fetchGmgnCandles, fetchPumpCandles } from '@/services/tradingViewDataFeed';

type CandleStickSeries = ISeriesApi<"Candlestick", Time, CandlestickData<Time> | WhitespaceData<Time>, CandlestickSeriesOptions>;
type ChartState = { chart: IChartApi, series: CandleStickSeries };
interface LightweightChartProps {
  tokenMint: string;
  inRaydium?: boolean;
  onUpdate?: React.Dispatch<React.SetStateAction<boolean>>;
}

const THREE_HOURS_SECONDS = 10800;

const LightweightChart: React.FC<LightweightChartProps> = ({ tokenMint, onUpdate, inRaydium }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [chartState, setChartState] = useState<ChartState | null>(null);
  const [data, setData] = useState<CandleStick[] | null>(null);
  const [makeRequest, setMakeRequest] = useState(true);
  const [range, setRange] = useState<Range<Time> | null>(null)

  useEffect(() => {
    if (chartContainerRef.current && chartContainerRef.current.children.length === 0) {
      const chart = createChart(chartContainerRef.current, {
        layout: {
          background: { color: '#020d12' },
          textColor: '#99f5dc',
        },
        grid: {
          vertLines: {
            color: '#2a2e39',
          },
          horzLines: {
            color: '#2a2e39',
          },
        },
        crosshair: {
          mode: 0,
        },

        timeScale: {
          borderColor: '#485c7b',
          timeVisible: true,
          secondsVisible: true
        },
      });
      const series = chart.addCandlestickSeries({
        upColor: '#4caf50',
        downColor: '#f44336',
        borderDownColor: '#f44336',
        borderUpColor: '#4caf50',
        wickDownColor: '#f44336',
        wickUpColor: '#4caf50',
        priceFormat: {
          type: "price",
          precision: 10,
          minMove: 0.0000000001,
        },
      });
      if (inRaydium) {
        let timeout: NodeJS.Timeout | undefined;
        chart.timeScale().subscribeVisibleLogicalRangeChange((logicalRange) => {
          if (logicalRange && logicalRange.from <= -15) {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
              setRange(chart.timeScale().getVisibleRange());
            }, 2000)
          }
        })
      }
      chart.timeScale().applyOptions({ barSpacing: 0 });
      chart.timeScale().fitContent();
      setChartState({ chart, series });     
      window.addEventListener("resize", () => {
        if (chart && chartContainerRef.current) {
          chart.resize(chartContainerRef.current.clientWidth, chartContainerRef.current.clientHeight);
        }
      });
      return () => {
        console.log("unmonted")
        chart.remove();
      };
    }
  }, []);

  useEffect(() => {
    if (chartState && makeRequest) {
      setMakeRequest(false);
      if (!inRaydium) {
        fetchPumpCandles(tokenMint)
          .then((candles) => {
            if (
              !data
              || data.length !== candles.length
              || data.length && candles.length && (data[data.length - 1].time !== candles[candles.length - 1].time || data[data.length - 1].close !== candles[candles.length - 1].close)
            ) {
              setData(candles);
            }
          })
          .catch((err) => console.error("Fail fetching token candles data", err))
          .finally(() => setTimeout(() => setMakeRequest(true), 1000));
      } else {
        let to = 0;
        let from = 0;
        if (!data?.length) {
          const currentDate = new Date();
          to = currentDate.getTime() / 1000;
          currentDate.setHours(currentDate.getHours() - 3);
          from = new Date(currentDate).getTime() / 1000;
        } else {
          from = Number(data[data.length - 1].time) + 1;
          to = from + THREE_HOURS_SECONDS;
        }
        fetchGmgnCandles(tokenMint, Math.round(from), Math.round(to))
          .then((candles) => {
            if (!data?.length) {
              setData(candles);
            } else if (candles.length) {
              const lastCandle = data[data.length - 1];
              const [firstCandle, ...rest] = candles;
              let newData: CandleStick[] = [];
              if (lastCandle.time !== firstCandle.time) {
                newData = [...data, ...candles];
              } else if (
                candles.length > 1
                || lastCandle.close !== firstCandle.close
                || lastCandle.open !== firstCandle.open
                || lastCandle.high !== firstCandle.high
                || lastCandle.low !== firstCandle.low
              ) {
                const cp = [...data];
                cp[cp.length - 1] = { ...firstCandle };
                newData = [...cp, ...rest];
              }
              if (newData.length) {
                setData(newData);
              }
            }
          })
          .catch((err) => console.error("Fail fetching trades candles data", err))
          .finally(() => setTimeout(() => setMakeRequest(true), 1500));
      }
    }
  }, [data, makeRequest, chartState, tokenMint, inRaydium]);

  useEffect(() => {
    if (chartState && data) {
      chartState.series.setData(data as unknown as CandlestickData<Time>[]);
      if (onUpdate) {
        onUpdate(true);
      }
    }
  }, [data, chartState, tokenMint, onUpdate]);

  useEffect(() => {
    if (data && chartState && range) {
      setRange(null);
      const from = Number(range.from) - THREE_HOURS_SECONDS;
      const to = Number(range.from) - 1;
      fetchGmgnCandles(tokenMint, from, to)
        .then((candles) => setData([...candles, ...data]))
        .catch((err) => console.error(err));
    }
  }, [chartState, data, range, tokenMint]);

  return <div ref={chartContainerRef} className='bg-gray-500 w-full max-w-[1600px] h-96 mb-4 m-auto' />
};

export default LightweightChart;
