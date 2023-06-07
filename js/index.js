// Load the counter from local storage, if available
let button1Count = parseInt(localStorage.getItem('button1Count')) || 0;
let button2Count = parseInt(localStorage.getItem('button2Count')) || 0;

// Get references to the buttons
const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
const button3 = document.getElementById('button3');

// Add event listeners to track button clicks
button1.addEventListener('click', function() {
  button1Count++;
  saveCountersToLocalStorage();
});

button2.addEventListener('click', function() {
  button2Count++;
  saveCountersToLocalStorage();
});

button3.addEventListener('click', function() {
  clearLocalStorage();
  button1Count = 0;
  button2Count = 0;
  saveCountersToLocalStorage();
});

// Function to save the counters to local storage
function saveCountersToLocalStorage() {
  localStorage.setItem('button1Count', button1Count);
  localStorage.setItem('button2Count', button2Count);
}

// Function to clear the local storage
function clearLocalStorage() {
  localStorage.removeItem('button1Count');
  localStorage.removeItem('button2Count');
}
