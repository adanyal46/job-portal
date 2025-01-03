import React from "react";
import { Column } from "@ant-design/plots";

const VerticalBarChart = ({ earnings = {} }) => {
  // Safely access monthlyEarnings
  const monthlyEarnings = earnings?.monthlyEarnings || {};

  // Transform the earnings data into a suitable format for the chart
  const data = Object.keys(monthlyEarnings).map((key) => ({
    month: key.split("-")[1], // Extract month from "2025-January"
    earnings: monthlyEarnings[key],
  }));

  const config = {
    data,
    xField: "month", // Categories on X-axis
    yField: "earnings", // Numeric values on Y-axis
    style: {
      inset: 30,
    },
    color: ({ month }) => {
      return ["Jan", "Mar", "May"].includes(month) ? "#1890ff" : "#2c9989";
    },
    label: {
      position: "top", // Position label above bars
      offset: 10, // Adjust spacing above bars
      style: {
        fill: "#FFFFFF", // Label color set to white
        fontSize: 16, // Font size
      },
      formatter: (datum) => `$ ${datum}`, // Show earnings value with "K"
    },
    xAxis: {
      label: {
        style: {
          fill: "#333333", // X-axis label color
          fontSize: 14,
        },
      },
    },
    yAxis: {
      label: {
        style: {
          fill: "#333333", // Y-axis label color
          fontSize: 14,
        },
      },
    },
    tooltip: true,
    height: 350, // Chart height
  };

  return <Column {...config} />;
};

export default VerticalBarChart;
