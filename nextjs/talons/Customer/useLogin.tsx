import { useMutation } from "@apollo/client";
import LoginQuery from "@/queries/Customer/login.graphql";

export const useLogin = () => {
  const [login, { data, loading, error }] = useMutation(LoginQuery);

  const handleSubmit = async ({ values }) => {
    const variables = {
      ...values,
    };

    const loginData = await login({ variables });

    console.log(loginData);

    return {};
  };

  return {
    handleSubmit,
  };
};
