/// <reference types="node" />
import { Room, Client } from "colyseus";
import { MyState } from "./MyState";
import http from "http";
import { FacebookUser } from "./models/facebookUser";
export declare class MyRoom extends Room<MyState> {
    onCreate(): void;
    onAuth(client: Client, fbUser: FacebookUser, request: http.IncomingMessage): boolean;
    onJoin(client: Client, options: any, auth: any): void;
    onLeave(client: Client, consented: boolean): void;
    onDispose(): void;
}
