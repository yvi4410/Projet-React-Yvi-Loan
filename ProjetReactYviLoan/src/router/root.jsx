import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Layout from "./Layout"; // nouveau layout
import Error404 from "../pages/404";
import ChampionPage from "../pages/ChampionPage.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <Error404 />,
        children: [
            {
                path: "/",
                element: <Layout />
            },
            {
                path: "champion/:name",
                element: <ChampionPage />
            }
        ]
    }
]);

export default router;