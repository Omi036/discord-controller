const { HTTPConfig, StartHTTPServer } = require("./src/http")
const { WSConfig, StartWSServer } = require("./src/socket")

StartHTTPServer()
StartWSServer()