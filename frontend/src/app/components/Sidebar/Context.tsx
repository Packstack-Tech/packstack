import React, { createContext, useContext, useReducer, Dispatch, Reducer, } from 'react';

interface Actions {
    type: string;
    value?: any;
}

interface SidebarProps {
    show: boolean;
    title: string;
    content: JSX.Element | null;
}

interface SidebarProviderProps {
    reducer: Reducer<SidebarProps, Actions>;
    initState: SidebarProps;
}

interface InitContextProps {
    state: SidebarProps;
    dispatch: Dispatch<Actions>;
}

export const SidebarContext = createContext({} as InitContextProps);
export const SidebarProvider: React.FC<SidebarProviderProps> = ({ reducer, initState, children }) => {
    const [state, dispatch] = useReducer(reducer, initState);
    const value = { state, dispatch };
    return (
        <SidebarContext.Provider value={value}>
            {children}
        </SidebarContext.Provider>
    );
};
export const useSidebar = () => useContext(SidebarContext);

const SidebarController: React.FC = ({ children }) => {
    const initState: SidebarProps = {
        show: false,
        title: '',
        content: null
    };

    const reducer: Reducer<SidebarProps, Actions> = (state, action) => {
        switch (action.type) {
            case 'setShow':
                return {
                    ...state,
                    show: action.value
                };

            case 'setContent':
                return {
                    ...state,
                    content: action.value,
                    show: true
                };

            case 'setTitle':
                return {
                    ...state,
                    title: action.value
                };

            case 'reset':
                return {
                    ...state,
                    title: '',
                    content: null,
                    show: false
                };

            default:
                return state;
        }
    };

    return (
        <SidebarProvider reducer={reducer} initState={initState}>
            {children}
        </SidebarProvider>
    );
};

export default SidebarController;