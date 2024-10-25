import {
    createBrowserRouter,
    RouterProvider,
    Navigate,
    Outlet,
} from "react-router-dom";
import { Layout } from "./pages/Layout.tsx";
import { Sozlamalar } from "./pages/sozlamalar/Sozlamalar.tsx";
import { Dashboard } from "./pages/dashboard/Dashboard.tsx";
import { Talabalar } from "./pages/talabalar/Talabalar.tsx";
import { Guruhlar } from "./pages/guruhlar/Guruhlar.tsx";
import { Xodimlar } from "./pages/xodimlar/Xodimlar.tsx";
import { Not_Found } from "./pages/404/Not_Found.tsx";
import { Xonalar } from "./pages/xonalar/Xonalar.tsx";
import { Moliya } from "./pages/moliya/Moliya.tsx";
import { ConfigProvider } from "antd"; // Ant Design ConfigProvider import qilindi
import { useTranslation } from "react-i18next";
import './i18n/i18n.ts';

const allowedLanguages = ["ru", "uz"];

function App() {
    const { i18n } = useTranslation();

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                { path: "/", element: <Navigate to={`/${i18n.language}/dashboard`} replace /> },
                { path: "dashboard", element: <Navigate to={`/${i18n.language}/dashboard`} replace /> },
                { path: "guruhlar", element: <Navigate to={`/${i18n.language}/guruhlar`} replace /> },
                { path: "talabalar", element: <Navigate to={`/${i18n.language}/talabalar`} replace /> },
                { path: "xodimlar", element: <Navigate to={`/${i18n.language}/xodimlar`} replace /> },
                { path: "xonalar", element: <Navigate to={`/${i18n.language}/xonalar`} replace /> },
                { path: "moliya", element: <Navigate to={`/${i18n.language}/moliya`} replace /> },
                { path: "sozlamalar", element: <Navigate to={`/${i18n.language}/sozlamalar`} replace /> },
                {
                    path: `${i18n.language}`,
                    element: <CheckLanguage />,
                    children: [
                        { path: "dashboard", element: <Dashboard /> },
                        { path: "guruhlar", element: <Guruhlar /> },
                        { path: "talabalar", element: <Talabalar /> },
                        { path: "xodimlar", element: <Xodimlar /> },
                        { path: "xonalar", element: <Xonalar /> },
                        { path: "moliya", element: <Moliya /> },
                        { path: "sozlamalar", element: <Sozlamalar /> },
                    ],
                },
            ],
        },
        { path: "*", element: <Not_Found /> },
    ]);

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#90C049',
                },
            }}
        >
            <RouterProvider router={router} />
        </ConfigProvider>
    );
}

function CheckLanguage() {
    const { i18n } = useTranslation();

    if (!allowedLanguages.includes(i18n.language)) {
        return <Navigate to="*" />;
    }

    return <Outlet />;
}

export default App;
