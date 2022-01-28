// Colyseus + Express
import { Server } from "@colyseus/core";
import { uWebSocketsTransport } from "@colyseus/uwebsockets-transport";
const port = Number(process.env.port) || 3000;

const gameServer = new Server({
  transport: new uWebSocketsTransport({
    /* options */
  })
});

gameServer.listen(port);