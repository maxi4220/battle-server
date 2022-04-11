"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Colyseus + Express
require('dotenv').config({ path: __dirname + '/.env' });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const http_1 = require("http");
const core_1 = require("@colyseus/core");
const ws_transport_1 = require("@colyseus/ws-transport");
const MyRoom_1 = require("./MyRoom");
const event_handler_1 = require("./handlers/event.handler");
const app = express_1.default();
const server = http_1.createServer(app); // create the http server manually
app.use(cors_1.default({
    origin: "https://localhost:8080",
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
const port = Number(process.env.port) || 3000;
const gameServer = new core_1.Server({
    transport: new ws_transport_1.WebSocketTransport({
        server // provide the custom server for `WebSocketTransport`
    })
});
gameServer.listen(port);
const eventHandler = new event_handler_1.EventHandler();
eventHandler.setupEvents(app);
// Define "chat" room
gameServer.define("myRoom", MyRoom_1.MyRoom)
    .on("create", (room) => console.log("room created:", room.roomId))
    .on("dispose", (room) => console.log("room disposed:", room.roomId))
    .on("join", (room, client) => console.log(client.id, "joined", room.roomId))
    .on("leave", (room, client) => console.log(client.id, "left", room.roomId));
