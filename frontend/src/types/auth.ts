import { backend } from 'wailsjs/go/models';

export type AuthUser = backend.User;
export type AuthMode = 'login' | 'register';

export interface AuthStatus {
    message: string;
    isError: boolean;
}

