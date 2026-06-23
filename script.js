const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("searchInput");
const prioritySelect = document.getElementById("prioritySelect");
const dueDateInput = document.getElementById("dueDate");

const totalTasksText = document.getElementById("totalTasks");
const completedTasksText = document.getElementById("completedTasks");
const remainingTasksText = document.getElementById("remainingTasks");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


tasks = tasks.map(task => {
  if (typeof task === "string") {
    return {
      text: task,
      completed: false,
      priority: "Medium",
      dueDate: ""
    };
  }
  return task;
});

renderTasks();

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
  dueDateInput.value = "";

  saveTasks();
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

  filteredTasks.forEach((task) => {
    const realIndex = tasks.indexOf(task);

    const li = document.createElement("li");

    li.innerHTML = `
      <div>
        <span class="${task.completed ? "completed" : ""}">
          ${task.text}
        </span>

        <span class="priority ${task.priority.toLowerCase()}">
          ${task.priority}
        </span>

        <p class="due-date">
          ${task.dueDate ? "Due: " + task.dueDate : "No due date"}
        </p>
      </div>

      <div>
        <button onclick="toggleTask(${realIndex})">✓</button>
        <button onclick="deleteTask(${realIndex})">X</button>
      </div>
    `;

    taskList.appendChild(li);
  });

  updateStats();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function updateStats() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const remaining = total - completed;

  totalTasksText.textContent = total;
  completedTasksText.textContent = completed;
  remainingTasksText.textContent = remaining;
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
