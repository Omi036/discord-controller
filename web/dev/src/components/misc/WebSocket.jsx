// Creation and exportation of the socket client
export const WSocket = new WebSocket("ws:localhost:5017");

// A listener when we receive the full info
WSocket.addEventListener("message", (message) => {
    message = JSON.parse(message.data);

    // We will storage them in sessionstorage, one key for every category
    if(message.header !== "full_info") return
    sessionStorage.setItem("client", JSON.stringify(message.content.client))
    sessionStorage.setItem("servers", JSON.stringify(message.content.servers))
    sessionStorage.setItem("channels", JSON.stringify(message.content.channels))
    sessionStorage.setItem("messages", JSON.stringify(message.content.messages))
    sessionStorage.setItem("users", JSON.stringify(message.content.users))
    sessionStorage.setItem("commands", JSON.stringify(message.content.commands))
    sessionStorage.setItem("misc", JSON.stringify(message.content.misc))
})

// Some handlings
WSocket.addEventListener("open", () => console.log("WebSocket connected"))
WSocket.addEventListener("error", (e) => console.error(e) )