function openFeatures() {
  let allElems = document.querySelectorAll(".elem");
  let fullElemPage = document.querySelectorAll(".fullElem");
  let fullElemPageBackBtn = document.querySelectorAll(".fullElem .back");

  allElems.forEach(function (elem) {
    elem.addEventListener("click", function () {
      fullElemPage[elem.id].style.display = "block";
    });
  });

  fullElemPageBackBtn.forEach(function (back) {
    back.addEventListener("click", function () {
      fullElemPage[back.id].style.display = "none";
    });
  });
}
openFeatures();




function todoList() {
  let form = document.querySelector(".addTask form");
  let taskInput = document.querySelector(".addTask form #task-input");
  let taskDetailsInput = document.querySelector(".addTask form textarea");
  let taskCheckBox = document.querySelector(".addTask form #check");

  var currentTask = [];
  if (localStorage.getItem("currentTask")) {
    currentTask = JSON.parse(localStorage.getItem("currentTask"));
  } else {
    console.log("Task list is empty");
  }

  function renderTask() {
    localStorage.setItem("currentTask", JSON.stringify(currentTask));

    let allTask = document.querySelector(".allTask");

    let sum = "";

    currentTask.forEach(function (e, idx) {
      sum += `<div class="task">
        <h5>${e.task} <span class='${e.imp}'>imp</span> </h5>
        <p>${e.details}</p>
        <button id=${idx}>Mark as Completed</button>
        </div>`;
    });

    allTask.innerHTML = sum;

    let markCompletedBtn = document.querySelectorAll(".task button");

    markCompletedBtn.forEach(function (btn) {
      btn.addEventListener("click", function () {
        currentTask.splice(btn.id, 1);
        renderTask();
      });
    });
  }
  renderTask();

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    currentTask.push({
      task: taskInput.value,
      details: taskDetailsInput.value,
      imp: taskCheckBox.checked,
    });

    renderTask();

    taskInput.value = "";
    taskDetailsInput.value = "";
    taskCheckBox.checked = false;
  });
}
todoList();



function dailyPlanner() {
  let dayPlanner = document.querySelector(".day-planner");

  let dayPlanData = JSON.parse(localStorage.getItem("dayPlanData")) || {};

  let hours = Array.from(
    { length: 18 },
    (_, idx) => `${6 + idx}:00 - ${7 + idx}:00 `,
  );

  let wholeDaySum = "";

  hours.forEach(function (elem, idx) {
    let savedData = dayPlanData[idx] || "";

    wholeDaySum += `<div class="day-planner-time">
    <p>${elem}</p>
    <input id="${idx}" type="text" value="${savedData.replace(/"/g, "&quot;")}">
  </div>`;
  });

  dayPlanner.innerHTML = wholeDaySum;

  let dayPlannerInput = document.querySelectorAll(".day-planner input");

  dayPlannerInput.forEach(function (elem) {
    elem.addEventListener("input", function () {
      dayPlanData[elem.id] = elem.value;

      localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData));
    });
  });
}

dailyPlanner();



function motivationalQuote() {
  let motivationQuoteContent = document.querySelector(".motivation-body h1");
  let motivationAuthor = document.querySelector(".motivation-footer span");

  async function fetchQuote() {
    let resposne = await fetch("https://dummyjson.com/quotes/random");
    let data = await resposne.json();

    motivationQuoteContent.innerHTML = data.quote;
    motivationAuthor.innerHTML = " - " + data.author;
  }
  fetchQuote();
}

motivationalQuote();




function pomodoroTimer(){
  let timer = document.querySelector(".pomo-timer h1");
let startBtn = document.querySelector(".pomo-timer .start-timer");
let pauseBtn = document.querySelector(".pomo-timer .pause-timer");
let resetBtn = document.querySelector(".pomo-timer .reset-timer");
let session = document.querySelector(".pomodoro-fullpage .session");
let isWorkSession = true;

let totalSeconds = 1500;
let timerInterval = null;

function updateTimer() {
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;

  timer.innerHTML = `${String(minutes).padStart(2, "0")} : ${String(seconds).padStart(2, "0")}`;
}

function startTimer() {
  clearInterval(timerInterval);

  if (isWorkSession) {
    
    timerInterval = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds--;
        updateTimer();
      } else {
        isWorkSession = false;
        clearInterval(timerInterval);
        timer.innerHTML = "05:00";
        session.innerHTML = "Take a Break";
        session.style.backgroundColor = "var(--blue)";
        totalSeconds = 5 * 60;
      }
    }, 1000);
  } else {
    
    timerInterval = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds--;
        updateTimer();
      } else {
        isWorkSession = true;
        clearInterval(timerInterval);
        timer.innerHTML = "25:00";
        session.innerHTML = "Work Session";
        session.style.backgroundColor = "var(--green)";
        totalSeconds = 25 * 60;
      }
    }, 1000);
  }
}

function pauseTimer() {
  clearInterval(timerInterval);
}

function resetTimer() {
  clearInterval(timerInterval);
  totalSeconds = 1500;
  updateTimer();
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
}

pomodoroTimer();



