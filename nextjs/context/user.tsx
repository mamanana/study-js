import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const UserContext = createContext([]);

const UserContextProvider = props => {
    const { children } = props;

    const [user, setUser] = useState({})

    const handleSetUser = (value) => {
        setUser(value)
    }

    const userApi = useMemo(
        () => ({
            handleSetUser
        }),
        [handleSetUser]
    );

    const userState = { user }

    const contextValue = useMemo(() => [userState, userApi], [
        userApi,
        userState
    ]);

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider

export const useUserContext = () => useContext(UserContext);