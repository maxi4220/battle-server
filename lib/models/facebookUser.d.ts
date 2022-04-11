export declare class FacebookUser {
    authResponse: AuthResponse;
    status: string;
    constructor();
}
export declare class AuthResponse {
    accessToken: string;
    data_access_expiration_time: number;
    expiresIn: number;
    signedRequest: string;
    userID: string;
    name: string;
}
