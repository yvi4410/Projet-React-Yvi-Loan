import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/404";
import Home from "../pages/home";
import ChampionPage from "../components/ChampionPage.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "champion/:name",
                element: <ChampionPage />,
            }
        ]
    }
]);

export default router;
