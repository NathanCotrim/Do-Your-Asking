const questionController = require('./controllers/questionController')
const roomController = require('./controllers/roomController')

const { Router } = require('express')

const routes = Router()

// Rendering Views ===================
routes.get("/", (req, res) => {
    res.render('views/home')
})
routes.get("/new-room", (req, res) => {
    res.render('views/new-room')
})

routes.get("/room/:room_id", roomController.validRoomId)
routes.get("/questions/:room_id", questionController.listAllQuestions)

// API
routes.post('/room/:room_id/:question_id/:action', questionController.validAction)
routes.post('/room/valid-access', roomController.validAccess)
routes.post('/new/question', questionController.create)
routes.post('/new/room', roomController.create)

module.exports = routes