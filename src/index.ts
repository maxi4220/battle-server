// Colyseus + Express
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { createServer } from "http";
import { Server } from "@colyseus/core";
import { WebSocketTransport } from "@colyseus/ws-transport"
import { MyRoom } from "./MyRoom";

const app = express();
const server = createServer(app); // create the http server manually

app.use(cors({
  origin: "https://localhost:8080",
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

app.post("/checkToken", (req, res) => {
  console.log(req.body);
  res.json({msg: 'This is CORS-enabled for all origins!'});
});

// Define "chat" room
gameServer.define("myRoom", MyRoom)
  .on("create", (room) => console.log("room created:", room.roomId))
  .on("dispose", (room) => console.log("room disposed:", room.roomId))
  .on("join", (room, client) => console.log(client.id, "joined", room.roomId))
  .on("leave", (room, client) => console.log(client.id, "left", room.roomId));