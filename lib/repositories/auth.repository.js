"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepository = void 0;
const axios_1 = __importDefault(require("axios"));
const auth_data_1 = require("../data/auth.data");
class AuthRepository {
    constructor() {
        this.authData = new auth_data_1.AuthData();
    }
    validateFBUserToken(id, accessToken) {
        let url = `https://graph.facebook.com/${id}?access_token=${accessToken}`;
        console.log(url);
        return axios_1.default.get(url);
    }
    registerLogin(fbUser) {
        // if true, (1) register login and return stats
        // if false, (2) create user then execute step (1)
        try {
            const user = this.authData.getUser(fbUser.authResponse.userID);
            if (user.count > 0) {
                // If the user's token changed, update the user in the DB
                if (fbUser.authResponse.accessToken !== user[0].access_token) {
                    this.authData.updateUser(fbUser, (result) => {
                        this.authData.registerLogin(result[0].id, fbUser.authResponse.userID);
                    });
                }
            }
            else {
                this.authData.createUser(fbUser, (result) => {
                    if (result.count === 1) {
                        this.authData.registerLogin(result[0].id, fbUser.authResponse.userID);
                    }
                });
            }
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }
}
exports.AuthRepository = AuthRepository;
