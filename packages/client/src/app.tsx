/**
 * Application entry point. Creates the react router dom router and
 * bootstraps react with it.
 */
import { render } from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes";

const router = createBrowserRouter(routes as any);

render(<RouterProvider router={router} />, document.querySelector("#app"));
