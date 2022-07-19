const myTaskManager = new TaskManager();

const todo = document.getElementById("todoTitle");
const doing = document.getElementById("doingTitle");
const done = document.getElementById("doneTitle");

todo.style.backgroundColor = "rgb(244, 208, 255)";
doing.style.backgroundColor = "rgb(193, 112, 189)";
done.style.backgroundColor = "rgb(126, 55, 141)";

const changeTaskListBackground = (target) => {
  const changeColor = document.getElementById("taskListArea");
  changeColor.style.backgroundColor = target.style.backgroundColor;
};

const newTaskForm = document.querySelector("#modal-form");

const newTaskNameInput = document.querySelector("#nameInput");
const newTaskTitle = document.querySelector("#titleInput");
const newTaskDescription = document.querySelector("#description");
const newTaskStartTime = document.querySelector("#startTimeInput")
const newTaskStartDate = document.querySelector("#startDateInput");
const newTaskDueTime = document.querySelector("#dueTimeInput");
const newTaskDueDate = document.querySelector("#dueDateInput");
const radioButtons = document.querySelectorAll('input[name="priority"]');
const newTaskAssignedTo = document.querySelector("#assignTo");

function addNewTask() {
  const name = newTaskNameInput.value;
  const title = newTaskTitle.value;
  const description = newTaskDescription.value;
  const startTime = newTaskStartTime.value;
  const startDate = newTaskStartDate.value;
  const dueTime = newTaskDueTime.value;
  const dueDate = newTaskDueDate.value;
  let priority = '';
  const assignedTo = newTaskAssignedTo.value;

  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
      priority = radioButton.value;
      break;
    }
  }

  if (validFormFieldInput(name) &&
    validFormFieldInput(title) &&
    validFormFieldInput(startTime) &&
    validFormFieldInput(startDate) &&
    validFormFieldInput(dueTime) &&
    validFormFieldInput(dueDate) &&
    validFormFieldInput(description) &&
    validFormFieldInput(priority) &&
    validFormFieldInput(assignedTo)) {
    myTaskManager.addTask(name, title, startTime, startDate, dueTime, dueDate, description, priority, assignedTo);
    myTaskManager.render("TODO");
    clearFormInput();
    alert("Task Added !!");
    myTaskManager.getTaskArr();
  }
  else {
    alert("Please Enter All Data !!");
  }
}

function clearFormInput() {
  document.getElementById("modal-form").reset();
}

function validFormFieldInput(data) {
  return data !== null && data !== "";
}


function deleteTask(id) {
  myTaskManager.deleteTask(id);
  myTaskManager.render();
  myTaskManager.getTaskArr();
}