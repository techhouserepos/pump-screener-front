import React from 'react';

export default function MarketCap({ value }: { value: number }) {
  return (
    <div className="text-sm">
      <span>
        Market Cap:
      </span>
      {" "}
      <span className="text-green-400">
        ${Number(Number(value).toFixed(2)).toLocaleString()}
      </span>
    </div>
  );
}
