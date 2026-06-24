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

  return {
    text: task.text || "",
    completed: task.completed || false,
    priority: task.priority || "Medium",
    dueDate: task.dueDate || ""
  };
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

  sortTasks();
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

    const today = new Date().toISOString().split("T")[0];

if (
  task.dueDate &&
  task.dueDate < today &&
  !task.completed
) {
  li.classList.add("overdue");
}

    const li = document.createElement("li");

    li.innerHTML = `
      <div>
        <span class="${task.completed ? "completed" : ""}">
          ${task.text}
        </span>

        <span class="priority ${(task.priority || "Medium").toLowerCase()}">
          ${task.priority || "Medium"}
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
  sortTasks();
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  sortTasks();
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

function sortTasks() {

  const priorityOrder = {
    High: 1,
    Medium: 2,
    Low: 3
  };

  tasks.sort((a, b) => {

    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }

    if (a.dueDate && b.dueDate) {
  return new Date(a.dueDate) - new Date(b.dueDate);
}

if (a.dueDate) return -1;
if (b.dueDate) return 1;

return 0;

  });

}
