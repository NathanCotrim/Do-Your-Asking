export function Modal() {
    function openActionsModal() {
        document.querySelector('.modal-wrapper#actions').classList.add('active')
    }

    function closeActionsModal() {
        document.querySelector('.modal-wrapper#actions').classList.remove('active')
    }

    function openResponseModal() {
        document.querySelector('.modal-wrapper#response').classList.add('active')
    }

    function closeResponseModal() {
        document.querySelector('.modal-wrapper#response').classList.remove('active')
    }

    return {
        openActionsModal,
        closeActionsModal,
        openResponseModal,
        closeResponseModal
    }
}