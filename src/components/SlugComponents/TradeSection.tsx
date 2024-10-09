import { useEffect, useState } from 'react';
import TradeItem from './TradeItem';
import axios from 'axios';

const TradeSection: React.FC<{ creator: string, tokenAddress: string }> = ({ creator, tokenAddress }) => {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [offset, setOffset] = useState(0);
  const limit = 100;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tradesData = await axios.get(`/api/trades/all/${tokenAddress}?limit=${limit}&offset=${offset}&minimumSize=0`);
        setTrades(tradesData.data);
      } catch (error) {
        console.error('Error fetching trades:', error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 5000); // Interval Time

    return () => clearInterval(intervalId); // Clear Interval and build component
  }, [tokenAddress, offset]);

  const handleNextPage = () => {
    setOffset(offset + limit);
  };

  const handlePreviousPage = () => {
    if (offset > 0) {
      setOffset(offset - limit);
    }
  };

  return (
    <div className='p-4'>
      <div className="trade-header grid grid-cols-6 gap-4 mb-2 font-medium text-primary font-xl">
        <div>User</div>
        <div>Type</div>
        <div>SOL</div>
        <div>Token Amount</div>
        <div>Date</div>
        <div>Transaction</div>
      </div>
      {trades.map((trade, index) => (
        <TradeItem key={trade.signature + String(index)} trade={trade} creator={creator} />
      ))}
      <div className="pagination-controls flex justify-between mt-4">
        <button onClick={handlePreviousPage} disabled={offset === 0} className="bg-gray-500 text-white px-4 py-2 rounded">
          Previous
        </button>
        <button onClick={handleNextPage} className="bg-gray-500 text-white px-4 py-2 rounded">
          Next
        </button>
      </div>
    </div>
  );
};

export default TradeSection;
