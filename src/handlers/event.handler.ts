import { FacebookUser } from "../models/facebookUser";
import { AuthRepository } from "../repositories/auth.repository";
import * as core from 'express-serve-static-core';

export class EventHandler {
  authRepository: AuthRepository = new AuthRepository();
  
  setupEvents(app: core.Express) {
    app.get("/users/:id/token/:token", async (req, res) => {
      this.authRepository.validateFBUserToken(req.params.id, req.params.token)
      .then( ( result ) => {
        console.log(result);
        res.json(
          {
            ...result.data, 
            accessToken: req.params.token
          });
      })
      .catch( ( error ) => {
        console.log(error)
        console.log("no");
        res.json({fbUser: false});
      });      
    });

    app.post("/users/:id/login", async (req, res) => {
      res.json({login: this.authRepository.registerLogin( req.body ) })
    });
  }
}

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