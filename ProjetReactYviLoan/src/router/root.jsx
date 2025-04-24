import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Error404 from "../pages/404";
import Home from "../pages/home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <Error404 />,
        children: [
            {
                path: "/",
                element: <Home />
            }

        ]
    }
]);

export default router;
