import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Box } from "@mui/material";
Chart.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart({ transactions }) {
  console.log(transactions);
  const data = {
    labels: transactions?.map((each) => each.source),
    datasets: [
      {
        label: `${transactions.length} 9 transactions`,
        data: transactions.map((each) => each.amount),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box>
      <Doughnut data={data} />;{" "}
    </Box>
  );
}
