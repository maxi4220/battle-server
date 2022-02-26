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