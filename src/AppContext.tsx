import * as React from 'react';
import { default as Api } from 'lib/api';
import Token, { DecodedToken, TokenInterface } from 'lib/jwt';
import { User } from 'types/user';
import { Category } from "types/category";

export interface AppProviderState {
    api: Api;
    jwt: {
        decoded: DecodedToken | null;
        auth_token: string;
    },
    userInfo: User | null;
    categories: Category[];
    setAuthToken: (authToken: string) => Promise<void>;
    fetchUser: () => void;
    logout: () => void;
}

interface AppProviderProps {
    token?: TokenInterface;
    api?: Api;
}

export interface AppState extends AppProviderState {
    isBooting: boolean;
}

const EmptyAppState: AppState = {
    api: new Api(new Token()),
    isBooting: false,
    jwt: {
        decoded: new Token().getDecoded(),
        auth_token: ''
    },
    userInfo: null,
    categories: [],
    fetchUser: () => null,
    logout: () => null,
    setAuthToken: () => Promise.resolve()
};

const AppContext = React.createContext<AppState>(EmptyAppState);
const Consumer = AppContext.Consumer;

export class AppProvider extends React.Component<AppProviderProps, AppProviderState> {
    token: TokenInterface;

    constructor(props: AppProviderProps) {
        super(props);
        this.token = props.token != null ? props.token : new Token();
        this.state = {
            api: new Api(new Token()),
            jwt: {
                decoded: this.token.getDecoded(),
                auth_token: this.token.getString()
            },
            userInfo: null,
            categories: [],
            setAuthToken: this.setAuthToken,
            fetchUser: this.fetchUser,
            logout: this.logout
        };
    }

    componentDidMount() {
        if (this.state.jwt.auth_token.length > 0) {
            this.fetchUser();
        }
    }

    setAuthToken = (authToken: string): Promise<void> => {
        this.token.setToken(authToken);
        this.setState({ api: new Api(new Token()) });
        return this.fetchUser();
    };

    fetchUser = async () => {
        await this.state.api.UserService.status()
            .then(userInfo => {
                const { categories } = userInfo;
                this.setState({ userInfo, categories });
            })
            .catch(err => this.logout());
    };

    logout = () => {
        this.token.revokeToken();
        this.setState({
            userInfo: null,
            jwt: { decoded: null, auth_token: '' }
        }, () => window.location.assign('/'));
    };

    render() {
        const { jwt, userInfo } = this.state;
        const isBooting = jwt.auth_token.length > 0 && userInfo == null;
        const appState: AppState = { ...this.state, isBooting };

        return (
            <AppContext.Provider value={appState}>
                {this.props.children}
            </AppContext.Provider>
        );
    }
}

export { AppContext };
export default Consumer;
