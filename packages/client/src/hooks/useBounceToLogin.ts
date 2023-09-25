import { useNavigate } from "react-router-dom";
import { graphqlService } from "../graphql/client";
import { AppRoutes } from "../ui/AppRoutes";
import { useSnackbar } from "../ui/SequentialSnackbar/SequentialSnackbarContext";

export const useBounceToLogin = () => {
  const navigate = useNavigate();
  const { appendSimpleError } = useSnackbar();
  return () => {
    navigate(AppRoutes.login());
    appendSimpleError(
      "You are not logged in, or your session has expired. Please log in again"
    );
    graphqlService.setClientAuthToken("");
    return graphqlService.getApolloClient().clearStore();
  };
};
