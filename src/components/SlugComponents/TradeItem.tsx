import { formatSolAmount, formatNumber, timeAgo } from "@/services/utils";

const TradeItem: React.FC<{ trade: Trade, creator: string }> = ({ trade, creator }) => {
  const user = trade.username ? trade.username : trade.user.slice(0, 6);
  const creatorTag = trade.user === creator ? ' (dev)' : '';
  const tradeTypeClass = trade.is_buy ? 'text-green-500' : 'text-red-500';
  const tradeType = trade.is_buy ? 'buy' : 'sell';
  const transactionLink = `https://solscan.io/tx/${trade.signature}`;
  const profileLink = `https://pump.fun/profile/${trade.user}`;

  return (
    <div className="trade-item grid grid-cols-6 gap-4 mb-2">
      <div>
        <a href={profileLink} target="_blank" rel="noopener noreferrer">
          {`${user}${creatorTag}`}
        </a>
      </div>
      <div className={tradeTypeClass}>{tradeType}</div>
      <div>{formatSolAmount(trade.sol_amount)}</div>
      <div>{formatNumber(trade.token_amount)}</div>
      <div>{timeAgo(trade.timestamp)}</div>
      <div>
        <a href={transactionLink} target="_blank" rel="noopener noreferrer">
          {trade.signature.slice(0, 6)}
        </a>
      </div>
    </div>
  );
};

export default TradeItem;