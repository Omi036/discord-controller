// Creation and exportation of the socket client
export const WSocket = new WebSocket("ws:localhost:5017");

// Some handlings
WSocket.addEventListener("open", () => console.log("WebSocket connected"))
WSocket.addEventListener("error", (e) => console.error(e) )