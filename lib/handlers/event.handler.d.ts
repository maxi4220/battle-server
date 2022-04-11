import { AuthRepository } from "../repositories/auth.repository";
import * as core from 'express-serve-static-core';
export declare class EventHandler {
    authRepository: AuthRepository;
    setupEvents(app: core.Express): void;
}
