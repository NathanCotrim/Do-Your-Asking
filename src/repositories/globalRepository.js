const database = require('../database/config')

class GlobalRepository {
    static async findById(table, id) {
        const openedDatabase = await database()
        const room = await openedDatabase.get(`
            SELECT *
            FROM ${table}
            WHERE id = ${id} 
        `)

        await openedDatabase.close()

        if (!room) {
            return false
        }

        return room
    }
}

module.exports = GlobalRepository