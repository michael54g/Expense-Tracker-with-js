const expenseForm = document.getElementById("expenseForm");
const expenseList = document.getElementById("expenseList");
const totalExpenses = document.getElementById("totalExpenses");
let expenses = [];

function addExpense(description, amount, category) {
  expenses.push({ description, amount, category });
}

function renderExpenses() {
  expenseList.innerHTML = "";
  let total = 0;
  expenses.forEach((expense, index) => {
    const expenseItem = document.createElement("div");
    expenseItem.classList.add("expense-item");
    expenseItem.innerHTML = `
      <div>${expense.description}</div>
      <div>$${expense.amount}</div>
      <div>${expense.category}</div>
      <button onclick="editExpense(${index})">Edit</button>
      <button onclick="deleteExpense(${index})">Delete</button>
    `;
    expenseList.appendChild(expenseItem);
    total += parseInt(expense.amount);
  });
  totalExpenses.textContent = `Total Expenses: $${total}`;
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  renderExpenses();
}

function editExpense(index) {
  const { description, amount, category } = expenses[index];
  const newDescription = prompt("Enter new description", description);
  const newAmount = prompt("Enter new amount", amount);
  const newCategory = prompt("Enter new category", category);
  if (newDescription && newAmount && newCategory) {
    expenses[index] = {
      description: newDescription,
      amount: newAmount,
      category: newCategory,
    };
    renderExpenses();
  }
}

expenseForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const description = document.getElementById("expenseDescription").value;
  const amount = document.getElementById("expenseAmount").value;
  const category = document.getElementById("expenseCategory").value;
  addExpense(description, amount, category);
  renderExpenses();
  expenseForm.reset();
});

window.onload = renderExpenses;
