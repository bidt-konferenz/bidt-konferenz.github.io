/*
// Initialize an empty array to store the data
let surveyData = [];

// Function to handle button clicks
function handleButtonClick(answer) {
  // Get the h1 text associated with the button
  const h1Text = document.querySelector('h1').innerText;
  
  // Add the data to the surveyData array
  surveyData.push({
    h1Text: h1Text,
    answer: answer
  });
  
  // Update the chart
  updateChart();
}

// Add event listeners to the buttons
const yesButton = document.querySelector('.yes-button');
yesButton.addEventListener('click', function() {
  handleButtonClick('yes');
});

const noButton = document.querySelector('.no-button');
noButton.addEventListener('click', function() {
  handleButtonClick('no');
});

// Function to update the chart
function updateChart() {
  // Get the unique h1Text values
  const uniqueH1Texts = [...new Set(surveyData.map(data => data.h1Text))];
  
  // Count the number of yes and no answers for each h1Text
  const counts = uniqueH1Texts.map(h1Text => ({
    h1Text: h1Text,
    yesCount: surveyData.filter(data => data.h1Text === h1Text && data.answer === 'yes').length,
    noCount: surveyData.filter(data => data.h1Text === h1Text && data.answer === 'no').length
  }));
  
  // Prepare the chart data
  const chartData = {
    labels: uniqueH1Texts,
    datasets: [
      {
        label: 'Yes',
        data: counts.map(count => count.yesCount),
        backgroundColor: 'green'
      },
      {
        label: 'No',
        data: counts.map(count => count.noCount),
        backgroundColor: 'red'
      }
    ]
  };
  
  // Configure and render the chart
  const ctx = document.getElementById('chart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: chartData,
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
*/