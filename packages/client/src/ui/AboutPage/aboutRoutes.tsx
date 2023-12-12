import { typedRouteConfig } from "../../routes";
import { AboutPage } from "./AboutPage";

export const aboutRoutes = () => [
  typedRouteConfig({
    id: "root.about",
    element: <AboutPage />,
    path: "about",
  }),
];
