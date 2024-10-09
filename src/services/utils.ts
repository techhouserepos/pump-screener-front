export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const formatSolAmount = (amount: number): string => {
  return (amount / 1e9).toFixed(4);
};

export const formatNumber = (num: number) => {
  if (num >= 1000000000000) {
    return (num / 1000000000000).toFixed(2) + 'M';
  } else if (num <= 1000000000000) {
    let numStr = num.toString();
    let formattedNumber = numStr.slice(0, 3) + '.' + numStr.slice(3, 5) + 'k';
    return formattedNumber;
  } else {
    return num.toString();
  }
};

export const timeAgo = (timestamp: string): string => {
  const now = new Date();
  const then = new Date(parseInt(timestamp) * 1000);
  const diffMs = now.getTime() - then.getTime();
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  if (diffHrs > 0) {
    return `${diffHrs}h ago`;
  } else {
    return `${diffMins}m ago`;
  }
};