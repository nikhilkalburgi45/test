let bloodPressureChart;

export function drawBloodPressureChart(history) {
  const labels = history.map((entry) => `${shortMonth(entry.month)}, ${entry.year}`);
  const systolicValues = history.map((entry) => entry.blood_pressure?.systolic?.value ?? null);
  const diastolicValues = history.map((entry) => entry.blood_pressure?.diastolic?.value ?? null);

  if (bloodPressureChart) {
    bloodPressureChart.destroy();
  }

  const context = document.getElementById("bloodPressureChart");

  bloodPressureChart = new Chart(context, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Systolic",
          data: systolicValues,
          borderColor: "#e66fd2",
          backgroundColor: "#e66fd2",
          borderWidth: 2,
          pointRadius: 7,
          pointHoverRadius: 8,
          pointBackgroundColor: "#e66fd2",
          pointBorderWidth: 0,
          tension: 0.42
        },
        {
          label: "Diastolic",
          data: diastolicValues,
          borderColor: "#8c6fe6",
          backgroundColor: "#8c6fe6",
          borderWidth: 2,
          pointRadius: 7,
          pointHoverRadius: 8,
          pointBackgroundColor: "#8c6fe6",
          pointBorderWidth: 0,
          tension: 0.42
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: "#072635",
          padding: 12,
          displayColors: true
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: "#4b6473",
            font: {
              family: "Manrope",
              size: 12
            }
          },
          border: {
            display: false
          }
        },
        y: {
          min: 60,
          max: 180,
          ticks: {
            stepSize: 20,
            color: "#4b6473",
            font: {
              family: "Manrope",
              size: 12
            }
          },
          grid: {
            color: "#cbc8d4"
          },
          border: {
            display: false
          }
        }
      }
    }
  });
}

function shortMonth(monthName) {
  return monthName.slice(0, 3);
}
