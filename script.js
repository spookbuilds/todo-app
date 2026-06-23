const dueDateInput = document.getElementById("dueDate");
const prioritySelect = document.getElementById("prioritySelect");
const searchInput = document.getElementById("searchInput");
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const totalTasksText = document.getElementById("totalTasks");
const completedTasksText = document.getElementById("completedTasks");
const remainingTasksText = document.getElementById("remainingTasks");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

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
  completed: false,
  priority: prioritySelect.value,
  dueDate: dueDateInput.value
});
  
  taskInput.value = "";

  saveTasks();
  taskInput.value = "";
  searchInput.value = "";
  renderTasks();
});

searchInput.addEventListener("input", function () {
  renderTasks();
});

function renderTasks() {

  const query = searchInput.value.toLowerCase();

  const filteredTasks = tasks.filter(task =>
    task.text.toLowerCase().includes(query)
  );

  taskList.innerHTML = "";

  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
  <span class="${task.completed ? "completed" : ""}">
    ${task.text}
  </span>

  <span class="priority ${task.priority.toLowerCase()}">
    ${task.priority}
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
  const query = searchInput.value.toLowerCase();

  const filteredTasks = tasks.filter(task =>
    task.text.toLowerCase().includes(query)
  );

  const taskToDelete = filteredTasks[index];

  const realIndex = tasks.indexOf(taskToDelete);

  tasks.splice(realIndex, 1);

  saveTasks();
  renderTasks();
}

function toggleTask(index) {
  const query = searchInput.value.toLowerCase();

  const filteredTasks = tasks.filter(task =>
    task.text.toLowerCase().includes(query)
  );

  const taskToToggle = filteredTasks[index];

  const realIndex = tasks.indexOf(taskToToggle);

  tasks[realIndex].completed = !tasks[realIndex].completed;

  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
