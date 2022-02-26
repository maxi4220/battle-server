import axios from "axios";
import { FacebookUser } from "../models/facebookUser";

export class AuthRepository {
  constructor(){
  }
  validateFBUserToken(id: string, accessToken: string){
    return axios.get(`https://graph.facebook.com/${id}?access_token=${accessToken}`);
  }
}