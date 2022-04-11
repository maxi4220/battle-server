// Colyseus + Express
require('dotenv').config({path: __dirname + '/.env'})
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { createServer } from "http";
import { Server } from "@colyseus/core";
import { WebSocketTransport } from "@colyseus/ws-transport"
import { MyRoom } from "./MyRoom";
import { EventHandler } from "./handlers/event.handler";

const app = express();
const server = createServer(app); // create the http server manually

app.use(cors({
  origin: "*",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = Number(process.env.port) || 3000;

const gameServer = new Server({
  transport: new WebSocketTransport({
      server // provide the custom server for `WebSocketTransport`
  })
});

gameServer.listen(port);

const eventHandler = new EventHandler();
eventHandler.setupEvents(app);

// Define "chat" room
gameServer.define("myRoom", MyRoom)
  .on("create", (room) => console.log("room created:", room.roomId))
  .on("dispose", (room) => console.log("room disposed:", room.roomId))
  .on("join", (room, client) => console.log(client.id, "joined", room.roomId))
  .on("leave", (room, client) => console.log(client.id, "left", room.roomId));

console.log("Server started at port: "+port.toString())