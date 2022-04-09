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
      this.authData.getUser( fbUser.authResponse.userID )
      .then((user: any)=>{
        if ( user.count > 0 ) {
          
          // If the user's token changed, update the user in the DB
          if ( fbUser.authResponse.accessToken !== user[0].access_token) {
            this.authData.updateUser( fbUser )
            .then(()=>{
              // register login into the DB
              this.authData.registerLogin( user[0].id, fbUser.authResponse.userID )
              .then((login)=>{
                if ( login.count === 0 ) {
                  return false
                }
              })
              .catch(err=>{
                console.log(err)
              })
            })
            .catch(err=>{
              console.log(err)
            })
          }
        } else {
        
          this.authData.createUser( fbUser )
          .then((user: any)=>{
            // register login into the DB
            if ( user.count === 1) {
              this.authData.registerLogin( user[0].id, fbUser.authResponse.userID )
              .then((login)=>{
                if ( login.count === 0 ) {
                  return false
                }
              })
              .catch(err=>{
                console.log(err)
                return false
              })
            }
          })
          .catch(err=>{
            console.log(err)
            return false
          })
        }
      })
      .catch(err=>{
        console.log(err);
        return false
      })      
    } catch(err) {
      console.log(err);
      return false
    }
  }
}