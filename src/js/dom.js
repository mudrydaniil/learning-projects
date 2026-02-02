function $(selector) {
    return document.querySelector(selector)
}

// Variables --------------------------------------

// Кнопка добавления задачи
const buttonAdd = $('#buttonAdd')

// Модальное окно и его элементы
const modalElement = $('#exampleModal')
const taskForm = $('#taskForm')
const modalTitle = $('#modalTitle')
const modalDescription = $('#modalDescription')
const modalUser = $('#modalUser')

// Карточки в колонке 'В работе'
const inProgressCards = $('#inprogress-cards')

export {
    $,
    buttonAdd,
    modalElement,
    taskForm,
    modalTitle,
    modalDescription,
    modalUser,
    inProgressCards,
}