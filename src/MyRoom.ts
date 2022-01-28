// MyRoom.ts
import { Room } from "@colyseus/core";
import { MyState } from "./MyState";

export class MyRoom extends Room<MyState> {
    onCreate() {
        this.setState(new MyState());
    }
}