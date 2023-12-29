import React from "react";
import type { ReactElement } from "react";
import { useUserContext } from "@/context/user";

const AuthLayout = ({ children }: { children: ReactElement }) => {

  const [{ user }] = useUserContext()

  return (
    <main>
      <div className="w-full"></div>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
