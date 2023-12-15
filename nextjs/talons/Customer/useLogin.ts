import { useCallback } from "react";
import { useMutation } from "@apollo/client";
import { useError } from "@/talons/Error/useError";
import { useUserContext } from "@/context/user";
import { useRouter } from "next/router";
import LoginQuery from "@/queries/Customer/login.graphql";

export const useLogin = () => {
  const [login, { loading, error }] = useMutation(LoginQuery);

  const [, { handleSetUser }] = useUserContext();

  const router = useRouter();

  useError({ error });

  const handleSubmit = useCallback(
    async ({
      values,
    }: {
      values: {
        email: string;
        password: string;
      };
    }) => {
      const variables = {
        ...values,
      };

      try {
        const { data } = await login({ variables });

        const user = data?.login?.user || null;

        if (user) {
          handleSetUser(user);
          router.push("/customer/dashboard");
        }
      } catch (e) {
        return;
      }
    },
    [router, login, handleSetUser],
  );

  return {
    handleSubmit,
  };
};
