"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyRoom = void 0;
// MyRoom.ts
const colyseus_1 = require("colyseus");
const MyState_1 = require("./MyState");
const axios_1 = __importDefault(require("axios"));
class MyRoom extends colyseus_1.Room {
    onCreate() {
        this.setState(new MyState_1.MyState());
    }
    // Authorize client based on provided options before WebSocket handshake is complete
    onAuth(client, fbUser, request) {
        console.log(fbUser);
        // TODO: VALIDATE THE TOKEN SOMEWHERE ELSE. HERE THE TOKEN MUST HAVE BEEN VALIDATED
        axios_1.default.get(`https://graph.facebook.com/${fbUser.authResponse.userID}?access_token=${fbUser.authResponse.accessToken}`)
            .then((result) => {
            console.log("ok");
            return true;
        })
            .catch((error) => {
            console.log("no");
            return false;
        });
        return true;
    }
    // When client successfully join the room
    onJoin(client, options, auth) { }
    // When a client leaves the room
    onLeave(client, consented) { }
    // Cleanup callback, called after there are no more clients in the room. (see `autoDispose`)
    onDispose() { }
}
exports.MyRoom = MyRoom;
