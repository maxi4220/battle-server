import { FacebookUser } from "../models/facebookUser";
export declare class AuthData {
    getUser(fbUserID: string): any;
    createUser(fbUser: FacebookUser, callback: Function): void;
    updateUser(fbUser: FacebookUser, callback: Function): void;
    registerLogin(userID: string, fbUserID: string): void;
}
