import { Colors, MediaQueries } from "@/styles/variables";
import styled from "styled-components";

import { FormatUnixTime } from "@/helpers/formatters/time";
import { useEffect, useState } from "react";
// @ts-ignore

import ActiveAddressesChart from "@/components/assets/Finance/Charts/Desktop/ActiveAddressesChart";
import AverageTransactionValueChart from "@/components/assets/Finance/Charts/Desktop/AverageTransactionValueChart";
import HashRateDifficultyChart from "@/components/assets/Finance/Charts/Desktop/HashRateDifficultyChart";
import TransactionSizeChart from "@/components/assets/Finance/Charts/Desktop/TransactionSizeChart";

interface IndicatorAccordion {
  timeQuery: number;
  id: string;
  blockchainData: BlockChainData[];
}

interface BlockChainData {
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

/**
 *
 * @param timeQuery: how many days the data is rendered for
 * @param id: the symbol of the asset currently being shown
 * @param blockChainData: the indicator data (BTC or ETH related)
 * @returns IndicatorAccordion the component rendering indicator charts
 */

const IndicatorGrid = ({
  timeQuery = 90,
  id,
  blockchainData,
}: IndicatorAccordion) => {
  const [ribbonData, setRibbonData] = useState();
  const [chartData, setChartData] = useState<any>();

  // const [getRibbon, { data, loading, error, refetch }] = useLazyQuery(
  //   GET_DIFFICULTY_RIBBONS
  // );

  const availableTimes = [730, 365, 180, 90, 30, 14];

  useEffect(() => {
    formatData();

    // if (id === "btc") {
    //   getRibbon({
    //     variables: {
    //       symbol: id || "BTC",
    //       cut: timeQuery,
    //     },
    //   });
    // }
  }, [timeQuery]);

  const formatData = () => {
    if (!blockchainData) return [];

    let addresses = [];
    let averageTransValue = [];
    let transactionCountRatios = [];
    let difficulty = [];

    for (let i of blockchainData) {
      addresses.push({
        new_addresses: i.new_addresses,
        active_addresses: i.active_addresses,
        time: FormatUnixTime(i.time),
      });
      averageTransValue.push({
        symbol: i.symbol,
        average_transaction_value: i.average_transaction_value,
        time: FormatUnixTime(i.time),
      });

      transactionCountRatios.push({
        transaction_count: i.transaction_count,
        large_transaction_count: i.large_transaction_count,
        time: FormatUnixTime(i.time),
      });

      difficulty.push({
        difficulty: i.difficulty,
        hash_rate: i.hashrate,
        time: FormatUnixTime(i.time),
      });
    }

    const formatData = {
      addresses,
      averageTransValue,
      transactionCountRatios,
      difficulty,
    };

    const charts = [
      formatData?.addresses && (
        <ActiveAddressesChart data={formatData.addresses} />
      ),
      formatData?.transactionCountRatios && (
        <TransactionSizeChart data={formatData.transactionCountRatios} />
      ),
      formatData?.averageTransValue && (
        <AverageTransactionValueChart data={formatData.averageTransValue} />
      ),
      formatData?.difficulty && (
        <HashRateDifficultyChart data={formatData.difficulty} />
      ),
    ];

    setChartData(charts);
    return charts;
  };

  return (
    <GridContainer>
      {chartData?.map((string, idx) => (
        <ChartCard key={idx}>{string}</ChartCard>
      ))}
    </GridContainer>
  );
};

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  /* grid-template-rows: 1fr 1fr 1fr; */
  grid-template-rows: auto;
  grid-gap: 24px;
  width: 100%;
  padding: 24px 0;

  @media ${MediaQueries.MD} {
    padding: 24px;
    grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  }
`;

const ChartCard = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;

  border: 1px solid black;
  border-radius: 10px;
  padding: 1rem 1rem;
  background-color: ${Colors.lightGray};
`;

export default IndicatorGrid;
