import React, { createContext, useContext, useMemo, useState } from "react";

const UserContext = createContext([]);

const UserContextProvider = (props) => {
  const { children } = props;

  const [userState, setUserState] = useState({ isSignedIn: false, user: null });

  const handleSetUser = (user) => {
    setUserState({ isSignedIn: true, user });
  };

  const userApi = useMemo(
    () => ({
      handleSetUser,
    }),
    [handleSetUser],
  );

  const contextValue = useMemo(
    () => [userState, userApi],
    [userApi, userState],
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserContextProvider;

export const useUserContext = () => useContext(UserContext);
