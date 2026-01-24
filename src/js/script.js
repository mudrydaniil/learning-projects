import Modal from 'bootstrap/js/dist/modal'
import {
    handleSubmitForm
} from './handlers.js'
import {
    startClock
} from './clock.js'
startClock()

// // Event listerners
// document.querySelector('form')?.addEventListener('submit', handleSubmitForm)

// const buttonElement = document.querySelector('#button')
// function handleClickButton() {
//     const modalElement = document.querySelector('#exampleModal')
//     const modal = new Modal(modalElement) // Modal.getOrCreateInstance(modalElement)

//     console.log(modal)

//     modal.show() // modal.hide()
// }

// buttonElement.addEventListener('click', handleClickButton)