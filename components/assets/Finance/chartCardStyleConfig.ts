// Centralized chart card style config for FinancialChartCGrid

export const defaultChartCardStyle = {
  background: "linear-gradient(135deg, #181c2a 0%, #23263a 100%)",
  border: "1.5px solid #282c40",
  borderRadius: "14px",
  boxShadow: "0 4px 24px 0 rgba(20, 20, 40, 0.10)",
  padding: "2rem 1.5rem 1.5rem 1.5rem",
  transition: "box-shadow 0.2s, transform 0.2s",
  color: "#fff",
};

// Optional: per-chart overrides (by chart key)
export const chartCardStyleOverrides: Record<
  string,
  Partial<typeof defaultChartCardStyle>
> = {
  // Example:
  // macd: { background: "#1a1a2e" },
};
