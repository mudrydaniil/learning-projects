const $ = (selector) => document.querySelector(selector)

// Variables --------------------------------------

// const buttonDeleteAll = $('#buttonDeleteAll')
const cardElement = $('#todoCard')
const modalElement = $('#exampleModal')
const buttonEditElement = $('#buttonEdit')
const buttonAddTask = $('#buttonAdd')

export {
    $,
    cardElement,
    modalElement,
    buttonEditElement,
    buttonAddTask,
}