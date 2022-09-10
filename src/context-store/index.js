import React from 'react';
import { TEMPLATE_FILES } from '../constants';

const AppContext = React.createContext();

function AppContextProvider(props) {
    const [state, setState] = React.useState({
        currentPath: '/',
        listOfFiles: TEMPLATE_FILES,
    });

    const updatePathForUser = (path) => setState(p => ({ ...p, currentPath: path }));
    return (
        <AppContext.Provider value={{ state, setState, updatePathForUser }}>
            {props.children}
        </AppContext.Provider>
    )
}

function useAppContext() {
    const context = React.useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within a AppContextProvider')
    }
    return context;
}

export { AppContextProvider, useAppContext };