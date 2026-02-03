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
    this.status = 'inprogress'
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

            <p class="card-text text-muted small mb-3">
                ${description || 'Нет описания'}
            </p>

            <div class="d-flex justify-content-between mb-3">
                <button type="button" class="btn btn-secondary edit-btn" data-id="${id}" style="--bs-btn-padding-y: .30rem; --bs-btn-padding-x: .9rem; --bs-btn-font-size: .85rem;">
                    Edit
                </button>
                <select class="form-select form-select-sm custom-sm-select status-select" data-id="${id}">
                    <option value="todo" ${status === 'todo' ? 'selected' : ''}>TODO</option>
                    <option value="inprogress" ${status === 'inprogress' ? 'selected' : ''}>В работе</option>
                    <option value="done" ${status === 'done' ? 'selected' : ''}>DONE</option>
                </select>
            </div>

            <div class="d-flex justify-content-between align-items-center small text-muted">
                <span class="user-name">${user}</span>
                <time class="badge bg-success">${createdAt.toLocaleDateString()}</time>
            </div>
        </div>
    `
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
    const time = new Date().toLocaleString('ru-RU')

    if (editTaskId) {
        const task = tasks.find(todo => todo.id === editTaskId)
        if (task) {
            task.title = title
            task.description = description
            task.user = user
            task.time = time + ' (изменено) '
        }
        editTaskId = null
    } else {
        tasks.push({
            id: Date.now(),
            title,
            description,
            user,
            status: 'inprogress',
            time,
        })
    }

    renderTasks()

    // Закрываем модалку 
    const modal = Modal.getInstance(modalElement);
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
    tasks = tasks.filter(todo => todo.id !== id)
    renderTasks()
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
    const id = Number(select.dataset.id)
    const newStatus = select.value

    const task = tasks.find(todo => todo.id === id)
    if (task) {
        task.status = newStatus
        renderTasks()
    }
}

// Инициализация всех обработчиков карточек
function initCardHandlers() {
    document.addEventListener('click', event => {
        const target = event.target

        if (target.classList.contains('delete-btn')) {
            const id = Number(target.dataset.id)
            deleteTask(id)
        }

        if (target.classList.contains('edit-btn')) {
            const id = Number(target.dataset.id)
            editTask(id)
        }
    })

    // Обработчик для изминения селект статуса
    document.addEventListener('change', event => {
        if (event.target.classList.contains('status-select')) {
            changeStatus(event.target)
        }
    })
}

// Обновление содрежимого карточек(рендер)
function renderTasks() {
    // Очищаем колонку
    document.querySelectorAll('.board-column__cards').forEach(container => {
        container.innerHTML = ''
    })

    tasks.forEach(task => {
        const container = document.querySelector(`.board - column__cards[data - status='${task.status}']`)
        if (container) {
            container.appendChild(createTaskCard(task))
        }
    })

    // Обновляем все счётчики
    document.querySelectorAll('.board-column').forEach(column => {
        const status = column.dataset.status
        const count = tasks.filter(todo => todo.status === status).length
        const countElement = column.querySelector('.board-column__count')
        if (countElement) countElement.textContent = count
    })
}

export {
    handleAddTask,
    initCardHandlers,
    renderTasks,
}