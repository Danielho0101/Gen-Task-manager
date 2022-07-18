const todo = document.getElementById('todoTitle');
const doing = document.getElementById('doingTitle');
const done = document.getElementById('doneTitle');

todo.style.backgroundColor = "rgb(244, 208, 255)";
doing.style.backgroundColor = "rgb(193, 112, 189)";
done.style.backgroundColor = "rgb(126, 55, 141)";

const changeTaskListBackground = (target) => {
    const changeColor = document.getElementById('taskListArea');
    changeColor.style.backgroundColor = target.style.backgroundColor;
};

let t = new TaskManager();
console.log(t.currentId);