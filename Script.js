const addBtn = document.getElementById('add-btn');
const newTaskInput = document.querySelector('#wrapper input');
const tasksContainer = document.querySelector('#tasks');
const error = document.querySelector('#error');
const countValue = document.querySelector('.count-value');

let taskCount = 0;

const displayCount = (taskCount) => {
    countValue.textContent = taskCount;
};

const addTask = () => {
    const taskName = newTaskInput.value.trim();
    error.style.display = "none";
    if (!taskName) {
        setTimeout(() => {
            error.style.display = "block";
        }, 200);
        return;
    }

    const task = `
    <div class="task">
        <input type="checkbox" class="task-check"/>
        <span class="taskname">${taskName}</span>
        <button class="edit">
            <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button class="delete">
            <i class="fa-solid fa-trash"></i>
        </button>
    </div>
  `;

    taskCount++;
    displayCount(taskCount);
    newTaskInput.value = "";
    tasksContainer.insertAdjacentHTML('beforeend', task);
};

addBtn.addEventListener('click', addTask);
newTaskInput.addEventListener('keyup', (event) => event.key === 'Enter' && addTask());

tasksContainer.addEventListener('click', (event) => {
    const targetElement = event.target;
    if (targetElement.classList.contains('edit')) {
        newTaskInput.value = targetElement.previousElementSibling.innerText;
        const checkbox = targetElement.parentElement.querySelector(".task-check");
        if (!checkbox.checked) {
            taskCount--;
            displayCount(taskCount);
        }
        targetElement.parentElement.remove();
    }
    else if (targetElement.classList.contains('delete')) {
        const task = targetElement.parentElement;
        if (!task.querySelector('.task-check').checked) {
            taskCount--;
            displayCount(taskCount);
        }
        task.remove();
    }
    else if (targetElement.classList.contains('task-check')) {
        const task = targetElement.parentElement;
        task.querySelector('.taskname').classList.toggle("completed", targetElement.checked);
        if (targetElement.checked) {
            taskCount--;
        } else {
            taskCount++;
        }
        displayCount(taskCount);
    };
});

window.onload = () => {
    taskCount = 0;
    displayCount(taskCount);
    newTaskInput.value = "";
};

