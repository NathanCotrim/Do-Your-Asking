const enterRoomForm = document.querySelector('form#room-code')

enterRoomForm.addEventListener('submit', async e => {
    e.preventDefault()
    const input = document.querySelector('form input#room-id')

    const room_id = input.value

    if(!room_id) { return alert('Preencha o campo')}

    const url = 'http://localhost:3000/room/valid-access'

    await fetch(url, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({ room_id }) ,
        headers: {
            "Content-Type": "application/json"
        }
    }).then(async response => {
        const responseFormatted = await response.json()
        console.log(responseFormatted);
        if(responseFormatted.error) { return alert(responseFormatted.error) }

        window.location.href = `/room/${responseFormatted}`
    })
    
})