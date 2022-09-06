import React from 'react';

const AppContext = React.createContext();

function AppContextProvider(props) {
    const [state, setState] = React.useState({
        listOfFolders: [],
    });
    return (
        <AppContext.Provider value={{ state, setState }}>
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