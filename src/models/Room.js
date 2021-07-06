class Room {
    id;
    password;
    
    constructor(password) {
        this.id = this.#generateId()
        this.password = password
    }

    #generateId() {
        let generatedId = ''; 

        for (let i = 0; i < 6; i++) {
            const number = Math.floor(Math.random() * 10)
            generatedId += number;
        }

        return generatedId
    }
    
    // async #verifyIdExists(generatedId) {
    //     const room = await globalRepository.findById('rooms', generatedId)

    //     if(room) { return true }

    //     return false
    // }

}

module.exports = Room

console.log(new Room('123'));