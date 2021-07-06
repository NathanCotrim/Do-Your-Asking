const questionsRepository = require('../repositories/questionsRepository')
const globalRepository = require('../repositories/globalRepository')

const Question = require('../models/Question')

class questionController {
    async validAction(req, res) {
        const password = req.body.body
        const { action, room_id, question_id } = req.params

        const room = await globalRepository.findById('rooms', room_id)

        if (!room || room.password != password) {
            return res.json({
                error: 'incorrect password'
            })
        }

        const question = await globalRepository.findById('questions', question_id)

        if (!question) {
            return res.json({
                error: 'question not founded at our database'
            })
        }

        if (action == "check") {
            questionsRepository.updateReadedValue(question_id)
        } else {
            await questionsRepository.deleteQuestion(question_id)
        }

        return res.json({
            action,
            question_id
        })
    }

    async listAllQuestions(req, res) {
        const { room_id } = req.params

        const questions = await questionsRepository.getAll(room_id)

        if (!questions) {
            return res.json({
                alert: 'no questions on this room'
            })
        }
        return res.json(questions)
    }

    async create(req, res) {
        const titulo = req.body.body.textareaValue
        const room = req.body.body.globalRoomId
        
        let question = Object.assign({
            ...new Question(titulo, room)
        })

        const lastId = await questionsRepository.createQuestion(question)

        question.id = lastId

        return res.json({ question })
    }
}

module.exports = new questionController()