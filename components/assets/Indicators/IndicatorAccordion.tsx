// import FibonacciRetracementChartDesktop from "../Finance/Charts/Desktop/FibonacciRetracementChartDesktop";
// import MarketDominanceChartDesktop from "../Finance/Charts/Desktop/MarketDominanceChartDesktop";
// import VolatilityChart from "../Finance/Charts/Desktop/VolatilityChartDesktop";
// import VolumeChartDesktop from "../Finance/Charts/Desktop/VolumeChartDesktop";
// import PercentChangeChartDesktop from "../Finance/Charts/Desktop/PercentChangeChartDesktop";
// import PriceBTCChartDesktop from "../Finance/Charts/Desktop/PriceBTCChartDesktop";
// import GET_ASSET_FINANCIALS from "../../../helpers/queries/assets/getAssetFinancialDetails";
import { FormatUnixTime } from "@/helpers/formatters/time";
import React, { useContext, useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
// @ts-ignore
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import ActiveAddressesChart from "../Finance/Charts/Desktop/ActiveAddressesChart";
import AverageTransactionValueChart from "../Finance/Charts/Desktop/AverageTransactionValueChart";
import HashRateDifficultyChart from "../Finance/Charts/Desktop/HashRateDifficultyChart";
import TransactionSizeChart from "../Finance/Charts/Desktop/TransactionSizeChart";

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
const IndicatorAccordion = ({
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

  const RenderArrows = () => {
    const { isFirstItemVisible, scrollPrev } = useContext(VisibilityContext);
    const { isLastItemVisible, scrollNext } = useContext(VisibilityContext);

    return (
      <div className={"container"}>
        <FaArrowLeft
          size={24}
          color={"black"}
          className={"pointer-link me-4"}
          onClick={() => scrollPrev()}
        />

        <FaArrowRight
          size={24}
          color={"black"}
          className={"pointer-link ms-4"}
          onClick={() => scrollNext()}
        />
      </div>
    );
  };

  return (
    <div className={"text-center w-100 accordion-container"}>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Indicator Panel</Accordion.Header>
        <Accordion.Body>
          <ScrollMenu
            Footer={RenderArrows}
            transitionDuration={2500}
            transitionBehavior={"smooth"}
          >
            {chartData?.map((string, idx) => (
              <div className={"px-2 py-3"} key={idx}>
                {string}
              </div>
            ))}
          </ScrollMenu>
        </Accordion.Body>
      </Accordion.Item>
    </div>
  );
};

export default IndicatorAccordion;
