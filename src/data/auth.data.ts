import { Result } from "odbc";
import { of } from "rxjs";
import { FacebookUser } from "../models/facebookUser";
import Utilities from "../utilities";
import { SqlData } from "./sql.data";

export class AuthData {
  
  async getUser( fbUserID: string ) {
    const sqlData = new SqlData();
    const cnn = await sqlData.connect();
    return await cnn.query("select * from users where fb_user_id=?", [fbUserID])
  }
  async createUser( fbUser: FacebookUser){

    const sqlData = new SqlData();
    const cnn = await sqlData.connect()
    return await cnn.query(`insert into users (name, fb_user_id, access_token, expires_in) values(?,?,?,?)`, 
      [ fbUser.authResponse.name, fbUser.authResponse.userID, fbUser.authResponse.accessToken,fbUser.authResponse.expiresIn])
      .then(async ()=>{
        return await this.getUser(fbUser.authResponse.userID)
      })
      .catch(err=>{
        console.log(err)
      })

  }
  async updateUser( fbUser: FacebookUser){

    const sqlData = new SqlData();
    const cnn = await sqlData.connect()
    return await cnn.query(`update users set name=?, access_token=?, updated_at=?, expires_in=?`, 
      [ fbUser.authResponse.name, fbUser.authResponse.accessToken, Utilities.DateNow(), fbUser.authResponse.expiresIn])
      .then(async ()=>{
        return await this.getUser(fbUser.authResponse.userID)
      })
      .catch(err=>{
        console.log(err)
      })

  }
  async registerLogin( userID: string, fbUserID: string){
      const sqlData = new SqlData();
      const cnn = await sqlData.connect()

      // Check if there is a record already in logins table
      const login: Result<Login> = await cnn.query("select * from logins where user_id=?", [userID]);
      
      if ( login.count > 0 ) {
        return await cnn.query(`update logins set login_at=?, login_count=?`, 
        //CONTINUE WITH DATE ISSUE ********************************************************************************************************************************************************************************
        [ new Date().toISOString().slice(0, 19).replace('T', ' '), login[0].login_count + 1 ])
      } else {
        return await cnn.query(`insert into logins 
          (user_id) values(?)`, 
          [ userID ])
      }
  }

}

class Login {
  id: string
  user_id: string
  login_at: number
  login_count: number

}