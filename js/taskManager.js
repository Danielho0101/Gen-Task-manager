const createTaskHTML = (id, name, title, startDate, dueDate, priority, assignedTo) => {
  return `<div class="row align-items-start" data-task-id="${id}" style="margin-left:0px">
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
              <div class="listPriority priorityBox rounded taskListText"
              style="background-color:${priority === "High" ? "red" : "Medium" ? "yellow" : "green"}">${priority}</div>

            </div>
          </div>

          <div class="col-1">
            <div class="row">
              <div class=" col-12 assignToBox">
                <div class="row taskListText">
                ${assignedTo}
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

              <button style="border: none; background: none;" onclick=deleteTask(${id})>
                <img src="photo/tasksIcon/Vector1.png" style="width: 30px; height:30px">
              </button>
            </div>
          </div>
        </div>`;
};

class TaskManager {
  constructor(currentId = 0) {
    this.tasks = [];
    this.currentId = currentId;
  }

  addTask(name, title, startTime, startDate, dueTime, dueDate, description, priority, assignedTo) {
    const task = {
      id: this.currentId++,
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
    var storage=window.localStorage;
    let input = task.id;  
    storage.setItem(input,JSON.stringify(task))
  }

  deleteTask(taskId) {
    // Create an empty array and store it in a new variable, newTasks
    const newTasks = [];
    // Loop over the tasks
    for (let i = 0; i < this.tasks.length; i++) {
      // Get the current task in the loop
      const task = this.tasks[i];

      // Check if the task id is not the task id passed in as a parameter
      if (task.id !== taskId) {
        // Push the task to the newTasks array
        newTasks.push(task);
        
      }
    }

    // Set this.tasks to newTasks
    this.tasks = newTasks;
    var storage=window.localStorage;
    storage.removeItem(taskId);
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

  getTaskArr() {
    console.log(this.tasks.length, this.tasks, this.tasks.length >= 1);
  }
  render(status = "TODO") {
    const tasksHtmlList = [];
    const tasksList = document.querySelector("#dataArea");

    tasksList.innerHTML = "";
    if (status === "TODO")
      for (let i = 0; i < this.tasks.length; i++) {
        const task = this.tasks[i];
        const taskHtml = createTaskHTML(
          task.id,
          task.name,
          task.title,
          task.startDate,
          task.dueDate,
          task.priority,
          task.assignedTo,
        );

        tasksHtmlList.push(taskHtml);

        const tasksHtml = tasksHtmlList.join("\n");


        tasksList.innerHTML = tasksHtml;
      }
  }

  save() {
    const tasksJson = JSON.stringify(this.tasks);

    localStorage.setItem("tasks", tasksJson);

    const currentId = String(this.currentId);

    localStorage.setItem("currentId", currentId);
  }

  load() {
    if (localStorage.getItem("tasks")) {
      const tasksJson = localStorage.getItem("tasks");

      this.tasks = JSON.parse(tasksJson);
    }

    if (localStorage.getItem("currentId")) {
      const currentId = localStorage.getItem("currentId");

      this.currentId = Number(currentId);
    }
  }
}





