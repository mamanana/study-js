import React, { createContext, useContext, useMemo, useState } from "react";
declare type User = {
  id: string,
  email: string,
  firstname: string,
  lastname: string,
  createdAt: string
}

const UserContext = createContext([{}, {}]);

const UserContextProvider = (props: any ) => {
  const { children } = props;

  const [userState, setUserState] = useState({});

  const handleSetUser = (user: User) => {
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
