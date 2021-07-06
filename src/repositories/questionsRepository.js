const globalRepository = require('../repositories/globalRepository')

const database = require('../database/config')

class QuestionsRepository extends globalRepository {
    async getAll(room_id) {
        let questions = []
        
        const openedDatabase = await database()

        await openedDatabase.each(`
            SELECT * FROM questions WHERE room = ${room_id}
        `, (error, question) => {
            questions.push(question)
        })
        await openedDatabase.close()
        
        if(!questions) { return false }

        return questions
    }

    async updateReadedValue(question_id) {
        const openedDatabase = await database()

        openedDatabase.exec(`
            UPDATE questions SET readed = true WHERE id = ${question_id}
        `)

        await openedDatabase.close()
    }

    async deleteQuestion(question_id) {
        const openedDatabase = await database()

        await openedDatabase.exec(`
            DELETE FROM questions WHERE id = ${question_id}
        `)

        await openedDatabase.close()
    }

    async createQuestion({titulo, room }) {
        const openedDatabase = await database()
        
        const { lastID } = await openedDatabase.run(`INSERT INTO questions(titulo, room) VALUES ('${titulo}', '${room}')`)

        await openedDatabase.close()

        return lastID
    }
    
}

module.exports = new QuestionsRepository()

