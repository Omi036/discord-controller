// Creation and exportation of the socket client
const WSocket = new WebSocket("ws:localhost:5017");

export const AddSocketListener = (header, callback) => {
    WSocket.addEventListener("message", (message) => {
        message = JSON.parse(message.data)

        if(message.header !== header) return
        callback(message.content)
    })
}

export const SendMessage = (header, content) => {
    const message = JSON.stringify({header:header, content:content||{}})
    WSocket.send(message)
}

// Some handlings
WSocket.addEventListener("open", () => console.log("WebSocket connected"))
WSocket.addEventListener("error", (e) => console.error(e) )