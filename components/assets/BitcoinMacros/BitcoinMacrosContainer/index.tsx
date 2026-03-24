import { useMemo } from "react";

import SharpeRatioChart from "../../Finance/Charts/Bitcoin/SharpeRatioChart";
import WAPChart from "../../Finance/Charts/Bitcoin/WAPCharts";

interface BitcoinMacrosProps {
  MacroData: MacroPoint[];
}

interface MacroPoint {
  TWAP: number;
  VWAP: number;
  close: number;
  high: number;
  low: number;
  open: number;
  returns?: number;
  rolling_sharpe?: number;
  time: number;
  totalvolume: number;
  volumefrom: number;
  volumeto: number;
}

/**
 *
 * @param MacroData: the assets calculated from Python server/notebook for BTC long term
 * @returns The container/charts associated with Bitcoin macros VWAP/TWAP/MVRV/Sharpe
 */
const BitcoinMacrosContainer = ({ MacroData }: BitcoinMacrosProps) => {
  const [WAPData, SharpeData] = useMemo(() => {
    if (!MacroData?.length) {
      return [[], []];
    }

    const wapDatas: {
      twap: number;
      vwap: number;
      open: number;
      close: number;
      time: number;
    }[] = [];
    const sharpes: {
      rolling_sharpe?: number;
      close: number;
      time: number;
    }[] = [];

    MacroData.forEach((datapoint) => {
      wapDatas.push({
        twap: datapoint.TWAP,
        vwap: datapoint.VWAP,
        open: datapoint.open,
        close: datapoint.close,
        time: datapoint.time,
      });

      sharpes.push({
        rolling_sharpe: datapoint.rolling_sharpe,
        close: datapoint.close,
        time: datapoint.time,
      });
    });

    sharpes.splice(0, 365);

    return [wapDatas, sharpes];
  }, [MacroData]);

  return (
    <div>
      {WAPData && <WAPChart data={WAPData} />}
      {SharpeData && <SharpeRatioChart data={SharpeData} />}
    </div>
  );
};

export default BitcoinMacrosContainer;
