import axios from "axios";
import { of } from "rxjs";
import { AuthData } from "../data/auth.data";
import { SqlData } from "../data/sql.data";
import { FacebookUser } from "../models/facebookUser";
import { User } from "../models/user";

export class AuthRepository {
  authData: AuthData = new AuthData();
  constructor(){ }
  validateFBUserToken(id: string, accessToken: string){
    let url = `https://graph.facebook.com/${id}?access_token=${accessToken}`
    console.log(url)
    return axios.get(url);
  }

  registerLogin( fbUser: FacebookUser){
    // if true, (1) register login and return stats
    // if false, (2) create user then execute step (1)
    try {
      
      const user = this.authData.getUser( fbUser.authResponse.userID );
        if ( user.count > 0 ) {
          
          // If the user's token changed, update the user in the DB
          if ( fbUser.authResponse.accessToken !== user[0].access_token) {
            this.authData.updateUser( fbUser, (result) => {
              this.authData.registerLogin( result[0].id, fbUser.authResponse.userID );
            } )
          }
        } else {
        
          this.authData.createUser( fbUser, (result) => {
            if ( result.count === 1) {
              this.authData.registerLogin( result[0].id, fbUser.authResponse.userID );              
            }
          })
        }
    
    } catch(err) {
      console.log(err);
      return false
    }
  }
}