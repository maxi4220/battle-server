import {v4 as uuidv4} from 'uuid';
import { of } from "rxjs";
import { FacebookUser } from "../models/facebookUser";
import Utilities from "../utilities";
import { SqlData } from "./sql.data";

export class AuthData {
  
  getUser( fbUserID: string ):any {
    const sqlData = new SqlData();
    const cnn =  sqlData.connect();
    cnn.query("select * from users where fb_user_id=?", [fbUserID]
    , (error, result, fields) => {
      if(error) {
        console.error(error);
        return null;
      } else {
        return result;
      }
    })
  }
  createUser( fbUser: FacebookUser, callback: Function){

    const sqlData = new SqlData();
    const cnn = sqlData.connect()
    cnn.query(`insert into users (id, name, fb_user_id, access_token, expires_in) values(?,?,?,?,?)`, 
      [ uuidv4(), fbUser.authResponse.name, fbUser.authResponse.userID, fbUser.authResponse.accessToken,fbUser.authResponse.expiresIn]
      , (error, result, fields) => {
        if(error) {
          console.error(error);
          return callback(null);
        } else {
          return callback(this.getUser(fbUser.authResponse.userID));
        }
      })
      
  }
  updateUser( fbUser: FacebookUser, callback: Function){

    const sqlData = new SqlData();
    const cnn = sqlData.connect()
    cnn.query(`update users set name=?, access_token=?, updated_at=?, expires_in=?`, 
      [ fbUser.authResponse.name, fbUser.authResponse.accessToken, Utilities.DateNow(), fbUser.authResponse.expiresIn],
      (error, result, fields) => {
        if(error) {
          console.error(error);
        } else {
          callback(result);
        }
        
      })

  }
  registerLogin( userID: string, fbUserID: string){
      const sqlData = new SqlData();
      const cnn = sqlData.connect()

      // Check if there is a record already in logins table
      cnn.query("select * from logins where user_id=?", [userID], 
        (error, result, fields) => {
          if(error) {
            console.error(error);
          } else {
            if ( result.count > 0 ) {
              cnn.query(`update logins set login_at=?, login_count=?`, 
              [ Utilities.DateNow(), result[0].login_count + 1 ])
            } else {
              cnn.query(`insert into logins (id, user_id) values(?,?)`, [ uuidv4(), userID ])
            }
          }          
      });
      

  }

}

class Login {
  id: string
  user_id: string
  login_at: number
  login_count: number

}