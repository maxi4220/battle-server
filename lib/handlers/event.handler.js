"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventHandler = void 0;
const auth_repository_1 = require("../repositories/auth.repository");
class EventHandler {
    constructor() {
        this.authRepository = new auth_repository_1.AuthRepository();
    }
    setupEvents(app) {
        app.get("/users/:id/token/:token", (req, res) => __awaiter(this, void 0, void 0, function* () {
            this.authRepository.validateFBUserToken(req.params.id, req.params.token)
                .then((result) => {
                console.log(result);
                res.json(Object.assign(Object.assign({}, result.data), { accessToken: req.params.token }));
            })
                .catch((error) => {
                console.log(error);
                console.log("no");
                res.json({ fbUser: false });
            });
        }));
        app.post("/users/:id/login", (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.json({ login: this.authRepository.registerLogin(req.body) });
        }));
    }
}
exports.EventHandler = EventHandler;
/*
GGQVliTjBQZA29CUEg3M3FtOUMyMXVadUlzSmtpWTJucUh1TFpoOHN5b3dlenpIcnNwcVJFcjZAwTEp4YUxYblNFUWxDYzRXaWJhU2xEeGF3VGdGNDFLZADFFX3d1bHhhSEg1T1VaLXRZAWHJ1ak8tQlB5TmpEUTd6alg3MXhzVm1XaTJVX0p1OFM4RThHMGpUbmp4d09uVUR0Tk9nYWZA1aW1zbwZDZD
1651183465

let unix_timestamp = 1549312452
// Create a new JavaScript Date object based on the timestamp
// multiplied by 1000 so that the argument is in milliseconds, not seconds.
var date = new Date(unix_timestamp * 1000);
// Hours part from the timestamp
var hours = date.getHours();
// Minutes part from the timestamp
var minutes = "0" + date.getMinutes();
// Seconds part from the timestamp
var seconds = "0" + date.getSeconds();

// Will display time in 10:30:23 format
var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

console.log(formattedTime);
*/ 
