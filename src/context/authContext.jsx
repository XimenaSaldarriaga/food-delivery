import React, { createContext } from 'react';


export const context = createContext();

export const AuthProvider = ({ children }) => {

    const user = {
        login: true,
    }


    return (
        <context.Provider value={{ user }}>
            {children}
        </context.Provider>
    );
};
