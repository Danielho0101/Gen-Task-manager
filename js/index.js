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
let time = document.getElementById("startTime");
let date = document.getElementById("startDate");

let timeValue;
const getTime = (event) => {
  event.preventDefault();
  if (time.value) {
    timeValue = time.value;
  }
};

const newTaskForm = document.querySelector("#modal-form");

const newTaskNameInput = document.querySelector("#nameInput");
const newTaskTitle = document.querySelector("#titleInput");
const newTaskDescription = document.querySelector("#description");
const newTaskAssignedTo = document.querySelector("#newTaskAssignedTo");
const newTaskStartDate = document.querySelector("#startDateInput");
const newTaskDueDate = document.querySelector("#dueDateInput");

const radioButtons = document.querySelectorAll('input[name="priority"]');

function add() {
  const name = newTaskNameInput.value;
  const title = newTaskTitle.value;
  const startDate = newTaskStartDate.value;
  const dueDate = newTaskDueDate.value;
  let selectedPriority;
  let priorityColor;
  const addTarget = document.getElementById("dataArea");

  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
      selectedPriority = radioButton.value;
      if (radioButton.value === "Low") {
        priorityColor = "green";
      } else if (radioButton.value === "Medium") {
        priorityColor = "yellow";
      } else {
        priorityColor = "red";
      }
      break;
    }
  }

  const newTaskElement = document.createElement("div");
  newTaskElement.innerHTML = taskTemplate(
    name,
    title,
    startDate,
    dueDate,
    priorityColor,
    selectedPriority
  );

  addTarget.appendChild(newTaskElement);
}

// function validFormFieldInput(data) {
//   return data !== null && data !== "";
// }

const taskTemplate = (name, title, startDate, dueDate, color, priority) => {
  return `
  <div class="row align-items-start" style="margin-left:0px">
  <div class="col-1">
    <div class="row ">
      <div class="Name" style="margin-left:8px">
        <p>${name}</p>
      </div>
    </div>

  </div>
  <div class="col-3">
    <div class="row">
      <div class="listTask rounded taskListText">${title}</div>
    </div>


  </div>
  <div class="col-2">
    <div class="row">
      <div class=" listTask startDayBox taskListText">
        <div class="startDay taskListText">${startDate}</div>
      </div>
    </div>


  </div>
  <div class="col-2">

    <div class="row">
      <div class="listTask dueDayBox taskListText">
        <div class="dueDayTime taskListText">${dueDate}</div>
      </div>
    </div>

  </div>
  <div class="col-1">
    <div class="row">
      <div class="listPriority priorityBox rounded taskListText" style="background-color:${color}">${priority}</div>

    </div>
  </div>

  <div class="col-1">
    <div class="row">
      <div class=" col-12 assignToBox">
        <div class="row taskListText">
          <a> M </a><a> D </a><a> S </a><a> W </a>
        </div>
      </div>
    </div>
  </div>

  <div class="col-2">
    <div class="row" style="margin-right:0px;border-radius: 0px 12px 0px 0px;">
      <!-- not show in finial  -->

      <button style="border: none; background: none;" type="button" data-toggle="modal"
        data-target="#exampleModal">
        <img src="photo/tasksIcon/Vector0.png" style="width: 30px; height:30px">
      </button>

      <button style="border: none; background: none;">
        <img src="photo/tasksIcon/Vector1.png" style="width: 30px; height:30px">
      </button>
    </div>
  </div>
</div>`;
};

const addTest = () => {
  return `<div class="row align-items-start" style="margin-left:0px">
    <div class="col-1">
      <div class="row ">
        <div class="Name" style="margin-left:8px">
          <p>Louis</p>
        </div>
      </div>

    </div>
    <div class="col-3">
      <div class="row">
        <div class="listTask rounded taskListText">Send Feedback to designer</div>
      </div>


    </div>
    <div class="col-2">
      <div class="row">
        <div class=" listTask startDayBox taskListText">
          <div class="startDay taskListText">13/05/2021</div>
        </div>
      </div>


    </div>
    <div class="col-2">

      <div class="row">
        <div class="listTask dueDayBox taskListText">
          <div class="dueDayTime taskListText"> 20/05/2021</div>
          <!-- <div class="dueDay"> <p>20/05/2021</p></div> -->
        </div>
      </div>

    </div>
    <div class="col-1">
      <div class="row">
        <div class="listPriority priorityBox rounded taskListText">high</div>

      </div>
    </div>

    <div class="col-1">
      <div class="row">
        <div class=" col-12 assignToBox">
          <div class="row taskListText">
            <a> M </a><a> D </a><a> S </a><a> W </a>
          </div>
        </div>
      </div>
    </div>

    <div class="col-2">
      <div class="row" style="margin-right:0px;border-radius: 0px 12px 0px 0px;">
        <!-- not show in finial  -->

        <button style="border: none; background: none;" type="button" data-toggle="modal"
          data-target="#exampleModal">
          <img src="photo/tasksIcon/Vector0.png" style="width: 30px; height:30px">
        </button>

        <button style="border: none; background: none;">
          <img src="photo/tasksIcon/Vector1.png" style="width: 30px; height:30px">
        </button>
      </div>
    </div>
  </div>
</div>`;
};
