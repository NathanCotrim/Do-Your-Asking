const globalRepository = require('../repositories/globalRepository')

const Room = require('../models/Room')

const roomsRepository = require('../repositories/roomsRepository')

class roomController {
    async validRoomId(req, res) {
        const { room_id } = req.params

        const room = await globalRepository.findById('rooms', room_id)
        
        if (!room.id) {
            return res.render('views/room-not-found')
        }

        return res.render('views/questions-room')
    }

    async validAccess(req, res) {
        const { room_id } = req.body

        const room = await globalRepository.findById('rooms', room_id)

        if (!room.id) {
            return res.json({
                error: 'room not founded'
            })
        }

        return res.json(room_id)
    }

    async create(req, res) {
        const { password } = req.body

        const modelRoom = new Room(password)

        const room = Object.assign({
            ...modelRoom
        })

        await roomsRepository.createRoom(room)

        return res.redirect(`/room/${room.id}`)
    }
}

module.exports = new roomController()