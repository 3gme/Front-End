// Get Elements
const inputBox = document.querySelector(`.todo-input`);
const plus = document.querySelector(`.plus`);
const taskPlace = document.querySelector(`.tasks`);
const noTasksSpan = document.querySelector(`.no-tasks-case`);
const totalTasks = document.querySelector(`.total-tasks`);
const completedTasks = document.querySelector(`.completed-tasks`);

let taskCount = 0;
let taskCompleted = 0;

window.onload = LoadTasks;

plus.onclick = () => {
  let myNewTask = inputBox.value.trim();
  if (myNewTask) {
    if (!addTaskChecker(myNewTask)) {
      createTask(myNewTask);
      SaveTasks();
      inputBox.value = "";
    }
    updateTotalTasks();
  } else shakeInput();
};

function createTask(taskString, isFinished = false) {
  taskCount++;
  let span = document.createElement("span");
  span.classList.add("task-box");
  if (isFinished) {
    span.classList.add(`finished`);
    taskCompleted++;
  }
  span.appendChild(document.createTextNode(taskString));

  let del = document.createElement(`span`);
  del.classList.add("delete");
  del.appendChild(document.createTextNode("Delete"));
  span.appendChild(del);

  taskPlace.appendChild(span);
  noTasksSpan.remove();
  updateTotalTasks();
  updateCompletedTasks();
}

function addTaskChecker(taskString) {
  let totalTasks = Array.from(document.querySelectorAll(`.tasks .task-box`));
  let flag = false;
  totalTasks.forEach((e) => {
    if (taskString === e.childNodes[0].textContent.trim()) {
      flag = true;
      shakeInput();
      return;
    }
  });
  return flag;
}
function shakeInput() {
  inputBox.classList.add("shake");
  setTimeout(() => inputBox.classList.remove("shake"), 300);
}

// Update Total Tasks And Completed Tasks
function updateTotalTasks() {
  totalTasks.innerHTML = taskCount;
}
function updateCompletedTasks() {
  completedTasks.innerHTML = taskCompleted;
}

// delete task
function deleteTask(Node) {
  taskCount--;
  if (Node.classList.contains(`finished`)) {
    taskCompleted--;
  }
  Node.remove();
  updateTotalTasks();
  updateCompletedTasks();
  if (taskCount === 0) taskPlace.append(noTasksSpan);
}

function toggleDone(Node) {
  Node.classList.toggle(`finished`) ? taskCompleted++ : taskCompleted--;
  updateCompletedTasks();
}

taskPlace.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    deleteTask(e.target.parentElement);
  } else if (e.target.classList.contains("task-box")) {
    toggleDone(e.target);
  }
  SaveTasks();
});

// local storage Handling
// 1- SaveTasks

function SaveTasks() {
  const myTasksHTML = Array.from(document.querySelectorAll(`.task-box`));

  const myTasksToLocalStorage = myTasksHTML.map((e) => ({
    task: e.childNodes[0].textContent.trim(),
    completed: e.classList.contains(`finished`),
  }));
  localStorage.setItem("tasks", JSON.stringify(myTasksToLocalStorage));
}

// 2- loadTasks

function LoadTasks() {
  let myTasks = JSON.parse(localStorage.getItem(`tasks`));
  myTasks.forEach(task => {
    console.log(task.task);
    createTask(task.task, task.completed);
  });
}
