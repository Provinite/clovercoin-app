import { useNavigate } from "react-router-dom";
import { graphqlService } from "../graphql/client";
import { AppRoutes } from "../ui/AppRoutes";

export const useBounceToLogin = () => {
  const navigate = useNavigate();
  return () => {
    navigate(AppRoutes.login());
    graphqlService.setClientAuthToken("");
    return graphqlService.getApolloClient().clearStore();
  };
};
