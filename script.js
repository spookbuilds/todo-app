const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = [];

addBtn.addEventListener("click", function () {
  const taskText = taskInput.value;

  if (taskText === "") return;

  tasks.push(taskText);
  taskInput.value = "";

  renderTasks();
});

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${task}
      <button onclick="deleteTask(${index})">X</button>
    `;

    taskList.appendChild(li);
  });
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}
