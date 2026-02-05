import './api.js'

import {
    startClock
} from './clock.js'
startClock() // Часы в шапке сайта

import {
    initModal,
} from './modal.js'
initModal() // Запуск модального окна

import {
    getData,
    renderTasks,
    initCardHandlers,
    handleDeleteAll,
} from './handlers.js'

import {
    buttonDeleteAll,
} from './dom.js'

document.addEventListener('DOMContentLoaded', () => {
    renderTasks() // рендерим
    initCardHandlers() // Вешаем обработчики - удаления, редактирования и смены статуса задачи
    if (buttonDeleteAll) {
        buttonDeleteAll.addEventListener('click', handleDeleteAll) // обработчик удаления всех задач
    }
})