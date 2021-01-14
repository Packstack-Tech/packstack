import { WeightUnit } from "enums";
import { User } from '../user';

export interface UserService {
    status: Status;
    login: Login;
    register: Register;
    update: Update;
    requestReset: RequestReset;
    resetPassword: ResetPassword;
}

export interface AuthToken {
    authToken: string;
}

export interface Status {
    (): Promise<User>;
}

export interface Login {
    (emailOrUsername: string, password: string): Promise<AuthToken>;
}

export interface Register {
    (username: string, password: string, email: string): Promise<AuthToken>;
}

export interface Update {
    (username: string, default_weight_unit: WeightUnit | string): Promise<User>;
}

export interface RequestReset {
    (email: string): Promise<null>;
}

export interface ResetPassword {
    (callbackId: string, password: string): Promise<null>;
}
