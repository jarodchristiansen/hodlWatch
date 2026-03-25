export interface BlockChainData {
  active_addresses: number;
  average_transaction_value: number;
  block_height: number;
  block_size: number;
  block_time: number;
  current_supply: number;
  difficulty: number;
  hashrate: number;
  large_transaction_count: number;
  new_addresses: number;
  symbol: string;
  time: number;
  transaction_count: number;
  transaction_count_all_time: number;
  unique_addresses_all_time: number;
  zero_balance_addresses_all_time: number;
  __typename: string;
}

export type IndicatorAccordionProps = Readonly<{
  timeQuery?: number;
  id: string;
  blockchainData: BlockChainData[];
}>;
