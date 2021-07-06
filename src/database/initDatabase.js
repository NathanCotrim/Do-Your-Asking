const database = require('./config');

const DatabaseCreateTables = {
    async init() {
        const openedDatabase = await database()

        await openedDatabase.exec(`CREATE TABLE rooms(
            id TEXT PRIMARY KEY,
            password TEXT(8)
        )`)

        await openedDatabase.exec(`CREATE TABLE questions(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT(80) NOT NULL,
            readed BOOLEAN DEFAULT false,
            response TEXT(200) DEFAULT '', 
            room TEXT NOT NULL,
            CONSTRAINT Fk_room_id FOREIGN KEY (room) REFERENCES rooms(id) ON DELETE CASCADE
        )`)

        await openedDatabase.close()
    }
}

DatabaseCreateTables.init()



