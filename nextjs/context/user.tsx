import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { verifyJwtToken } from "@/untils/auth";
declare type User = {
  id: string,
  email: string,
  firstname: string,
  lastname: string,
  createdAt: string
}

type IContextType = [{
  user: User,
  isSignedIn: boolean
}, {
  handleSetUser: React.Dispatch<React.SetStateAction<{user: User, isSignedIn: boolean}>>
}]  

const INITIAL_USER = {
  id: '',
  email: '',
  firstname: '',
  lastname: '',
  createdAt: ''
}

const UserContext = createContext<IContextType>([{
  user: INITIAL_USER,
  isSignedIn: false
}, {
  handleSetUser: () => {}
}]);

const UserContextProvider = ({ children } : { children: React.ReactNode }) => {

  const [userState, setUserState] = useState({user: INITIAL_USER, isSignedIn: false});

  const handleSetUser = (user: User) => {
    setUserState({ isSignedIn: true, user });
  };
  
  // useEffect(() => {
  //   const getVerifiedToken = async () => {
  //     const cookies = new Cookies();
  //     const token = cookies.get("token") ?? null;
  //     console.log(token)
  //     const user = await verifyJwtToken(token);  
  //     console.log(user)
  //   };

  //   getVerifiedToken()
  // }, [])

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
