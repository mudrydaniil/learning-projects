import Modal from 'bootstrap/js/dist/modal'
// Ммпортируем всё необходимое для управления модальным окном

import {
    fetchUsers,
} from './api.js'

import {
    buttonAdd,
    modalElement,
    taskForm,
    modalUser,
} from './dom.js'

import {
    handleAddTask,
} from './handlers.js'

export function initModal() {
    // Поверяем на наличие кнопки 'Добавление задачи'
    if (!buttonAdd) {
        console.error('Кнопка buttonAdd не найдена')
        return
    }

    // Поверяем на наличие модального окна
    if (!modalElement) {
        console.error('Модальное окно exampleModal не найдено')
    }

    // Проверяем на наличие формы
    if (!taskForm) {
        console.error('Форма taskForm не найдена')
        return
    }

    // Открываем модальное окно при нажатии кнопки 'Добавить задачу'
    buttonAdd.addEventListener('click', async () => {
        const users = await fetchUsers()

        if (modalUser) {
            if (users.length === 0) {
                modalUser.innerHTML = '<option value="">Пользователи не загрузились</option>'
            } else {
                let html = '<option value="" selected disabled>Выберите пользователя</option>'
                users.forEach(user => {
                    html += `<option value="${user.name}">${user.name}</option>`
                })
                modalUser.innerHTML = html
            }
        } else {
            console.error('Элемент #modalUser не найден в dom.js')
        }

        const modal = new Modal(modalElement)
        modal.show()
    })

    // При отправке формы (нажатием Confirm) вызываем логику добавления нашей задачи
    taskForm.addEventListener('submit', handleAddTask)
}