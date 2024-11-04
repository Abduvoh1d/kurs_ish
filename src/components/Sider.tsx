import {RiDashboardLine} from "react-icons/ri";
import {FaBookReader, FaUsers, FaUserTie} from "react-icons/fa";
import {TfiBlackboard} from "react-icons/tfi";
import {IoMdSettings, IoMdWallet} from "react-icons/io";
import {Layout, Typography} from 'antd';
import {Link, useLocation} from "react-router-dom";
import {MdLogout} from "react-icons/md";
import {useTranslation} from "react-i18next";
import Pages from "../config/pages.config.ts";

const {Sider: AntdSlider} = Layout;

export function Sider() {
    const location = useLocation()
    const {t} = useTranslation()

    const data = [
        {
            name: t('Dashboard'),
            icon: <RiDashboardLine/>,
            link: `/${Pages.Dashboard}`,
        },
        {
            name: t('Guruhlar'),
            icon: <FaUsers/>,
            link: `/${Pages.Guruhlar}`,
        },
        {
            name: t('Xodimlar'),
            icon: <FaUserTie/>,
            link: `/${Pages.Xodimlar}`,
        },
        {
            name: t('Xonalar'),
            icon: <TfiBlackboard/>,
            link: `/${Pages.Xonalar}`,
        },
        {
            name: t('Talabalar'),
            icon: <FaBookReader/>,
            link: `/${Pages.Talabalar}`,
        },
        {
            name: t('Moliya'),
            icon: <IoMdWallet/>,
            link: `/${Pages.Moliya}`,
        },
        {
            name: t('Sozlamalar'),
            icon: <IoMdSettings/>,
            link: `/${Pages.Sozlamalar}`,
        }
    ];

    return (
        <AntdSlider
            theme="light"
            className="px-[30px] py-[20px] w-[300px] relative overflow-hidden"
            width={300}
        >
            <div className="flex items-center justify-start gap-5">
                <img src="/SiderWomanImg.svg" alt="Woman Img"/>
                <div>
                    <Typography className="!m-0 !font-[900] text-[16px] !font-[Poppins]">
                        Jamila Azimova
                    </Typography>
                    <span className="text-gray-400 font-[Poppins]">+998 99 123 45 67</span>
                </div>
            </div>

            <div className="mt-[40px] flex flex-col justify-between">
                <div className="overflow-hidden">
                    {data.map((item, index) => (
                        <Link
                            to={item.link}
                            key={index}
                            className={`flex justify-start items-center gap-3 font-[600] px-[20px] py-[15px] 
            ${location.pathname.includes(item.link) ? 'bg-blue-600 text-white hover:text-white' : 'hover:text-black'}
            rounded-xl cursor-pointer`}
                        >
                            <span className="text-[20px]">{item.icon}</span>
                            <span className="!text-[14px]">{item.name}</span>
                        </Link>
                    ))}

                    <Link
                        to={`/${Pages.Login}`}
                        className="flex justify-start items-center w-[80%] gap-3 font-[600] px-[20px] py-[15px]
        rounded-xl cursor-pointer absolute bottom-5 hover:text-black"
                    >
                        <span className="!text-[20px]"><MdLogout/></span>
                        <span className="text-[14px]">{t("Chiqish")}</span>
                    </Link>
                </div>
            </div>
        </AntdSlider>


    );
}
