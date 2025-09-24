import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";
import "./Results.css";

export default function Results() {
  const [data, setData] = useState([]);

  const loadResults = async () => {
    try {
      const res = await fetch("http://localhost:5000/results");
      const votes = await res.json();

      const optionOrder = ["Option A", "Option B", "Option C"];
      const chartData = optionOrder.map((key) => {
        const entry = votes.find((v) => v.option === key);
        return { option: key, votes: entry ? entry.votes : 0 };
      });

      setData(chartData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadResults();
    const interval = setInterval(loadResults, 5000);
    return () => clearInterval(interval);
  }, []);

  const colors = ["#8884d8", "#82ca9d", "#ffc658"]; // colors for A, B, C

  return (
    <div className="results-container">
      <h2>Live Results</h2>
      <div className="chart-card">
        <BarChart width={500} height={300} data={data}>
          <XAxis dataKey="option" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip
            contentStyle={{ backgroundColor: "#1c1c1c", border: "none", color: "#fff" }}
            itemStyle={{ color: "#fff" }}
          />
          <Bar dataKey="votes">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Bar>
        </BarChart>
      </div>
    </div>
  );
}
