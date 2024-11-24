import { createBrowserRouter, RouterProvider, Navigate, Outlet } from "react-router-dom"
import { ConfigProvider } from "antd"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { useTranslation } from "react-i18next"
import "./i18n/i18n.ts"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import PagesConfig from "./config/pages.config.ts"
import { Login } from "./pages/login/Login.tsx"
import { Not_Found } from "./pages/404/Not_Found.tsx"
import { Dashboard } from "./pages/dashboard/Dashboard.tsx"
import { Guruhlar } from "./pages/guruhlar/Guruhlar.tsx"
import { Talabalar } from "./pages/talabalar/Talabalar.tsx"
import { Xodimlar } from "./pages/xodimlar/Xodimlar.tsx"
import { Xonalar } from "./pages/xonalar/Xonalar.tsx"
import { Moliya } from "./pages/moliya/Moliya.tsx"
import { Sozlamalar } from "./pages/sozlamalar/Sozlamalar.tsx"
import { Layout } from "./pages/Layout.tsx"
import { ToastConfig } from "./components/toastify/Toastify.tsx"

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

            // `useErrorBoundary` bilan ishlatish uchun xatoliklarni to'liq ko'rsatish
            // useErrorBoundary: true,
        },
        mutations: {
            retry: 1,
        },
    },
})

function App() {
    const { i18n } = useTranslation()

    const router = createBrowserRouter([
        {
            path: `${i18n.language}`,
            element: <Layout/>,
            children: [
                { path: `${PagesConfig.Dashboard}`, element: <Dashboard /> },
                { path: `${PagesConfig.Guruhlar}`, element: <Guruhlar /> },
                { path: `${PagesConfig.Talabalar}`, element: <Talabalar /> },
                { path: `${PagesConfig.Xodimlar}`, element: <Xodimlar /> },
                { path: `${PagesConfig.Xonalar}`, element: <Xonalar /> },
                { path: `${PagesConfig.Moliya}`, element: <Moliya /> },
                { path: `${PagesConfig.Sozlamalar}`, element: <Sozlamalar /> },
            ],
        },
        { path: `${PagesConfig.Login}`, element: <Login /> },
        { path: "*", element: <Not_Found /> },
    ])

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#90C049",
                },
            }}
        >
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools initialIsOpen={false} />
                <RouterProvider router={router} />
                <ToastConfig />
            </QueryClientProvider>
        </ConfigProvider>
    )
}

export default App
