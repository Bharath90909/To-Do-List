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

  const task = document.createElement("div");
  task.classList.add("task");
  task.innerHTML = `
    <input type="checkbox" class="task-check"/>
    <span class="taskname">${taskName}</span>
    <button class="edit">
      <i class="fa-solid fa-pen-to-square"></i>
    </button>
    <button class="delete">
      <i class="fa-solid fa-trash"></i>
    </button>
  `;

  taskCount++;
  displayCount(taskCount);
  newTaskInput.value = "";

  //Editing Tasks
  const editButtons = task.querySelectorAll(".edit");
  editButtons.forEach(editBtn => {
    editBtn.onclick = (event) => {
      let targetElement = event.target;
      if (!event.target.className === "edit") {
        targetElement = event.target.parentElement;
      }
      newTaskInput.value = targetElement.previousElementSibling.innerText;

      const checkbox = targetElement.parentElement.querySelector(".task-check");
      if (!checkbox.checked) {
        taskCount--;
        displayCount(taskCount);
      }

      targetElement.parentNode.remove();
    };
  });

  //Deleting Tasks
  const deleteButtons = task.querySelectorAll('.delete');
  deleteButtons.forEach(deleteBtn => {
    deleteBtn.onclick = () => {
      const task = deleteBtn.parentElement;
      if (!task.querySelector('.task-check').checked) {
        taskCount--;
        displayCount(taskCount);
      }
      task.remove();
    };
  });

  //CheckBox
  const taskCheckboxes = task.querySelectorAll('.task-check');
  taskCheckboxes.forEach(checkbox => {
    checkbox.onchange = () => {
      const task = checkbox.parentElement;
      task.querySelector('.taskname').classList.toggle("completed", checkbox.checked);
      if (checkbox.checked) {
        taskCount--;
      } else {
        taskCount++;
      }
      displayCount(taskCount);
    };
  });

  tasksContainer.appendChild(task);
};

addBtn.addEventListener('click', addTask);
newTaskInput.addEventListener('keyup', (event) => event.key === 'Enter' && addTask());

window.onload = () => {
  taskCount = 0;
  displayCount(taskCount);
  newTaskInput.value = "";
};

