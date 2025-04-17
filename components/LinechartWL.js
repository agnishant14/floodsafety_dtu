import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Scatter,
  ZoomableContainer,
} from "recharts";
function Linechart({ data }) {
  const plotData = [];
  for (let index = 1; index <= 7; index++) {
    plotData.push({
      date: data[`day-${index}-forecast`]
        ? data[`day-${index}-forecast`]["date"]
        : null,
      max_WL: data[`day-${index}-forecast`]
        ? data[`day-${index}-forecast`]["max-WL"]
        : null,
    });
  }
  const maxWL = plotData.reduce(
    (max, current) => (current.max_WL > max ? current.max_WL : max),
    -Infinity
  );
  const minWL = plotData.reduce(
    (min, current) => (current.max_WL < min ? current.max_WL : min),
    Infinity
  );
  console.log({ plotData });
  return (
    <div className="w-full h-full">
      <LineChart
        width={700}
        height={800}
        data={plotData}
        margin={{ top: 5, right: 20, bottom: -15, left: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis
          tickCount={10}
          tickFormatter={(value) => value.toFixed(2)}
          domain={[minWL, "auto"]}
        />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="max_WL"
          stroke="#8884d8"
          strokeWidth={2}
        />
        <Scatter
          dataKey="max_WL"
          name="Data Point"
          fill="#8884d8"
          label={{ value: "Value", position: "top" }}
        />
        {/* <ZoomableContainer zoomIn={props.zoomIn} zoomOut={props.zoomOut} /> */}
      </LineChart>
    </div>
  );
}

export default Linechart;
