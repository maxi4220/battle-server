import axios from "axios";
import { FacebookUser } from "../models/facebookUser";

export class AuthRepository {
  constructor(){
  }
  validateFBUserToken(id: string, accessToken: string){
    let url = `https://graph.facebook.com/${id}?access_token=${accessToken}`
    console.log(url)
    return axios.get(url);
  }
}