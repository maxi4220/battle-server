"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventHandler = void 0;
class EventHandler {
    static setupEvents(app) {
        app.post("/checkToken", (req, res) => {
            console.log(req.body);
            res.json({ msg: 'This is CORS-enabled for all origins!' });
        });
    }
}
exports.EventHandler = EventHandler;
