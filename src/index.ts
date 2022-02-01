// Colyseus + Express
import { Server } from "@colyseus/core";
import { User, FriendRequest, verifyToken } from "@colyseus/social";
import { uWebSocketsTransport } from "@colyseus/uwebsockets-transport";
import { MyRoom } from "./MyRoom";

const port = Number(process.env.port) || 3000;

const gameServer = new Server({
  transport: new uWebSocketsTransport({
    /* options */
  })
});

gameServer.listen(port);


// Define "chat" room
gameServer.define("myRoom", MyRoom)
  .on("create", (room) => console.log("room created:", room.roomId))
  .on("dispose", (room) => console.log("room disposed:", room.roomId))
  .on("join", (room, client) => console.log(client.id, "joined", room.roomId))
  .on("leave", (room, client) => console.log(client.id, "left", room.roomId));;
