import { FormatUnixTime } from "@/helpers/formatters/time";
import type { ReactNode } from "react";

import ActiveAddressesChart from "../Finance/Charts/Desktop/ActiveAddressesChart";
import AverageTransactionValueChart from "../Finance/Charts/Desktop/AverageTransactionValueChart";
import HashRateDifficultyChart from "../Finance/Charts/Desktop/HashRateDifficultyChart";
import TransactionSizeChart from "../Finance/Charts/Desktop/TransactionSizeChart";
import type { BlockChainData } from "./indicatorTypes";

export type IndicatorChartSlot = Readonly<{ id: string; node: ReactNode }>;

export function buildIndicatorChartSlots(
  blockchainData: BlockChainData[]
): IndicatorChartSlot[] {
  const addresses = [];
  const averageTransValue = [];
  const transactionCountRatios = [];
  const difficulty = [];

  for (const row of blockchainData) {
    addresses.push({
      new_addresses: row.new_addresses,
      active_addresses: row.active_addresses,
      time: FormatUnixTime(row.time),
    });
    averageTransValue.push({
      symbol: row.symbol,
      average_transaction_value: row.average_transaction_value,
      time: FormatUnixTime(row.time),
    });

    transactionCountRatios.push({
      transaction_count: row.transaction_count,
      large_transaction_count: row.large_transaction_count,
      time: FormatUnixTime(row.time),
    });

    difficulty.push({
      difficulty: row.difficulty,
      hash_rate: row.hashrate,
      time: FormatUnixTime(row.time),
    });
  }

  const slots: IndicatorChartSlot[] = [];

  if (addresses.length > 0) {
    slots.push({
      id: "active-addresses",
      node: <ActiveAddressesChart data={addresses} />,
    });
  }
  if (transactionCountRatios.length > 0) {
    slots.push({
      id: "transaction-size",
      node: <TransactionSizeChart data={transactionCountRatios} />,
    });
  }
  if (averageTransValue.length > 0) {
    slots.push({
      id: "avg-tx-value",
      node: <AverageTransactionValueChart data={averageTransValue} />,
    });
  }
  if (difficulty.length > 0) {
    slots.push({
      id: "hash-rate-difficulty",
      node: <HashRateDifficultyChart data={difficulty} />,
    });
  }

  return slots;
}
