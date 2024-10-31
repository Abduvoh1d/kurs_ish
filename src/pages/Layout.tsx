import { Outlet } from "react-router-dom";
import { Sider } from "../components/Sider.tsx";
import { Header } from "../components/Header.tsx";

export function Layout() {
    return (
        <div className="flex h-[100vh]">
            <Sider />
            <div className="flex flex-col w-full">
                <Header />
                <div className="flex-1 overflow-y-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
