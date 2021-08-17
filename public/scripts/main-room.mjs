import { Modal } from './modal.mjs'
const modal = Modal()

window.showQuestionResponse = showQuestionResponse
window.handleOpenModalClick = handleOpenModalClick

// Handle do Requests ============================

const doPOSTRequest = async (url, body) => {
        return await fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({ body }) ,
            headers: {
                "Content-Type": "application/json"
            }
        })
}

const doGETRequest = async (url) => {
    return await fetch(url)
}

// Global states =============================

let currentClickedQuestionId = '';
let globalRoomId = '';

// IFFEs ======================================

function defineGlobalRoomId() {
    const url = window.location.href
    const roomId = url.split('/')[4]
    globalRoomId = roomId   
}

async function renderQuestions() {
    const url = `http://https://obscure-coast-27898.herokuapp.com/:3000/questions/${globalRoomId}`

    const response = await doGETRequest(url)
    const questions = await response.json()
    const questionsArray = Object.entries(questions)
    console.log(questionsArray);
    if (questions.alert) { return alert(questions.alert) }

    return questionsArray.forEach((question) => {
        showQuestionOnScreen(question[1])  
    })
}

(async function fillRoomIdButton() {
    defineGlobalRoomId()
    renderQuestions()
    
    const buttonText = document.querySelector('p#room-id')
    
    buttonText.innerHTML = `#${globalRoomId}`

    alert(`Room Id is ${globalRoomId}, use it to enter here`)
}())

// Utils ====================================================

const getQuestionHTML = ({titulo, id, response, readed}) => {
    response = response === '' ? 'No Response to this Question' : response
    
   return `
    <div class="question-content">
        <div class="user">
            <img src="../images/user.svg" alt="user-symbol">
        </div>
        <div class="question">
            <p onclick="showQuestionResponse('${titulo}', '${response}')">
            ${titulo}
            </p>
        </div>
    </div>
    <div class="actions">
        <p class="mark" onclick="handleOpenModalClick('${id}')">
            <img src="../images/check.svg" alt="check-icon">
            Mark as read
        </p>
        <p class="delete" onclick="handleOpenModalClick('${id}', false)">
            <img src="../images/trash.svg" alt="exclude-question-icon">
            Delete 
        </p>
    </div>
    `
}

const showQuestionOnScreen = (question) => {
    const questions = document.querySelector('div.questions')

    const questionsWrapper = document.createElement('div')


     if (question.readed) {
        questionsWrapper.classList.add('read')
    }

    questionsWrapper.classList.add('question-wrapper')
    questionsWrapper.id = `question${question.id}`
    questionsWrapper.innerHTML = getQuestionHTML(question)

    questions.appendChild(questionsWrapper)
}

const innerModalHTML = (check) => {
    const modalTitle = document.querySelector('.modal h2')
    const modalDescription = document.querySelector('.modal p')
    const modalButton = document.querySelector('.modal button')

    if (check) {
        modalTitle.innerHTML = "Mark as readed"
        modalDescription.innerHTML = "Are you sure want to mark as readed this question"
        modalButton.innerHTML = "Mark as readed"
        modalButton.classList.remove('red')
    } else {
        modalTitle.innerHTML = "Delete question"
        modalDescription.innerHTML = "Are you sure want to delete this question"
        modalButton.innerHTML = "yes, delete"
        modalButton.classList.add('red')
    }
}

const setUrl = (event) => {
    const modalButton = document.querySelector('.modal button')

    let action = 'check'

    if (modalButton.classList.contains('red')) {
        action = 'delete'
    }

    const questionId = currentClickedQuestionId
    console.log(currentClickedQuestionId);

    return `http://https://obscure-coast-27898.herokuapp.com/:3000/room/${globalRoomId}/${questionId}/${action}`
}

const deleteQuestion = async () => {
    const questionsContainer = document.querySelector('div.questions')

    questionsContainer.innerHTML = ''
    return await renderQuestions()
}

const setQuestionAsReaded = (question_id) => {
    const questionsWrapper = document.querySelector(`.question-wrapper#question${question_id}`)

    questionsWrapper.classList.add('read')
}

const verify = (action, question_id) => {
    if (action == 'delete') {
        deleteQuestion()
    } else {
        setQuestionAsReaded(question_id)
    }
}

// HTML Iterations ============================================

const form = document.querySelector('.modal form')
const formNewQuestion = document.querySelector('form#new-question')

form.addEventListener('submit', async event => {
    event.preventDefault()
    const url = setUrl()
    const input = document.querySelector('.modal form input')

    const password = input.value

    await doPOSTRequest(url, password).then(async response => {
        const responseFormatted = await response.json()

        if(responseFormatted.error) { return alert('invalid password or question do not exists anymore') }
        verify(responseFormatted.action, responseFormatted.question_id)
    })

    modal.closeActionsModal()
    input.value = ''
})

formNewQuestion.addEventListener('submit', async event => {
    event.preventDefault()

    const textarea = document.querySelector('textarea#question')

    const textareaValue = textarea.value
    const url = `http://https://obscure-coast-27898.herokuapp.com/:3000/new/question`
        
    await doPOSTRequest(url, { textareaValue, globalRoomId }).then(async response => {
        const { question } = await response.json()

        showQuestionOnScreen(question)
    })

    textarea.value = ''

})

const cancelButtonResponse = document.querySelector('.modal-wrapper#response .modal .buttons .button')

const cancelButtonActions = document.querySelector('.modal-wrapper#actions .modal .buttons .button')

cancelButtonResponse.addEventListener('click', () => {
    modal.closeResponseModal()
})

cancelButtonActions.addEventListener('click', () => {
    modal.closeActionsModal()
})

function handleOpenModalClick (id, check = true) {
    currentClickedQuestionId = id
    console.log(currentClickedQuestionId);
    innerModalHTML(check)
    modal.openActionsModal()
}

function showQuestionResponse(titulo, response) {
    const modalTitle = document.querySelector('.modal-wrapper#response h2')
    const modalDescription = document.querySelector('.modal-wrapper#response p')

    modalTitle.innerHTML = titulo
    modalDescription.innerHTML = response
    
    modal.openResponseModal()
}

