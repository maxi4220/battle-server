import { FacebookUser } from "../models/facebookUser";
import { AuthRepository } from "../repositories/auth.repository";

export class EventHandler {
  authRepository: AuthRepository = new AuthRepository();
  
  setupEvents(app: any) {
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
  }
}

/*
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