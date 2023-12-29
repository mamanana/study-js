import { useCallback, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useError } from "@/talons/Error/useError";
import { useUserContext } from "@/context/user";
import { useRouter } from "next/router";
import LogoutQuery from "@/queries/Customer/logout.graphql";

export const useLogout = () => {
  const [logout, { loading, error }] = useMutation(LogoutQuery);

  useEffect(() => {
    logout();
  }, []);

  return null;
};
