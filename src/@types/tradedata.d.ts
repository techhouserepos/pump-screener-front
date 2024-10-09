interface Trade {
  username: string | null;
  user: string;
  is_buy: boolean;
  sol_amount: number;
  token_amount: number;
  timestamp: string;
  signature: string;
}
