import {useTranslation} from "react-i18next";
import {Typography} from "antd";

export function Xonalar() {
    const {t} = useTranslation()
    return (
        <div className={'w-[100%] bg-[#F9F9F9] h-[85vh]'}>
            <div className={'flex items-center justify-between mx-10 pt-7'}>
                <div className={'flex items-center gap-5 justify-center'}>
                    <Typography.Title level={1} className={'!font-[600] !mb-2'}>{t("Xonalar")}</Typography.Title>
                    <button className={'bg-blue-600 text-white px-2 py-1 rounded-2xl text-[20px]'}>{t("Davomat")}</button>
                </div>
            </div>
        </div>
    );
}