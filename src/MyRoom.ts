// MyRoom.ts
import { Room, Client } from "colyseus";
import { MyState } from "./MyState";
import http from "http";
import axios from "axios";
import { FacebookUser } from "./models/facebookUser";

export class MyRoom extends Room<MyState> {
    onCreate() {
        this.setState(new MyState());
    }
    // Authorize client based on provided options before WebSocket handshake is complete
    onAuth (client: Client, fbUser: FacebookUser, request: http.IncomingMessage) {
        console.log(fbUser);
        // TODO: VALIDATE THE TOKEN SOMEWHERE ELSE. HERE THE TOKEN MUST HAVE BEEN VALIDATED
        axios.get(`https://graph.facebook.com/${fbUser.authResponse.userID}?access_token=${fbUser.authResponse.accessToken}`)
            .then( ( result ) => {
                console.log("ok");
                return true;
            })
            .catch( ( error ) => {
                console.log("no");
                return false;
            });
            return true;
    }

    // When client successfully join the room
    onJoin (client: Client, options: any, auth: any) { }

    // When a client leaves the room
    onLeave (client: Client, consented: boolean) { }

    // Cleanup callback, called after there are no more clients in the room. (see `autoDispose`)
    onDispose () { }
}