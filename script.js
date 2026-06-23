const searchInput = document.getElementById("searchInput");
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const totalTasksText = document.getElementById("totalTasks");
const completedTasksText = document.getElementById("completedTasks");
const remainingTasksText = document.getElementById("remainingTasks");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let filteredTasks = tasks;

tasks = tasks.map(task => {
  if (typeof task === "string") {
    return { text: task, completed: false };
  }
  return task;
});

renderTasks();


function updateStats() {

  const total = tasks.length;

  const completed = tasks.filter(task => task.completed === true).length;

  const remaining = total - completed;

  totalTasksText.textContent = total;
  completedTasksText.textContent = completed;
  remainingTasksText.textContent = remaining;

}

addBtn.addEventListener("click", function () {
  const taskText = taskInput.value;

  if (taskText === "") return;

  tasks.push({
  text: taskText,
  completed: false
});
  taskInput.value = "";

  saveTasks();
  renderTasks();
});

searchInput.addEventListener("input", function () {
  const query = searchInput.value.toLowerCase();

  filteredTasks = tasks.filter(task =>
    task.text.toLowerCase().includes(query)
  );

  renderTasks();
});

function renderTasks() {
  taskList.innerHTML = "";

  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span class="${task.completed ? "completed" : ""}">
        ${task.text}
      </span>

      <div>
        <button onclick="toggleTask(${index})">✓</button>
        <button onclick="deleteTask(${index})">X</button>
      </div>
    `;

    taskList.appendChild(li);
  });

  updateStats();
}

function deleteTask(index) {
  const actualTask = filteredTasks[index];

  tasks = tasks.filter(task => task !== actualTask);

  saveTasks();

  filteredTasks = tasks;

  renderTasks();
}

function toggleTask(index) {
  const actualTask = filteredTasks[index];

  actualTask.completed = !actualTask.completed;

  saveTasks();

  filteredTasks = tasks;

  renderTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
