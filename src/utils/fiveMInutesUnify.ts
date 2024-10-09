// pode ser útil
import { CandleStick } from "@/services/tradingViewDataFeed";

function getNewCandleStick(): CandleStick {
  return {
    time: 0,
    open: 0,
    close: 0,
    high: 0,
    low: 0,
    value: 0,
    volume: 0,
    is_1_min: true,
    is_5_min: true,
  };
}

interface HoursMap {
  [key: number]: CandleStick[],
}

function getNewHourMap(): HoursMap {
  return {
    0: [],
    5: [],
    10: [],
    15: [],
    20: [],
    25: [],
    30: [],
    35: [],
    40: [],
    45: [],
    50: [],
    55: [],
  };
}

const keys = Object.keys(getNewHourMap()).map((key) => Number(key));
keys.sort((a, b) => b - a);

export default function fiveMinutesUnify(candles: CandleStick[]) {
  const all: {[key: string]: HoursMap[]} = {};
  candles.forEach((candle) => {
    const candleDate = new Date(Number(candle.time) * 1000);
    const str = `${candleDate.toLocaleDateString('pt-br')}-${candleDate.getHours()}`
    if (!all[str]) {
      all[str] = [getNewHourMap()];
    }
    const currentMap = all[str][all[str].length - 1];
    const minutes = candleDate.getMinutes();
    for (const key of keys) {
      if (minutes >= key) {
        currentMap[key].push(candle);
        break;
      }
    }
  });
  const newCandles: CandleStick[] = [];
  Object.keys(all).forEach((key) => {
    all[key].forEach((map) => {
      Object.keys(map).forEach((hourKey) => {
        const hour = Number(hourKey);
        if (map[hour]?.length) {
          const newCandle = getNewCandleStick();
          map[hour].forEach((candle) => {
            newCandle.time = candle.time;
            newCandle.close += candle.close;
            newCandle.open += candle.open;
            newCandle.high = Math.max(newCandle.high, candle.high);
            newCandle.low = Math.min(newCandle.low || Infinity, candle.low);
            newCandle.volume += candle.volume;
            newCandle.value = newCandle.volume;
            newCandle.is_1_min = candle.is_1_min;
            newCandle.is_5_min = candle.is_5_min;
          });
          newCandle.close /= map[hour].length;
          newCandle.open /= map[hour].length;
          newCandle.volume /= map[hour].length;
          newCandle.value /= map[hour].length;
          let newDate = new Date(Number(newCandle.time) * 1000);
          newDate.setMinutes(hour);
          newDate = new Date(newDate);
          newCandle.time = newDate.getTime() / 1000;
          newCandles.push(newCandle);
        }
      })
    })
  })
  return newCandles;
}
