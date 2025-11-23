// Get Elements
const inputBox = document.querySelector(`.todo-input`);
const plus = document.querySelector(`.plus`);
const taskPlace = document.querySelector(`.tasks`);
const noTasksSpan = document.querySelector(`.no-tasks-case`);
const totalTasks = document.querySelector(`.total-tasks`);
const completedTasks = document.querySelector(`.completed-tasks`);

let taskCount = 0;
let taskCompleted = 0;

plus.onclick = () => {
  let myNewTask = inputBox.value;
  if (myNewTask) {
    let flag = addTaskChecker(myNewTask);
    if (!flag) {
      createTask(myNewTask);
      inputBox.value = "";
    }
    updateTotalTasks();
  }
};

function createTask(taskString) {
  taskCount++;
  let span = document.createElement("span");
  span.classList.add("task-box");
  triggerdone(span);
  span.appendChild(document.createTextNode(taskString));
  let del = document.createElement(`span`);
  del.classList.add("delete");
  del.appendChild(document.createTextNode("Delete"));
  span.appendChild(del);
  del.addEventListener(`click`, () => {
    deleteTask(span);
    updateCompletedTasks();
  });
  taskPlace.appendChild(span);
  noTasksSpan.remove();
}

// Get all Task and check for not repeating
function addTaskChecker(taskString) {
  let totalTasks = Array.from(document.querySelectorAll(`.tasks .task-box`));
  let flag = false;
  totalTasks.forEach((e) => {
    if (taskString === e.childNodes[0].textContent.trim()) {
      console.log("repeated");
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
  if(Node.classList.contains(`finished`)){
    taskCompleted--;
  }
  Node.remove();
  updateTotalTasks();
  if (taskCount === 0) taskPlace.append(noTasksSpan);
}

// triger task done or not
function triggerdone(Node) {
  Node.addEventListener("click", (e) => {
    console.log(e.target);
    if (e.target === Node) {
      Node.classList.toggle(`finished`) ? taskCompleted++ : taskCompleted--;
      updateCompletedTasks();
    }
  });
}
