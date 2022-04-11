"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyRoom = void 0;
// MyRoom.ts
const colyseus_1 = require("colyseus");
const MyState_1 = require("./MyState");
class MyRoom extends colyseus_1.Room {
    onCreate() {
        this.setState(new MyState_1.MyState());
    }
    // Authorize client based on provided options before WebSocket handshake is complete
    onAuth(client, fbUser, request) {
        if (fbUser.authResponse &&
            fbUser.authResponse.accessToken &&
            fbUser.authResponse.userID) {
            return true;
        }
        else {
            return false;
        }
    }
    // When client successfully join the room
    onJoin(client, options, auth) { }
    // When a client leaves the room
    onLeave(client, consented) { }
    // Cleanup callback, called after there are no more clients in the room. (see `autoDispose`)
    onDispose() { }
}
exports.MyRoom = MyRoom;
