import { useMemo } from "react";
import WAPChart from "../../Finance/Charts/Bitcoin/WAPCharts";
import SharpeRatioChart from "../../Finance/Charts/Bitcoin/SharpeRatioChart";

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

const BitcoinMacrosContainer = ({ MacroData }: BitcoinMacrosProps) => {
  console.log({ MacroData });

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

  console.log({ WAPData });

  return (
    <div>
      {WAPData && <WAPChart data={WAPData} />}
      {SharpeData && <SharpeRatioChart data={SharpeData} />}
    </div>
  );
};

export default BitcoinMacrosContainer;
