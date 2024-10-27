import { RiDashboardLine } from "react-icons/ri";
import { FaBookReader, FaUsers, FaUserTie } from "react-icons/fa";
import { TfiBlackboard } from "react-icons/tfi";
import { IoMdSettings, IoMdWallet } from "react-icons/io";
import { Layout, Typography } from 'antd';
import { Link, useLocation } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import {useTranslation} from "react-i18next";

const { Sider: AntdSlider } = Layout;

export function Sider() {
    const location = useLocation()
    const {t} = useTranslation()

    const data = [
        {
            name: t('Dashboard'),
            icon: <RiDashboardLine />,
            link: '/dashboard',
        },
        {
            name: t('Guruhlar'),
            icon: <FaUsers />,
            link: '/guruhlar',
        },
        {
            name: t('Xodimlar'),
            icon: <FaUserTie />,
            link: '/xodimlar',
        },
        {
            name: t('Xonalar'),
            icon: <TfiBlackboard />,
            link: '/xonalar',
        },
        {
            name: t('Talabalar'),
            icon: <FaBookReader />,
            link: '/talabalar',
        },
        {
            name: t('Moliya'),
            icon: <IoMdWallet />,
            link: '/moliya',
        },
        {
            name: t('Sozlamalar'),
            icon: <IoMdSettings />,
            link: '/sozlamalar',
        }
    ];

    return (
        <AntdSlider theme={'light'} className={'px-[30px] py-[20px] h-[100vh] relative'} width={300}>
            <div className={'flex items-center justify-start gap-5'}>
                <img src="/SiderWomanImg.svg" alt="Woman Img" />
                <div>
                    <Typography className={'!m-0 !font-[700] text-[16px] font-[Poppins]'}>Jamila Azimova</Typography>
                    <span className={'text-gray-400 font-[Poppins]'}>+998 99 123 45 67</span>
                </div>
            </div>

            <div className={'mt-[40px] flex flex-col justify-between'}>
                <div>
                    {data.map((item, index) => (
                        <Link to={item.link} key={index}
                              className={`flex justify-start items-center gap-3 font-[600] font-[Source Sans Pro] px-[20px] py-[15px] ${location.pathname.includes(item.link) ? 'bg-[#635AD9] text-white hover:text-white' : 'hover:text-black'} rounded-xl cursor-pointer`}>
                            <span className={'text-[20px]'}>{item.icon}</span>
                            <span className={'!text-[14px]'}>{item.name}</span>
                        </Link>
                    ))}
                </div>

                {/* "Chiqish" linki pastda joylashtiriladi */}
                <Link to={'/login'}
                      className={`flex justify-start items-center gap-3  font-[600] px-[20px] py-[15px] rounded-xl cursor-pointer absolute bottom-5 hover:text-black`}>
                    <span className={'!text-[20px]'}><MdLogout /></span>
                    <span className={'text-[14px]'}>{t("Chiqish")}</span>
                </Link>
            </div>
        </AntdSlider>
    );
}
