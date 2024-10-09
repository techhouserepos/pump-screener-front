// src/components/ThreadTradesSection.tsx
import { useState } from 'react';
import CommentSection from './CommentSection';
import TradeSection from './TradeSection';

const ThreadTradesSection: React.FC<{ tokenAddress: string, creator: string }> = ({ tokenAddress, creator }) => {
  const [activeTab, setActiveTab] = useState<'thread' | 'trades'>('thread');

  return (
    <div className="py-4 rounded-lg shadow w-full">
      <div className="flex justify-between mb-4">
        <button
          className={`px-4 py-2 rounded z-10 ${activeTab === 'thread' ? 'bg-primary text-secondary font-medium' : 'bg-secondary'}`}
          onClick={() => setActiveTab('thread')}
        >
          Thread
        </button>
        <button
          className={`px-4 py-2 rounded z-10 ${activeTab === 'trades' ? 'bg-primary text-secondary font-medium' : 'bg-secondary'}`}
          onClick={() => setActiveTab('trades')}
        >
          Trades
        </button>
      </div>
      {activeTab === 'thread' ? (
        <div className="rounded-lg">
          <CommentSection tokenAddress={tokenAddress} creator={creator} />
        </div>
      ) : (
        <div className="bg-black bg-opacity-40 p-4 rounded-lg">
          <TradeSection creator={creator} tokenAddress={tokenAddress} />
        </div>
      )}
    </div>
  );
};

export default ThreadTradesSection;
