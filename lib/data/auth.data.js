"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthData = void 0;
const uuid_1 = require("uuid");
const utilities_1 = __importDefault(require("../utilities"));
const sql_data_1 = require("./sql.data");
class AuthData {
    getUser(fbUserID) {
        const sqlData = new sql_data_1.SqlData();
        const cnn = sqlData.connect();
        cnn.query("select * from users where fb_user_id=?", [fbUserID], (error, result, fields) => {
            if (error) {
                console.error(error);
                return null;
            }
            else {
                return result;
            }
        });
    }
    createUser(fbUser, callback) {
        const sqlData = new sql_data_1.SqlData();
        const cnn = sqlData.connect();
        cnn.query(`insert into users (id, name, fb_user_id, access_token, expires_in) values(?,?,?,?,?)`, [uuid_1.v4(), fbUser.authResponse.name, fbUser.authResponse.userID, fbUser.authResponse.accessToken, fbUser.authResponse.expiresIn], (error, result, fields) => {
            if (error) {
                console.error(error);
                return callback(null);
            }
            else {
                return callback(this.getUser(fbUser.authResponse.userID));
            }
        });
    }
    updateUser(fbUser, callback) {
        const sqlData = new sql_data_1.SqlData();
        const cnn = sqlData.connect();
        cnn.query(`update users set name=?, access_token=?, updated_at=?, expires_in=?`, [fbUser.authResponse.name, fbUser.authResponse.accessToken, utilities_1.default.DateNow(), fbUser.authResponse.expiresIn], (error, result, fields) => {
            if (error) {
                console.error(error);
            }
            else {
                callback(result);
            }
        });
    }
    registerLogin(userID, fbUserID) {
        const sqlData = new sql_data_1.SqlData();
        const cnn = sqlData.connect();
        // Check if there is a record already in logins table
        cnn.query("select * from logins where user_id=?", [userID], (error, result, fields) => {
            if (error) {
                console.error(error);
            }
            else {
                if (result.count > 0) {
                    cnn.query(`update logins set login_at=?, login_count=?`, [utilities_1.default.DateNow(), result[0].login_count + 1]);
                }
                else {
                    cnn.query(`insert into logins (id, user_id) values(?,?)`, [uuid_1.v4(), userID]);
                }
            }
        });
    }
}
exports.AuthData = AuthData;
class Login {
}
