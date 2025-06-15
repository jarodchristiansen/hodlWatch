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
  description?: string;
  icon?: string; // path to icon or SVG
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
    description: "Shows key Fibonacci retracement levels for price action.",
    icon: "/landing/fibonacci-icon.svg",
  },
  {
    key: "ema",
    label: "EMA",
    header: "EMA Chart",
    component: EMAChartDesktop,
    dataSelector: (data) => data?.closes,
    showByDefault: true,
    headerStyle: { color: "#b30000" },
    description:
      "Exponential moving averages (30/50/100/200) for trend analysis.",
    icon: "/landing/ema-icon.svg",
  },
  {
    key: "bollinger",
    label: "Bollinger Band",
    header: "Bollinger Bands",
    component: BollingerBandChart,
    dataSelector: (data) => data?.closes,
    showByDefault: true,
    headerStyle: { color: "#806cfe" },
    description: "Bollinger Bands for volatility and mean reversion signals.",
    icon: "/landing/bollinger-icon.svg",
  },
  {
    key: "macd",
    label: "MACD",
    header: "MACD",
    component: MACDChart,
    dataSelector: (data) => data?.closes,
    showByDefault: true,
    headerStyle: { color: "#00BFBF" },
    description: "Moving Average Convergence Divergence for momentum.",
    icon: "/landing/macd-icon.svg",
  },
  {
    key: "sharpe",
    label: "Sharpe Ratio",
    header: "Sharpe Ratio",
    component: SharpeRatioChart,
    dataSelector: (data) => data?.closes,
    showByDefault: false,
    headerStyle: { color: "#00BFBF" },
    description: "Risk-adjusted return (Sharpe Ratio) over time.",
    icon: "/landing/sharpe-icon.svg",
  },
  {
    key: "volume",
    label: "Volume",
    header: "Volume",
    component: VolumeChartDesktop,
    dataSelector: (data) => data?.volume,
    showByDefault: false,
    headerStyle: { color: "#fff" },
    description: "Trading volume for liquidity and activity.",
    icon: "/landing/volume-icon.svg",
  },
  {
    key: "rsi",
    label: "RSI",
    header: "RSI",
    component: RsiChart,
    dataSelector: (data) => data?.closes,
    showByDefault: false,
    headerStyle: { color: "#fff" },
    description: "Relative Strength Index for overbought/oversold signals.",
    icon: "/landing/rsi-icon.svg",
  },
  {
    key: "obv",
    label: "On-balance Volume",
    header: "On-balance Volume",
    component: OBVChart,
    dataSelector: (data) => data,
    showByDefault: false,
    headerStyle: { color: "#fff" },
    description: "On-balance volume for volume/price confirmation.",
    icon: "/landing/obv-icon.svg",
  },
  {
    key: "adx",
    label: "ADX",
    header: "ADX",
    component: ADXChart,
    dataSelector: (data) => data,
    showByDefault: false,
    headerStyle: { color: "#fff" },
    description: "Average Directional Index for trend strength.",
    icon: "/landing/adx-icon.svg",
  },
  {
    key: "nupl",
    label: "NUPL",
    header: "NUPL",
    component: NuplChart,
    dataSelector: (data) => data,
    showByDefault: false,
    headerStyle: { color: "#fff" },
    description: "Net Unrealized Profit/Loss for market sentiment.",
    icon: "/landing/nupl-icon.svg",
  },
  {
    key: "stochastic",
    label: "Stochastic",
    header: "Stochastic Oscillator",
    component: StochasticOscillatorChart,
    dataSelector: (data) => data?.closes,
    showByDefault: false,
    headerStyle: { color: "#fff" },
    description: "Stochastic Oscillator for momentum and reversal.",
    icon: "/landing/stochastic-icon.svg",
  },
  {
    key: "atr",
    label: "ATR",
    header: "ATR",
    component: ATRChart,
    dataSelector: (data) => data,
    showByDefault: false,
    headerStyle: { color: "#fff" },
    description: "Average True Range for volatility measurement.",
    icon: "/landing/atr-icon.svg",
  },
];
