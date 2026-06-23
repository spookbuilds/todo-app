const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

renderTasks();
updateStats();

function updateStats() {

  const total = tasks.length;

  const completed = tasks.filter(task => task.completed).length;

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

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
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
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
