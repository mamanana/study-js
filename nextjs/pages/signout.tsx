import React from "react";
import { useLogout } from "@/talons/Customer/useLogout";

const SignOut = () => {
  useLogout();

  return <div>Signout</div>;
};

export default SignOut;
