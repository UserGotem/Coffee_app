let selectedDate = null;
let morningCount = 0;
let afternoonCount = 0;
let morningStatus = "red";
let afternoonStatus = "red";

function updateSelectedDate(date) {
  selectedDate = new Date(date);
  localStorage.setItem('selectedDate', date);
}
function loadStoredDate() {
  const storedDate = localStorage.getItem('selectedDate');
  if (storedDate) {
    selectedDate = new Date(storedDate);
    document.getElementById('date').value = storedDate;
  } else {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(0, '0');
    const day = String(currentDate.getDate()).padStart(0, '0');
    const defaultDate = `${year}-${month}-${day}`;
    document.getElementById('date').value = defaultDate;
    updateSelectedDate(defaultDate);
  }
}

window.onload = loadStoredDate;

function submitCoffee() {
  const morningCheckbox = document.getElementById("morningCheckbox");
  const afternoonCheckbox = document.getElementById("afternoonCheckbox");

  morningCount += morningCheckbox.checked ? 1 : 0;
  afternoonCount += afternoonCheckbox.checked ? 1 : 0;

  localStorage.setItem('morningCount', morningCount);
  localStorage.setItem('afternoonCount', afternoonCount);
  alert("Kahvisi on tilattu!");
}

function goToCoffeeMaker() {
  updateSelectedDate(document.getElementById('date').value);
  window.location.href = "coffee_maker.html";
}

function brewMorningCoffee() {
  if (morningCount > 0) {
    morningCount--;
    updateCounts();
  } else {
    alert("Aamukahvin määrä on jo keitetty.");
  }
}

function brewAfternoonCoffee() {
  if (afternoonCount > 0) {
    afternoonCount--;
    updateCounts();
  } else {
    alert("Iltapäiväkahvin määrä on jo keitetty.");
  }
}
function updateCounts() {
  const morningCountElement = document.getElementById("morningCount");
  morningCountElement.innerText = morningCount;

  const afternoonCountElement = document.getElementById("afternoonCount");
  afternoonCountElement.innerText = afternoonCount;

  const morningStatus = document.getElementById("morningStatus");
  const afternoonStatus = document.getElementById("afternoonStatus");
  morningStatus.className = morningCount <= 0 ? "green" : "red";
  afternoonStatus.className = afternoonCount <= 0 ? "green" : "red";

  localStorage.setItem('morningCount', morningCount);
  localStorage.setItem('afternoonCount', afternoonCount);
}

function updateStatus() {
  morningStatus = morningCount <= 0 ? "green" : "red";
  afternoonStatus = afternoonCount <= 0 ? "green" : "red";
  updateStatusIndicators();
}
function updateStatusIndicators() {
  const indexMorningStatus = document.getElementById("indexMorningStatus");
  const indexAfternoonStatus = document.getElementById("indexAfternoonStatus");
  indexMorningStatus.className = morningStatus;
  indexAfternoonStatus.className = afternoonStatus;
  const makerMorningStatus = document.getElementById("makerMorningStatus");
  const makerAfternoonStatus = document.getElementById("makerAfternoonStatus");
  makerMorningStatus.className = morningStatus;
  makerAfternoonStatus.className = afternoonStatus;
}
function initialize() {
  const storedMorningCount = localStorage.getItem('morningCount');
  const storedAfternoonCount = localStorage.getItem('afternoonCount');

  morningCount = storedMorningCount ? parseInt(storedMorningCount) : 0;
  afternoonCount = storedAfternoonCount ? parseInt(storedAfternoonCount) : 0;

  updateCounts();
  updateStatusIndicators();
}

initialize();