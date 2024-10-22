import { RiDashboardLine } from "react-icons/ri";
import { FaBookReader, FaUsers, FaUserTie } from "react-icons/fa";
import { TfiBlackboard } from "react-icons/tfi";
import { IoMdSettings, IoMdWallet } from "react-icons/io";
import { Layout, Typography } from 'antd';
import { Link, useLocation } from "react-router-dom";
import { MdLogout } from "react-icons/md";

const { Sider: AntdSlider } = Layout;

export function Sider() {
    const location = useLocation()

    const data = [
        {
            name: 'Dashboard',
            icon: <RiDashboardLine />,
            link: '/',
        },
        {
            name: 'Guruhlar',
            icon: <FaUsers />,
            link: '/guruhlar',
        },
        {
            name: 'Xodimlar',
            icon: <FaUserTie />,
            link: '/xodimlar',
        },
        {
            name: 'Xonalar',
            icon: <TfiBlackboard />,
            link: '/xonalar',
        },
        {
            name: 'Talabalar',
            icon: <FaBookReader />,
            link: '/talabalar',
        },
        {
            name: 'Moliya',
            icon: <IoMdWallet />,
            link: '/moliya',
        },
        {
            name: 'Sozlamalar ',
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
                              className={`flex justify-start items-center gap-3 font-[Poppins] font-[600] px-[20px] py-[15px] ${location.pathname === item.link ? 'bg-[#635AD9] text-white hover:text-white' : 'hover:text-black'} rounded-xl cursor-pointer`}>
                            <span className={'text-[20px]'}>{item.icon}</span>
                            <span className={'!text-[14px]'}>{item.name}</span>
                        </Link>
                    ))}
                </div>

                {/* "Chiqish" linki pastda joylashtiriladi */}
                <Link to={'/login'}
                      className={`flex justify-start items-center gap-3 font-[Poppins] font-[600] px-[20px] py-[15px] rounded-xl cursor-pointer absolute bottom-5 hover:text-black`}>
                    <span className={'!text-[20px]'}><MdLogout /></span>
                    <span className={'text-[14px]'}>Chiqish</span>
                </Link>
            </div>
        </AntdSlider>
    );
}
