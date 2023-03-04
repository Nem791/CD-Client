import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

// ChartJS.defaults.borderColor = "transparent";
ChartJS.defaults.color = "#c2c2c2";

const BarChart = () => {
  //   const [userData, setUserData] = useState({
  //     labels: UserData?.map((data) => data.year),
  //     datasets: [
  //       {
  //         label: "User Gained",
  //         data: UserData?.map((data) => data.userGain),
  //       },
  //     ],
  //   });
  return (
    <div>
      <Bar
        data={{
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          datasets: [
            {
              label: "Average Score",
              data: [12, 19, 3, 5, 2, 3],
              borderRadius: 3,
              backgroundColor: ["#81aa96"],
              barThickness: 40,
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },

          plugins: {
            legend: {
              labels: {
                // This more specific font property overrides the global property
                font: {
                  size: 14,
                },
              },
              align: "end",
            },
          },
        }}
      />
    </div>
  );
};

export default BarChart;
