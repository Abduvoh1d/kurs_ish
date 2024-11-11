
import {
    createBrowserRouter,
    RouterProvider,
    Navigate,
    Outlet,
} from "react-router-dom";
import {ConfigProvider} from "antd";
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import {useTranslation} from "react-i18next";
import './i18n/i18n.ts';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import PagesConfig from "./config/pages.config.ts";
import {Login} from "./pages/login/Login.tsx";
import {Register} from "./pages/register/Register.tsx";
import {Not_Found} from "./pages/404/Not_Found.tsx";
import {Dashboard} from "./pages/dashboard/Dashboard.tsx";
import {Guruhlar} from "./pages/guruhlar/Guruhlar.tsx";
import {Talabalar} from "./pages/talabalar/Talabalar.tsx";
import {Xodimlar} from "./pages/xodimlar/Xodimlar.tsx";
import {Xonalar} from "./pages/xonalar/Xonalar.tsx";
import {Moliya} from "./pages/moliya/Moliya.tsx";
import {Sozlamalar} from "./pages/sozlamalar/Sozlamalar.tsx";
import {Layout} from "./pages/Layout.tsx";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // Har bir so'rovning kechikish vaqti (bu vaqtdan keyin so'rovlar bekor qilinadi)
            staleTime: 1000 * 60 * 5, // 5 daqiqa - yangi so'rovlar olish uchun vaqtni belgilaydi

            // Muvaffaqiyatsiz so'rovni qayta urinishda oraliq kechikish vaqti
            retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000), // maksimal 30 soniya

            // Yangi so'rovlar faqat component fokuslangan yoki internet ulanishi qayta tiklanganda amalga oshadi
            refetchOnWindowFocus: true,
            refetchOnReconnect: true,

            // Ma'lumotni komponentda oldindan yuklash va ekran yangilanishida ishlatish imkoniyati
            cacheTime: 1000 * 60 * 10, // 10 daqiqa davomida keshda qoladi

            // Avtomatik so'rovni amalga oshirmaslik va faqat "enabled" parametri orqali qo'lda boshqarish
            enabled: true,

            // `useErrorBoundary` bilan ishlatish uchun xatoliklarni to'liq ko'rsatish
            // useErrorBoundary: true,
        },
        mutations: {
            // Muvaffaqiyatsiz mutatsiyalar uchun qayta urinish
            retry: 1,
            retryDelay: 2000, // 2 soniya kechikish bilan qayta urinish
        },
    },
});

const allowedLanguages = ["uz", "ru"];

function App() {
    const {i18n} = useTranslation();

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout/>,
            children: [
                {path: "/", element: <Navigate to={`/${i18n.language}/${PagesConfig.Dashboard}`} replace/>},
                {path: `${PagesConfig.Dashboard}`, element: <Navigate to={`/${i18n.language}/${PagesConfig.Dashboard}`} replace/>},
                {path: `${PagesConfig.Guruhlar}`, element: <Navigate to={`/${i18n.language}/${PagesConfig.Guruhlar}`} replace/>},
                {path: `${PagesConfig.Talabalar}`, element: <Navigate to={`/${i18n.language}/${PagesConfig.Talabalar}`} replace/>},
                {path: `${PagesConfig.Xodimlar}`, element: <Navigate to={`/${i18n.language}/${PagesConfig.Xodimlar}`} replace/>},
                {path: `${PagesConfig.Xonalar}`, element: <Navigate to={`/${i18n.language}/${PagesConfig.Xonalar}`} replace/>},
                {path: `${PagesConfig.Moliya}`, element: <Navigate to={`/${i18n.language}/${PagesConfig.Moliya}`} replace/>},
                {path: `${PagesConfig.Sozlamalar}`, element: <Navigate to={`/${i18n.language}/${PagesConfig.Sozlamalar}`} replace/>},
                {
                    path: `${i18n.language}`,
                    element: <CheckLanguage/>,
                    children: [
                        {path: `${PagesConfig.Dashboard}`, element: <Dashboard/>},
                        {path: `${PagesConfig.Guruhlar}`, element: <Guruhlar/>},
                        {path: `${PagesConfig.Talabalar}`, element: <Talabalar/>},
                        {path: `${PagesConfig.Xodimlar}`, element: <Xodimlar/>},
                        {path: `${PagesConfig.Xonalar}`, element: <Xonalar/>},
                        {path: `${PagesConfig.Moliya}`, element: <Moliya/>},
                        {path: `${PagesConfig.Sozlamalar}`, element: <Sozlamalar/>},
                    ],
                },
            ],
        },
        {path: `${PagesConfig.Login}`, element: <Login/>},
        {path: `${PagesConfig.Register}`, element: <Register/>},
        {path: "*", element: <Not_Found/>},
    ]);

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#90C049',
                },
            }}
        >
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools initialIsOpen={false}/>
                <RouterProvider router={router}/>
            </QueryClientProvider>
        </ConfigProvider>
    );
}

function CheckLanguage() {
    const {i18n} = useTranslation();

    if (!allowedLanguages.includes(i18n.language)) {
        return <Navigate to="*"/>;
    }

    return <Outlet/>;
}

export default App;
