const globalRepository = require('../repositories/globalRepository')

const database = require('../database/config')

class RoomsRepository extends globalRepository {
    async createRoom({id, password}) {
        const openedDatabase = await database()
        
        await openedDatabase.exec(`
            INSERT INTO rooms VALUES(${id}, ${password})
        `)

        await openedDatabase.close()

        return
    }
}


module.exports = new RoomsRepository()