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
  const [WAPData, SharpeData, VolumeData] = useMemo(() => {
    if (!MacroData) return [];

    let wapDatas = [];
    let volumes = [];
    let sharpes = [];

    MacroData.map((datapoint) => {
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

    let removefirst365 = sharpes.splice(0, 365);

    return [wapDatas, sharpes, "b"];
  }, [MacroData]);

  return (
    <div>
      {WAPData && <WAPChart data={WAPData} />}
      {SharpeData && <SharpeRatioChart data={SharpeData} />}
    </div>
  );
};

export default BitcoinMacrosContainer;
