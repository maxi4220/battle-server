// MyRoom.ts
import { Room, Client } from "colyseus";
import { MyState } from "./MyState";
import http from "http";
import { FacebookUser } from "./models/facebookUser";

export class MyRoom extends Room<MyState> {
  onCreate() {
    this.setState(new MyState());
  }
  // Authorize client based on provided options before WebSocket handshake is complete
  onAuth (client: Client, fbUser: FacebookUser, request: http.IncomingMessage) { 
    if ( fbUser.authResponse &&
         fbUser.authResponse.accessToken &&
         fbUser.authResponse.userID ){
      return true;
    } else {
      return false;
    }
  }
  
  // When client successfully join the room
  onJoin (client: Client, options: any, auth: any) { }
  
  // When a client leaves the room
  onLeave (client: Client, consented: boolean) { }
  
  // Cleanup callback, called after there are no more clients in the room. (see `autoDispose`)
  onDispose () { }
}