// MyRoom.ts
import { Room, Client } from "colyseus";
import { MyState } from "./MyState";
import http from "http";

export class MyRoom extends Room<MyState> {
    onCreate() {
        this.setState(new MyState());
    }
    // Authorize client based on provided options before WebSocket handshake is complete
    onAuth (client: Client, options: any, request: http.IncomingMessage) {
        console.log(options.accessToken);
        return true;
    }

    // When client successfully join the room
    onJoin (client: Client, options: any, auth: any) { }

    // When a client leaves the room
    onLeave (client: Client, consented: boolean) { }

    // Cleanup callback, called after there are no more clients in the room. (see `autoDispose`)
    onDispose () { }
}