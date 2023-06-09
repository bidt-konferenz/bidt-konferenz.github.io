// survey.js

// Get reference to the chart canvas
const chartCanvas = document.getElementById('chart').getContext('2d');

// Create a Chart.js instance
const chart = new Chart(chartCanvas, {
  type: 'bar',
  data: {
    labels: ["These 1", "These 2", "These 3", "These 4"],
    datasets: [{
      label: 'Ja',
      data: [0, 0, 0, 0],
      backgroundColor: 'rgba(1, 71, 140, 0.6)'
    }, {
      label: 'Nein',
      data: [0, 0, 0, 0],
      backgroundColor: 'rgba(85, 175, 245, 0.6)'
    }]
  },
  options: {
    maintainAspectRatio: true,
    responsive: true,
    scales: {
      x: {
        stacked: true, // Enable stacked bar
      },
      y: {
        stacked: true, // Enable stacked bar
        beginAtZero: false,
        ticks: {
          callback: function(value, index, values) {
            return Math.abs(value);
          }
        }
      }
    },
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  }
});


// Function to update the chart with the latest data
function updateChart() {
  // Retrieve the button counts from local storage
  const button1Count = parseInt(localStorage.getItem('button1Count')) || 0;
  const button2Count = parseInt(localStorage.getItem('button2Count')) || 0;

  // Update the chart data
  chart.data.datasets[0].data = [button1Count];
  chart.data.datasets[1].data = [-1 * button2Count]; // Multiply by -1 to make it negative
  // chart.data.datasets[1].data = [button2Count];

  chart.update();
}

// Call the updateChart function to initially update the chart
updateChart();

// Function to handle the received message from index.html
function handleMessage(event) {
  if (event.data && event.data.type === 'updateChart') {
    const { button1Count, button2Count } = event.data.data;

    // Update the chart data
    chart.data.datasets[0].data = [button1Count];
    chart.data.datasets[1].data = [button2Count];
    chart.update();
  }
}

// Add event listener to receive messages from index.html
window.addEventListener('message', handleMessage);

// Function to refresh the page
function refreshPage() {
  location.reload();
}

// Set timeout to refresh the page every 5 seconds (5000 milliseconds)
setTimeout(refreshPage, 5000);
