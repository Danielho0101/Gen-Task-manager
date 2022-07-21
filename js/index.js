const myTaskManager = new TaskManager();

const todo = document.getElementById("todoTitle");
const doing = document.getElementById("doingTitle");
const done = document.getElementById("doneTitle");

let currentTaskArea = "TODO";
todo.style.backgroundColor = "rgb(244, 208, 255)";
doing.style.backgroundColor = "rgb(193, 112, 189)";
done.style.backgroundColor = "rgb(126, 55, 141)";

const changeTaskListBackground = (target) => {
  const changeColor = document.getElementById("taskListArea");
  changeColor.style.backgroundColor = target.style.backgroundColor;

  if (changeColor.style.backgroundColor === todo.style.backgroundColor) {
    currentTaskArea = "TODO";
    myTaskManager.render("TODO");
  } else if (changeColor.style.backgroundColor === doing.style.backgroundColor) {
    currentTaskArea = "DOING";
    myTaskManager.render("DOING");
  } else if (changeColor.style.backgroundColor === done.style.backgroundColor) {
    currentTaskArea = "DONE";
    myTaskManager.render("DONE");
  }
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
    myTaskManager.render(currentTaskArea);
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
  myTaskManager.render(currentTaskArea);
  searchTask();
}

function getLocalData() {
  myTaskManager.getLocalData();
  myTaskManager.render(currentTaskArea);
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
const taskStatus = document.querySelectorAll('input[name="statusValue"]');

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
  for (const radioButton of taskStatus) {
    if (radioButton.value === task.status) {
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

  for (const radioButton of taskStatus) {
    if (radioButton.checked) {
      taskStatus.value = radioButton.value;
      break;
    }
  }

  if (validFormFieldInput(taskName.value) &&
    validFormFieldInput(taskTitle.value) &&
    validFormFieldInput(taskStartTime.value) &&
    validFormFieldInput(taskStartDate.value) &&
    validFormFieldInput(taskDueTime.value) &&
    validFormFieldInput(taskDueDate.value) &&
    validFormFieldInput(taskDescription.value) &&
    validFormFieldInput(taskAssignedTo) &&
    validFormFieldInput(priority) &&
    validFormFieldInput(taskStatus.value)
  ) {
    $("#changeTaskModal").modal("hide");
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
      priority,
      taskStatus.value
    );
    window.sessionStorage.removeItem("id");
    myTaskManager.render(currentTaskArea);
    searchTask();
  }
  else {
    alert("Please Enter All Data !!");
  }
}
function makeRequest() {
  xhr = new XMLHttpRequest();
  xhr.onload = function () {

    var response = JSON.parse(this.responseText);
    var city = response.city.name + ", " + response.city.country;
    var weatherTitle = response.list[0].weather[0].main;
    var temp = "<a style='font-size:65px;!importrant'>" + response.list[0].main.temp + "°" + "</a>";

    if (weatherTitle == "Rain") {
      weather = `<i class="fa-solid fa-cloud-sun-rain" style='font-size:65px;!importrant'></i>`;

    } else if (weatherTitle == "Clouds") {
      weather = `<i class="fa-solid fa-cloud" style='font-size:65px;!importrant'></i>`

    } else {
      weather = `<i class="fas fa-sun"></i>`
    }
    if (response.list[0].main.temp > 33) {
      tempicon = `<i class="fa-solid fa-temperature-arrow-up"></i> `;
    } else {
      tempicon = `<i class="fa-solid fa-temperature-three-quarters"></i>`
    }
    console.log(response);
    var weatherContainer = document.querySelector("#weather");
    weatherContainer.innerHTML = city + "<br/>" + weather + "<br/>" + temp + tempicon;
  };
  xhr.open('GET', 'https://api.openweathermap.org/data/2.5/forecast?id=1819729&APPID=9b898e3b150743754b329ad780adb2be&lang=zh_tw&units=metric', true);
  ;
  xhr.send();
}
makeRequest();

function searchTask() {
  myTaskManager.searchLocalData();
}

function clearSearch() {
  myTaskManager.clearSearchResult();
}
