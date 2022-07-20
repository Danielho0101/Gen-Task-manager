const createTaskHTML = (
  id,
  name,
  title,
  startDate,
  dueDate,
  priority,
  assignedTo
) => {
  let color;
  if (priority === "High") {
    color = "red";
  } else if (priority === "Medium") {
    color = "yellow";
  } else {
    color = "green";
  }

  return `<div class="row align-items-start" style="margin-left:0px" data-task-id="${id}">
  <div class="col-1 d-none d-md-block">
    <div class="row ">
      <div class="Name" style="margin-left:8px">
        <p>${name}</p>
      </div>
    </div>
  </div>
  <div class="col-md-3 col-3">
    <div class="row">
      <div class="listTask rounded taskListText">${title}</div>
    </div>
  </div>
  <div class="col-2 d-none d-md-block">
    <div class="row">
      <div class=" listTask startDayBox taskListText">
        <div class="startDay taskListText">${startDate}</div>
      </div>
    </div>
  </div>
  <div class="col-2 d-none d-md-block">
    <div class="row">
      <div class="listTask dueDayBox taskListText">
        <div class="dueDayTime taskListText">${dueDate}</div>
      </div>
    </div>
  </div>
  <div class="col-md-1 col-3">
    <div class="row">
      <div class="listPriority priorityBox rounded taskListText"
      style="background-color:${color}">${priority}</div>
    </div>
  </div>
  <div class="col-md-1 col-3">
    <div class="row">
      <div class=" col-12 assignToBox">
        <div class="row taskListText">${assignedTo}</div>
      </div>
    </div>
  </div>
  <div class="col-md-2 col-3">
    <div class="row" style="margin-right:0px;border-radius: 0px 12px 0px 0px;">
      <!-- not show in finial  -->
      <button style="border: none; background: none;" type="button" data-toggle="modal"
        data-target="#changeTaskModal" onclick="getTaskValue(${id})">
        <img src="photo/tasksIcon/Vector0.png" style="width: 30px; height:30px">
      </button>
      <button style="border: none; background: none;" onclick="deleteTask(${id})">
        <img src="photo/tasksIcon/Vector1.png" style="width: 30px; height:30px">
      </button>
    </div>
  </div>
</div>`;
};
// return `<div class="row align-items-start" data-task-id="${id}" style="margin-left:0px">
//         <div class="col-1">
//           <div class="row ">
//             <div class="Name" style="margin-left:8px">
//               <p>${name}</p>
//             </div>
//           </div>

//         </div>
//         <div class="col-2">
//           <div class="row">
//             <div class="listTask rounded taskListText">${title}</div>
//           </div>

//         </div>
//         <div class="col-2">
//           <div class="row">
//             <div class=" listTask startDayBox taskListText">
//               <div class="startDay taskListText">${startDate}</div>
//             </div>
//           </div>
//         </div>

//         <div class="col-2">

//           <div class="row">
//             <div class="listTask dueDayBox taskListText">
//               <div class="dueDayTime taskListText">${dueDate}</div>
//             </div>
//           </div>
//         </div>

//         <div class="col-1">
//           <div class="row">
//             <div class="listPriority priorityBox rounded taskListText"
//             style="background-color:${color}">
//             ${priority}</div>

//           </div>
//         </div>

//         <div class="col-1">
//           <div class="row">
//             <div class=" col-12 assignToBox">
//               <div class="row taskListText">${assignedTo}</div>
//             </div>
//           </div>
//         </div>

//         <div class="col-2">
//           <div class="row" style="margin-right:0px;border-radius: 0px 12px 0px 0px;">

//             <button style="border: none; background: none;" type="button" onclick=getTaskValue(${id})
//             data-target="#changeTaskModal" data-toggle="modal">
//               <img src="photo/tasksIcon/Vector0.png" style="width: 30px; height:30px">
//             </button>

//             <button style="border: none; background: none;" onclick=deleteTask(${id})>
//               <img src="photo/tasksIcon/Vector1.png" style="width: 30px; height:30px">
//             </button>
//           </div>
//         </div>
//       </div>`;

class TaskManager {
  constructor(currentId = 0) {
    this.tasks = [];
    this.currentId = currentId;
  }

  addTask(
    name,
    title,
    startTime,
    startDate,
    dueTime,
    dueDate,
    description,
    priority,
    assignedTo
  ) {
    const task = {
      id: this.currentId,
      name: name,
      title: title,
      startTime: startTime,
      startDate: startDate,
      dueTime: dueTime,
      dueDate: dueDate,
      description: description,
      assignedTo: assignedTo,
      priority: priority,
      status: "TODO",
    };
    this.tasks.push(task);
    var storage = window.localStorage;
    let input = this.currentId;
    this.currentId++;
    storage.setItem(input, JSON.stringify(task));
    // console.log("addTask");
    // console.log(JSON.stringify(this.tasks));
  }

  changeTask(
    taskId,
    name,
    title,
    startTime,
    startDate,
    dueTime,
    dueDate,
    description,
    assignedTo,
    priority
  ) {
    this.tasks[taskId].name = name;
    this.tasks[taskId].title = title;
    this.tasks[taskId].startTime = startTime;
    this.tasks[taskId].startDate = startDate;
    this.tasks[taskId].dueTime = dueTime;
    this.tasks[taskId].dueDate = dueDate;
    this.tasks[taskId].description = description;
    this.tasks[taskId].assignedTo = assignedTo;
    this.tasks[taskId].priority = priority;
    const task = this.tasks[taskId];
    window.localStorage.setItem(taskId, JSON.stringify(task));
    // console.log("changeData" + JSON.stringify(this.tasks));
  }

  deleteTask(taskId) {
    // Create an empty array and store it in a new variable, newTasks
    const newTasks = [];
    // Loop over the tasks
    for (let i = 0; i < this.tasks.length; i++) {
      // Get the current task in the loop
      const task = this.tasks[i];
      // task.id = this.tasks[i].id;

      // Check if the task id is not the task id passed in as a parameter
      if (task.id !== taskId) {
        // Push the task to the newTasks array
        newTasks.push(task);
      }
    }
    var storage = window.localStorage;
    storage.clear();

    for (let i = 0; i < newTasks.length; i++) {
      newTasks[i].id = i;
      storage.setItem(i, JSON.stringify(newTasks[i]));
    }
    this.tasks = newTasks;

    // console.log(this.tasks);
    // console.log("delete");
    // console.log(JSON.stringify(this.tasks));
  }

  getTaskById(taskId) {
    let foundTask;

    for (let i = 0; i < this.tasks.length; i++) {
      const task = this.tasks[i];

      if (task.id === taskId) {
        foundTask = task;
      }
    }

    return foundTask;
  }

  render(status = "TODO") {
    const tasksHtmlList = [];
    const tasksList = document.querySelector("#dataArea");

    tasksList.innerHTML = "";
    if (status === "TODO")
      for (let i = 0; i < this.tasks.length; i++) {
        this.tasks[i].id = i;
        this.currentId = this.tasks.length;
        const task = this.tasks[i];
        const taskHtml = createTaskHTML(
          task.id,
          task.name,
          task.title,
          task.startDate,
          task.dueDate,
          task.priority,
          task.assignedTo
        );
        tasksHtmlList.push(taskHtml);

        const tasksHtml = tasksHtmlList.join("\n");

        tasksList.innerHTML = tasksHtml;
      }
  }

  getLocalData() {
    let storage = window.localStorage;

    let i = 0;
    let j = 0;
    while (storage[i] || i < 100) {
      if (storage[i]) {
        const parseTask = JSON.parse(storage[i]);
        parseTask.id = j;
        this.currentId = j;
        // console.log("id " + j);
        this.tasks.push(parseTask);
        storage.setItem(j, JSON.stringify(parseTask));
        // console.log("getData");
        i++;
        j++;
      } else {
        i++;
      }
    }
    // console.log("this.task = " + JSON.stringify(this.tasks));
  }
}
