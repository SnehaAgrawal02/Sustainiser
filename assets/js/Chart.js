const progressCtx = document.getElementById("progressChart").getContext("2d");
const sustainableDevelopmentCtx = document
  .getElementById("sustainableDevelopmentChart")
  .getContext("2d");

const progressChart = new Chart(progressCtx, {
  type: "line",
  data: {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Progress",
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

const sustainableDevelopmentChart = new Chart(sustainableDevelopmentCtx, {
  type: "pie",
  data: {
    labels: [
      "Renewable Energy",
      "Recycling",
      "Water Conservation",
      "Air Quality Improvement",
    ],
    datasets: [
      {
        label: "Sustainable Development",
        data: [300, 50, 100, 75],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
        ],
        hoverOffset: 4,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Sustainable Development Progress",
      },
    },
  },
});
