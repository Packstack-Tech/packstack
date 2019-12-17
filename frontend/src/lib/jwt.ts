import jwtDecode from 'jwt-decode';

import { getString, setString, removeItem } from './local-storage';

const AUTH_TOKEN = 'auth_token';

export interface TokenInterface {
    getString: () => string;
    getDecoded: () => DecodedToken | null;
    setToken: (token: string) => void;
    revokeToken: () => void;
}

export interface DecodedToken {
    sub: string;
    jti: string;
    iat: number;
    tid: string;
    displayName: string;
    firstName: string;
    lastName: string;
    nbf: number;
    exp: number;
    iss: string;
    aud: string;
}

export default class Token implements TokenInterface {
    private token: string;
    private tokenPayload: DecodedToken | null;

    constructor() {
        const t = getString(AUTH_TOKEN, '');
        this.setTokenIfValid(t);
    }

    revokeToken() {
        this.token = '';
        this.tokenPayload = null;
        removeItem(AUTH_TOKEN);
    }

    setToken(token: string) {
        this.setTokenIfValid(token);
        setString(AUTH_TOKEN, token);
    }

    getString(): string {
        return this.token;
    }

    getDecoded(): DecodedToken | null {
        return this.tokenPayload;
    }

    private setTokenIfValid(t: string) {
        try {
            this.tokenPayload = jwtDecode(t);
            this.token = t;
        } catch (e) {
            this.tokenPayload = null;
            this.token = '';
        }
    }
}