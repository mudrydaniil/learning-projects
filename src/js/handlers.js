import {
    modalTitle,
    modalDescription,
    inProgressCards,
    modalElement,
} from './dom.js'

// Массив где будут зранитсья наши данные(задачи)
const tasks = []

// Создаём шаблон карточки
function createTaskCard(title, description) {
    const card = document.createElement('div')
    card.className = 'card task-card shadow-sm mb-3'

    card.innerHTML = `
    <div class="card-body">
      <div class="d-flex align-items-start mb-2">
        <div class="form-check me-3">
          <input class="form-check-input mt-1" type="checkbox">
        </div>
        <h5 class="card-title mb-1 flex-grow-1">
          ${title}
        </h5>
      </div>

      <p class="card-text text-muted small mb-3">
        ${description || 'Нет описания'}
      </p>

      <div class="d-flex justify-content-between align-items-center small text-muted">
        <span class="user-name">User</span>
        <time class="badge bg-success">
          ${new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
        </time>
      </div>
    </div>
    `
    return card
}

function handleAddTask(event) {
    event.preventDefault()

    const title = modalTitle.value.trim() // trim() (встроенный метод строк) --> удаляет пробельные символы с начала и конца строки
    if (!title) {
        alert('Введите название задачи!')
        return
    }

    const description = modalDescription.value.trim()

    // Создаём карточку
    const card = createTaskCard(title, description)

    // Проверка на существования колонки(контейнера) для карточек 
    if (!inProgressCards) {
        console.error('Контейнер inprogress-cards не найден')
        return
    }

    // Добавляем задачу в колонку
    inProgressCards.appendChild(card)

    // Закрываем модалку 
    const modal = bootstrap.Modal.getInstance(modalElement)
    modal?.hide()

    // Очищаем поля формы
    modalTitle.value = ''
    modalDescription.value = ''
}

export {
    handleAddTask,
}