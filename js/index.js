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
const newTaskStartTime = document.querySelector("#startTimeInput");
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
  let priority = "";
  const assignedTo = newTaskAssignedTo.value;

  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
      priority = radioButton.value;
      break;
    }
  }

  if (
    validFormFieldInput(name) &&
    validFormFieldInput(title) &&
    validFormFieldInput(startTime) &&
    validFormFieldInput(startDate) &&
    validFormFieldInput(dueTime) &&
    validFormFieldInput(dueDate) &&
    validFormFieldInput(description) &&
    validFormFieldInput(priority) &&
    validFormFieldInput(assignedTo)
  ) {
    $("#createTaskModal").modal("hide");
    myTaskManager.addTask(
      name,
      title,
      startTime,
      startDate,
      dueTime,
      dueDate,
      description,
      priority,
      assignedTo
    );
    myTaskManager.render();
    clearFormInput();
  } else {
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
}

function getLocalData() {
  myTaskManager.getLocalData();
  myTaskManager.render();
}

const taskName = document.querySelector("#nameValue");
const taskTitle = document.querySelector("#titleValue");
const taskDescription = document.querySelector("#descriptionValue");
const taskStartTime = document.querySelector("#startTimeValue");
const taskStartDate = document.querySelector("#startDateValue");
const taskDueTime = document.querySelector("#dueTimeValue");
const taskDueDate = document.querySelector("#dueDateValue");
const radioButtonsValue = document.querySelectorAll(
  'input[name="priorityValue"]'
);
const taskAssignedTo = document.querySelector("#assignToValue");

function getTaskValue(id) {
  const task = myTaskManager.getTaskById(id);
  taskName.value = task.name;
  taskTitle.value = task.title;
  taskDescription.value = task.description;
  taskStartTime.value = task.startTime;
  taskStartDate.value = task.startDate;
  taskDueTime.value = task.dueTime;
  taskDueDate.value = task.dueDate;
  for (const radioButton of radioButtonsValue) {
    if (radioButton.value === task.priority) {
      radioButton.checked = true;
      break;
    }
  }
  taskAssignedTo.value = task.assignedTo;
  window.sessionStorage.setItem("id", id);
}

function changeTaskValue() {
  let priority;
  let id = window.sessionStorage.getItem("id");
  for (const radioButton of radioButtonsValue) {
    if (radioButton.checked) {
      priority = radioButton.value;
      break;
    }
  }

  myTaskManager.changeTask(
    id,
    taskName.value,
    taskTitle.value,
    taskStartTime.value,
    taskStartDate.value,
    taskDueTime.value,
    taskDueDate.value,
    taskDescription.value,
    taskAssignedTo.value,
    priority
  );

  if (validFormFieldInput(taskName.value) &&
    validFormFieldInput(taskTitle.value) &&
    validFormFieldInput(taskStartTime.value) &&
    validFormFieldInput(taskStartDate.value) &&
    validFormFieldInput(taskDueTime.value) &&
    validFormFieldInput(taskDueDate.value) &&
    validFormFieldInput(taskDescription.value) &&
    validFormFieldInput(taskAssignedTo) &&
    validFormFieldInput(priority)
  ) {
    $("#changeTaskModal").modal("hide");
    window.sessionStorage.removeItem("id");
    myTaskManager.render();
  }
  else {
    alert("Please Enter All Data !!");
  }
}
function makeRequest() {
  xhr = new XMLHttpRequest();
  xhr.onload = function() {
    var response = JSON.parse(this.responseText);
    var city = response.city.name + ", " + response.city.country;
    var weatherTitle = response.list[0].weather[0].main;
    var temp = response.list[0].main.temp + "°";
    console.log(response);
    var weatherContainer = document.querySelector("#weather");
    weatherContainer.innerHTML = city + "<br/>" + weatherTitle + "<br/>" + temp;
  };
  xhr.open('GET','https://api.openweathermap.org/data/2.5/forecast?id=1819729&APPID=9b898e3b150743754b329ad780adb2be&lang=zh_tw&units=metric', true );
;
  xhr.send();
}
makeRequest();
