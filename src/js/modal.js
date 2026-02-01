import Modal from 'bootstrap/js/dist/modal'
import {
    handleSubmitForm
} from './handlers.js'
import {
    buttonAddTask,
    modalElement,
}
    from './dom.js'

function handleClickButton() {
    const modal = new Modal(modalElement)
    console.log(modal)
    modal.show()
}

function initModal() {
    buttonAddTask.addEventListener('click', handleClickButton)
}

export {
    initModal,
}