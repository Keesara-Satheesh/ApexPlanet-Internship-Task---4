// To-Do List Logic
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

function saveTasks() {
  const tasks = Array.from(taskList.children).map(li => ({
    text: li.firstChild.textContent,
    done: li.classList.contains("completed")
  }));
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  taskList.innerHTML = "";
  tasks.forEach(task => addTask(task.text, task.done));
}

function addTask(text, done = false) {
  const li = document.createElement("li");
  li.textContent = text;
  if (done) li.classList.add("completed");
  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  const delBtn = document.createElement("button");
  delBtn.textContent = "❌";
  delBtn.style.marginLeft = "1rem";
  delBtn.onclick = (e) => {
    e.stopPropagation();
    li.remove();
    saveTasks();
  };

  li.appendChild(delBtn);
  taskList.appendChild(li);
  saveTasks();
}

addBtn.addEventListener("click", () => {
  if (taskInput.value.trim()) {
    addTask(taskInput.value.trim());
    taskInput.value = "";
  }
});

loadTasks();

// Product Listing Logic
const products = [
  { name: "Phone", category: "electronics", price: 500, rating: 4.5 },
  { name: "Laptop", category: "electronics", price: 1200, rating: 4.8 },
  { name: "Watch", category: "fashion", price: 80, rating: 4.0 },
  { name: "Sneakers", category: "fashion", price: 100, rating: 4.4 }
];

const filter = document.getElementById("filter");
const sort = document.getElementById("sort");
const container = document.getElementById("productContainer");

function renderProducts() {
  let filtered = [...products];

  if (filter.value !== "all") {
    filtered = filtered.filter(p => p.category === filter.value);
  }

  switch (sort.value) {
    case "price-low":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      filtered.sort((a, b) => b.rating - a.rating);
      break;
  }

  container.innerHTML = "";
  filtered.forEach(product => {
    const card = document.createElement("div");
    card.className = "product";
    card.innerHTML = `
      <h4>${product.name}</h4>
      <p><strong>Category:</strong> ${product.category}</p>
      <p><strong>Price:</strong> $${product.price}</p>
      <p><strong>Rating:</strong> ⭐ ${product.rating}</p>
    `;
    container.appendChild(card);
  });
}

filter.addEventListener("change", renderProducts);
sort.addEventListener("change", renderProducts);
renderProducts();
