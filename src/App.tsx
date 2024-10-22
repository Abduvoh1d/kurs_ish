import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Layout} from "./pages/Layout.tsx";
import {Sozlamalar} from "./pages/sozlamalar/Sozlamalar.tsx";
import {Dashboard} from "./pages/dashboard/Dashboard.tsx";
import {Talabalar} from "./pages/talabalar/Talabalar.tsx";
import {Guruhlar} from "./pages/guruhlar/Guruhlar.tsx";
import {Xodimlar} from "./pages/xodimlar/Xodimlar.tsx";
import {Not_Found} from "./pages/404/Not_Found.tsx";
import {Xonalar} from "./pages/xonalar/Xonalar.tsx";
import {Moliya} from "./pages/moliya/Moliya.tsx";

function App() {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout/>,
            children: [
                {
                    index: true,
                    element: <Dashboard/>
                },
                {
                    path: "guruhlar",
                    element: <Guruhlar/>
                },
                {
                    path: "xodimlar",
                    element: <Xodimlar/>
                },
                {
                    path: "xonalar",
                    element: <Xonalar/>
                },
                {
                    path: "talabalar",
                    element: <Talabalar/>
                },
                {
                    path: "moliya",
                    element: <Moliya/>
                },
                {
                    path: "sozlamalar",
                    element: <Sozlamalar/>
                }
            ]
        },
        {
            path: "*",
            element: <Not_Found/>
        }
    ])

    return (
        <RouterProvider router={router}/>
    )
}

export default App
