// Import chart components (use dynamic imports for code splitting if needed)
import SharpeRatioChart from "./Charts/Bitcoin/SharpeRatioChart";
import ADXChart from "./Charts/Desktop/ADXChart";
import ATRChart from "./Charts/Desktop/ATRChart";
import BollingerBandChart from "./Charts/Desktop/BollingerBandChartDesktop";
import EMAChartDesktop from "./Charts/Desktop/EmaChartDesktop";
import FibonacciRetracementChartDesktop from "./Charts/Desktop/FibonacciRetracementChartDesktop";
import MACDChart from "./Charts/Desktop/MACDChart";
import NuplChart from "./Charts/Desktop/NuplChart";
import OBVChart from "./Charts/Desktop/OBVChart";
import RsiChart from "./Charts/Desktop/RSIChart";
import StochasticOscillatorChart from "./Charts/Desktop/StochasticOscillatorChart";
import VolumeChartDesktop from "./Charts/Desktop/VolumeChartDesktop";

// Type for chart config
export interface ChartConfig {
  key: string;
  label: string;
  component: React.ComponentType<any>;
  dataSelector: (data: any) => any; // Function to select/transform data for this chart
  showByDefault?: boolean;
  header: string;
  headerStyle?: React.CSSProperties;
}

// Centralized chart config array
export const chartConfig: ChartConfig[] = [
  {
    key: "fibonacci",
    label: "Fibonacci",
    header: "Fibonacci Retracement",
    component: FibonacciRetracementChartDesktop,
    dataSelector: (data) => data?.closes,
    showByDefault: true,
    headerStyle: { color: "#ffb347" },
  },
  {
    key: "ema",
    label: "EMA",
    header: "EMA Chart",
    component: EMAChartDesktop,
    dataSelector: (data) => data?.closes,
    showByDefault: true,
    headerStyle: { color: "#b30000" },
  },
  {
    key: "bollinger",
    label: "Bollinger Band",
    header: "Bollinger Bands",
    component: BollingerBandChart,
    dataSelector: (data) => data?.closes,
    showByDefault: true,
    headerStyle: { color: "#806cfe" },
  },
  {
    key: "macd",
    label: "MACD",
    header: "MACD",
    component: MACDChart,
    dataSelector: (data) => data?.closes,
    showByDefault: true,
    headerStyle: { color: "#00BFBF" },
  },
  {
    key: "sharpe",
    label: "Sharpe Ratio",
    header: "Sharpe Ratio",
    component: SharpeRatioChart,
    dataSelector: (data) => data?.closes,
    showByDefault: false,
    headerStyle: { color: "#00BFBF" },
  },
  {
    key: "volume",
    label: "Volume",
    header: "Volume",
    component: VolumeChartDesktop,
    dataSelector: (data) => data?.volume,
    showByDefault: false,
    headerStyle: { color: "#fff" },
  },
  {
    key: "rsi",
    label: "RSI",
    header: "RSI",
    component: RsiChart,
    dataSelector: (data) => data?.closes,
    showByDefault: false,
    headerStyle: { color: "#fff" },
  },
  {
    key: "obv",
    label: "On-balance Volume",
    header: "On-balance Volume",
    component: OBVChart,
    dataSelector: (data) => data,
    showByDefault: false,
    headerStyle: { color: "#fff" },
  },
  {
    key: "adx",
    label: "ADX",
    header: "ADX",
    component: ADXChart,
    dataSelector: (data) => data,
    showByDefault: false,
    headerStyle: { color: "#fff" },
  },
  {
    key: "nupl",
    label: "NUPL",
    header: "NUPL",
    component: NuplChart,
    dataSelector: (data) => data,
    showByDefault: false,
    headerStyle: { color: "#fff" },
  },
  {
    key: "stochastic",
    label: "Stochastic",
    header: "Stochastic Oscillator",
    component: StochasticOscillatorChart,
    dataSelector: (data) => data?.closes,
    showByDefault: false,
    headerStyle: { color: "#fff" },
  },
  {
    key: "atr",
    label: "ATR",
    header: "ATR",
    component: ATRChart,
    dataSelector: (data) => data,
    showByDefault: false,
    headerStyle: { color: "#fff" },
  },
];
