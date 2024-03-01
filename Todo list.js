const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Load tasks from local storage on page load
document.addEventListener('DOMContentLoaded', () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTaskToList(task);
    });
});

// Add task to the list
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const task = { text: taskText, completed: false };
        addTaskToList(task);
        saveTasksToLocalStorage();
        taskInput.value = '';
    }
}

// Add task item to the DOM
function addTaskToList(task) {
    const li = document.createElement('li');
    li.innerText = task.text;
    if (task.completed) {
        li.classList.add('completed');
    }
    li.addEventListener('click', () => {
        toggleTaskCompleted(li);
    });
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', (event) => {
        event.stopPropagation();
        deleteTask(li);
    });
    li.appendChild(deleteButton);
    taskList.appendChild(li);
}

// Toggle task completed status
function toggleTaskCompleted(li) {
    li.classList.toggle('completed');
    saveTasksToLocalStorage();
}

// Delete task from the list
function deleteTask(li) {
    li.remove();
    saveTasksToLocalStorage();
}

// Save tasks to local storage
function saveTasksToLocalStorage() {
    const tasks = Array.from(taskList.children).map(li => {
        return {
            text: li.innerText.trim(),
            completed: li.classList.contains('completed')
        };
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Modified addTask function to include timer
        function addTask() {
            const taskText = taskInput.value.trim();
            const taskTime = timerInput.value; // Get the scheduled time
            if (taskText !== '') {
                const task = { text: taskText, time: taskTime, completed: false }; // Include time in the task object
                addTaskToList(task);
                saveTasksToLocalStorage();
                taskInput.value = '';
                timerInput.value = ''; // Reset timer input after adding task
            }
        }

        // Modified addTaskToList function to display time
        function addTaskToList(task) {
            const li = document.createElement('li');
            li.innerHTML = `<span>${task.text}</span> <span>${task.time}</span>`; // Display task text and time
            if (task.completed) {
                li.classList.add('completed');
            }
            li.addEventListener('click', () => {
                toggleTaskCompleted(li);
            });
            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'Delete';
            deleteButton.addEventListener('click', (event) => {
                event.stopPropagation();
                deleteTask(li);
            });
            li.appendChild(deleteButton);
            taskList.appendChild(li);
        }