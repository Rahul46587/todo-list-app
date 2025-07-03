// Selectors
const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

// Load tasks from localStorage on page load
window.onload = () => {
  let tasks = getTasksFromStorage();
  tasks.forEach((task) => createTaskElement(task.text, task.completed));
};

// Add Task
addBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    createTaskElement(taskText);
    saveTaskToStorage(taskText);
    taskInput.value = "";
  }
});

// Create Task Element
function createTaskElement(text, completed = false) {
  const li = document.createElement("li");
  li.className = "task";
  if (completed) li.classList.add("completed");

  li.innerHTML = `
    <span>${text}</span>
    <div>
      <button class="complete-btn">✔️</button>
      <button class="delete-btn">❌</button>
    </div>
  `;

  // Complete task
  li.querySelector(".complete-btn").addEventListener("click", () => {
    li.classList.toggle("completed");
    updateStorage();
  });

  // Delete task
  li.querySelector(".delete-btn").addEventListener("click", () => {
    li.remove();
    updateStorage();
  });

  taskList.appendChild(li);
}

// Get tasks from localStorage
function getTasksFromStorage() {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
}

// Save new task to localStorage
function saveTaskToStorage(text) {
  const tasks = getTasksFromStorage();
  tasks.push({ text: text, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Update localStorage with current tasks
function updateStorage() {
  const tasks = [];
  document.querySelectorAll(".task").forEach((li) => {
    const text = li.querySelector("span").innerText;
    const completed = li.classList.contains("completed");
    tasks.push({ text, completed });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
