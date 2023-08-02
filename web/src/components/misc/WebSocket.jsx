const WSocketPort = import.meta.env.VITE_SRVPORT ?? 5017

console.log(WSocketPort);

const WSocket = new WebSocket(`ws:localhost:${WSocketPort}`);

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
WSocket.addEventListener("error", (error) => console.error(error) )
