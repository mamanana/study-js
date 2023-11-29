import { useEffect } from "react";
import { useToast } from "../Toast/useToast";

export const useError = (props) => {
  const { error } = props;

  const { addToast } = useToast();

  const { graphQLErrors, message: errorMessage } = error || {};

  useEffect(() => {
    if (graphQLErrors && graphQLErrors.length) {
      graphQLErrors.forEach(({ message }) => {
        addToast({
          type: "error",
          message: message,
        });
      });
    } else if (errorMessage) {
      addToast({
        type: "error",
        message: errorMessage,
      });
    }
  }, [graphQLErrors, errorMessage]);

  return null;
};
