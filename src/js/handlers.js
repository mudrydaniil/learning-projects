import Modal from 'bootstrap/js/dist/modal'
import {
    modalTitle,
    modalDescription,
    inProgressCards,
    modalElement,
    modalUser,
    buttonDeleteAll,
} from './dom.js'

// Массив где будут храниться наши данные(задачи)
let tasks = getData() // Загруза данных из localStorage
let editTaskId = null

// Конструктор задачи 
function Task(title, description, user = 'Не выбран') {
    this.title = title
    this.description = description
    this.user = user
    this.status = 'todo'
    this.isCompleted = false
    this.createdAt = new Date()
    this.id = crypto.randomUUID()
}

// Создаём шаблон карточки
function buildTaskTemplate(task) {
    const { title, description, isCompleted, createdAt, id, user, status } = task
    return `
    <div class="card-body">
            <div class="d-flex align-items-start mb-2">
                <div class="form-check me-3">
                    <input class="form-check-input mt-1" type="checkbox" id="task-${id}" data-id="${id}" ${isCompleted ? 'checked' : ''}>
                </div>
                <h5 class="card-title mb-1 flex-grow-1">
                    ${title}
                </h5>
                <button type="button" class="btn btn-sm btn-danger p-0 delete-btn" data-id="${id}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-x pe-none" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                </button>
            </div>

            <p class="card-text text-light small mb-3">
                ${description || 'Нет описания'}
            </p>

            <div class="d-flex justify-content-between mb-3">
                <button type="button" class="btn btn-secondary edit-btn" data-id="${id}" style="--bs-btn-padding-y: .30rem; --bs-btn-padding-x: .9rem; --bs-btn-font-size: .85rem;">
                    Edit
                </button>
                <select class="form-select form-select-sm custom-sm-select status-select" data-id="${id}">
                    <option value="todo" ${status === 'todo' ? 'selected' : ''}>Задачи</option>
                    <option value="inprogress" ${status === 'inprogress' ? 'selected' : ''}>В работе</option>
                    <option value="done" ${status === 'done' ? 'selected' : ''}>Готово</option>
                </select>
            </div>

            <div class="d-flex justify-content-between align-items-center small text-muted">
                <span class="user-name text-light">${user}</span>
                <time class="badge bg-success">${createdAt.toLocaleDateString()}</time>
            </div>
        </div>
    `
}

// Рендерим задачи
function renderTasks() {
    document.querySelectorAll('.board-column__cards').forEach(container => {
        container.innerHTML = ''
    })

    tasks.forEach(task => {
        const container = document.querySelector(`.board-column__cards[data-status="${task.status}"]`)
        if (container) {
            const card = document.createElement('div')
            card.className = 'card task-card shadow-sm mb-3'
            card.dataset.id = task.id // dataset - специальное свойство DOM-эл., сохраняем id карточки
            card.innerHTML = buildTaskTemplate(task)
            container.appendChild(card)
        }
    })

    // Счётчик количества задач
    document.querySelectorAll('.board-column').forEach(column => { // для каждой колонки исполнямем код
        const status = column.dataset.status // получаем статус текущей колонки из атрибута data-status HTML элемента
        const count = tasks.filter(todo => todo.status === status).length // ищем задачи только с нужным нам статусом
        const countElement = column.querySelector('.board-column__count')
        if (countElement) {
            countElement.textContent = count
        }
    })
}

function handleAddTask(event) {
    event.preventDefault()

    const title = modalTitle.value.trim() // trim() (встроенный метод строк) --> удаляет пробельные символы с начала и конца строки
    if (!title) {
        alert('Введите название задачи!')
        return
    }

    const description = modalDescription.value.trim()
    const user = modalUser.value || 'Не выбран'

    if (editTaskId) {
        const task = tasks.find(todo => todo.id === editTaskId)
        if (task) {
            task.title = title
            task.description = description
            task.user = user
            task.createdAt = new Date()
        }
        editTaskId = null
    } else {
        const newTask = new Task(title, description, user)
        tasks.push(newTask)
    }

    setData(tasks) // Сохранение в localStorage
    renderTasks()

    // Закрываем модалку 
    const modal = Modal.getInstance(modalElement)
    modal.hide()

    // Очищаем поля формы
    modalTitle.value = ''
    modalDescription.value = ''
    modalUser.value = ''
}

// Удаление задачи
function deleteTask(id) {
    if (!confirm('Удалить задачу?')) {
        return
    }
    const index = tasks.findIndex(todo => todo.id === id)
    if (index !== -1) {
        tasks.splice(index, 1)
        setData(tasks)
        renderTasks()
    }
}

// Редактирование задачи
function editTask(id) {
    const task = tasks.find(todo => todo.id === id)
    if (!task) {
        return
    }
    editTaskId = id

    modalTitle.value = task.title
    modalDescription.value = task.description || ''
    modalUser.value = task.user || ''

    const modal = new Modal(modalElement)
    modal.show()
}

// Перключение статуса через селектв карточке
function changeStatus(select) {
    console.log('changeStatus сработал')
    const id = select.dataset.id // получаем id задачи
    const newStatus = select.value // возвращает нам значение статус выбранного option в select

    const task = tasks.find(todo => todo.id === id)
    if (!task) {
        return
    }
    if (newStatus === 'inprogress') {
        const currentInProgressCount = tasks.filter(todo => todo.status === 'inprogress' && todo.id !== id).length

        if (currentInProgressCount >= 6) {
            alert('Сначало надо выполнить текущие прежде чем ещё добавить одно дело')
            select.value = task.status
            return
        }
    }
    task.status = newStatus
    setData(tasks)
    renderTasks()
}

// Инициализация всех обработчиков карточек
function initCardHandlers() {
    document.addEventListener('click', event => {
        const deleteBtn = event.target.closest('.delete-btn')
        if (deleteBtn) {
            const id = deleteBtn.dataset.id
            deleteTask(id)
            return
        }

        const editBtn = event.target.closest('.edit-btn')
        if (editBtn) {
            const id = editBtn.dataset.id
            editTask(id)
            return
        }
    })

    // Обработчик для изминения селект статуса
    document.addEventListener('change', event => {
        if (event.target.classList.contains('status-select')) {
            changeStatus(event.target)
        }
    })
}

// Загруза в localStorage
function getData() {
    const todos = localStorage.getItem('todos')
    if (todos === null) {
        return []
    }
    const dataArr = JSON.parse(todos)
    dataArr.forEach(todo => {
        todo.createdAt = new Date(todo.createdAt)
    })
    return dataArr
}

// Сохранение в localStorage
function setData(todos) {
    localStorage.setItem('todos', JSON.stringify(todos))
}

// DeleteAll
function handleDeleteAll() {
    const doneTasks = tasks.filter(task => task.status === 'done')
    if (doneTasks.length === 0) {
        alert('Список уже пуст!')
        return
    }
    if (confirm('Удалить все задачи из колонки Done?')) {
        tasks = tasks.filter(task => task.status !== 'done')
        setData(tasks)
        renderTasks()
        alert('Список очищен!')
    }
}

export {
    handleAddTask,
    initCardHandlers,
    renderTasks,
    handleDeleteAll,
    getData,
    setData,
    Task,
}