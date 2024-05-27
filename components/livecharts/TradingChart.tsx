import React, { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import styled from "styled-components";

const ChartContainer = styled.div`
  width: 100%;
  height: 500px;
`;

const ScriptContainer = styled.div`
  margin-top: 20px;

  textarea {
    width: 100%;
    height: 100px;
  }

  button {
    margin-top: 10px;
    padding: 10px;
    background-color: #0070f3;
    color: white;
    border: none;
    cursor: pointer;

    &:hover {
      background-color: #005bb5;
    }
  }
`;

interface ChartDataPoint {
  date: string;
  price: number;
}

const TradingChart: React.FC = () => {
  const [data, setData] = useState<ChartDataPoint[]>([]);
  const [userScript, setUserScript] = useState<string>("");

  const applyUserScript = () => {
    // Logic to apply user's custom indicator script
    // For simplicity, this is just a placeholder
    console.log("User script applied:", userScript);
  };

  useEffect(() => {
    // Fetch and update chart data from API
    const fetchData = async () => {
      const data = await fetchAssetData();
      setData(data);
    };
    fetchData();
  }, []);

  const fetchAssetData = async (): Promise<ChartDataPoint[]> => {
    // Placeholder for actual API call
    return [
      { date: "2023-01-01", price: 100 },
      { date: "2023-02-01", price: 200 },
      { date: "2023-03-01", price: 150 },
      { date: "2023-04-01", price: 300 },
      { date: "2023-05-01", price: 250 },
      { date: "2023-06-01", price: 400 },
    ];
  };

  return (
    <ChartContainer>
      <LineChart width={800} height={400} data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <CartesianGrid stroke="#f5f5f5" />
        <Line type="monotone" dataKey="price" stroke="#ff7300" yAxisId={0} />
      </LineChart>
      <ScriptContainer>
        <textarea
          value={userScript}
          onChange={(e) => setUserScript(e.target.value)}
          placeholder="Enter your script here..."
        />
        <button onClick={applyUserScript}>Apply Script</button>
      </ScriptContainer>
    </ChartContainer>
  );
};

export default TradingChart;
