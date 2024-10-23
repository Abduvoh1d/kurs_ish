import {Outlet} from "react-router-dom";
import {Sider} from "../components/Sider.tsx";
import {Header} from "../components/Header.tsx";

export function Layout() {
    return (
        <div className={'flex'}>
            <Sider/>
            <div className={'w-[100%] max-w-[100%]'}>
                <Header/>
                <Outlet/>
            </div>
        </div>
    );
}