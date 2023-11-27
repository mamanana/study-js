import { useCallback } from "react";
import { useMutation } from "@apollo/client";
import { useError } from "@/talons/Error/useError";
import { useUserContext } from "@/context/user";
import { useRouter } from "next/router";
import RegisterQuery from "@/queries/Customer/register.graphql";

export const useRegister = () => {
  const [register, { loading, error }] = useMutation(RegisterQuery);

  const [, { handleSetUser }] = useUserContext();

  const router = useRouter();

  useError({ error });

  const handleSubmit = useCallback(async ({ values }) => {
    const variables = {
      ...values,
    };

    try {
      const { data } = await register({ variables });

      const user = data?.register?.user || null;

      if (user) {
        handleSetUser(user);
        router.push("/dashboard");
      }
    } catch (e) {
      return;
    }
  }, []);

  return {
    handleSubmit,
    loading,
  };
};
