
const form = document.querySelector('#form')
const taskInput = document.querySelector('#taskInput')
const taskList = document.querySelector('#tasksList')
const emptyList = document.querySelector('#emptyList')
let tasks = [];

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'))
    tasks.forEach(task => renderTask(task))
}


form.addEventListener('submit', addTask)
taskList.addEventListener('click', deleteTask)
taskList.addEventListener('click', doneTask)

function addTask(event) {
    event.preventDefault()

    const taskText = taskInput.value
    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false
    }


    tasks.push(newTask)
    saveToLocalStorage()
    renderTask(newTask)
    taskInput.value = ""
    taskInput.focus()
    
    if (taskList.children.length > 1){
        emptyList.classList.add('none')
    }
}

function deleteTask(event) {
    if (event.target.dataset.action !== 'delete') return;

    const parentNode = event.target.closest('li')
    const id = parentNode.id
    const index = tasks.findIndex((task) => task.id == id)

    tasks.splice(index, 1)
    saveToLocalStorage()


    parentNode.remove()

    if (taskList.children.length === 1){
        emptyList.classList.remove('none')
    }
}

function doneTask(event) {
    if (event.target.dataset.action !== 'done') return

    const parentNode = event.target.closest('li')

    const id = parentNode.id

    const task = tasks.find((task => id == task.id))
    task.done = !task.done
    saveToLocalStorage()
    const taskTitle = parentNode.querySelector('span')
    taskTitle.classList.toggle('task-title--done')
}

function saveToLocalStorage(){
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function renderTask(task) {
    const cssClass = task.done ? "task-title task-title--done" : "task-title"
    const taskHTML = `<li id=${task.id} class="list-group-item d-flex justify-content-between task-item">
                        <span class="${cssClass}">${task.text}</span>
                        <div class="task-item__buttons">
                            <button type="button" data-action="done" class="btn-action">
                                <img src="./source/images/tick.svg" alt="Done" width="18" height="18">
                            </button>
                            <button type="button" data-action="delete" class="btn-action">
                                <img src="./source/images/cross.svg" alt="Done" width="18" height="18">
                            </button>
                        </div>
                    </li>`

    taskList.insertAdjacentHTML('beforeend', taskHTML)  
}