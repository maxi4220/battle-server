import { AuthData } from "../data/auth.data";
import { FacebookUser } from "../models/facebookUser";
export declare class AuthRepository {
    authData: AuthData;
    constructor();
    validateFBUserToken(id: string, accessToken: string): Promise<import("axios").AxiosResponse<any, any>>;
    registerLogin(fbUser: FacebookUser): boolean;
}
