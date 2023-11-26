import React from "react";
import ReactApexChart from "react-apexcharts";

const ChartComponent = ({ data }) => {
  if (data.length === 0) {
    return null;
  }

  const candidateNames = data.map((candidate) => candidate.name);
  const candidateVotes = data.map((candidate) => candidate.voteCount);

  const barChartOptions = {
    xaxis: {
      categories: candidateNames,
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    title: {
      text: "Bar Chart - Candidate Votes",
    },
  };

  const barChartSeries = [
    {
      name: "Votes",
      data: candidateVotes,
    },
  ];

  const pieChartOptions = {
    labels: candidateNames,
    title: {
      text: "Pie Chart - Candidate Votes",
    },
  };

  const pieChartSeries = candidateVotes;

  return (
    <div className="chart-container">
      <div className="chart">
        <ReactApexChart
          options={barChartOptions}
          series={barChartSeries}
          type="bar"
          height={350}
        />
      </div>
      <div className="chart">
        <ReactApexChart
          options={pieChartOptions}
          series={pieChartSeries}
          type="pie"
          height={350}
        />
      </div>
    </div>
  );
};

export default ChartComponent;
