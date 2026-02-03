import {
    startClock
} from './clock.js'
startClock() // Часы в шапке сайта

import {
    initModal,
} from './modal.js'
initModal() // Запуск модального окна

import {
    renderTasks,
    initCardHandlers,
} from './handlers.js'

document.addEventListener('DOMContentLoaded', () => {
    renderTasks() // показываем начальное состояние
    initCardHandlers() // Вешаем обработчики - удаления, редактирования и смены статуса задачи
})