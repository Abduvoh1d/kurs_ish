import { Button } from "antd"
import { useLocation, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import "../i18n/i18n.ts"

export function Header() {
    const url = useLocation()
    const { t } = useTranslation()
    const { i18n } = useTranslation()
    const navigate = useNavigate()

    function removeLanguageSegment(path: string) {
        const segments = path.split("/").filter(Boolean)
        if (segments[0] === "uz" || segments[0] === "ru") {
            segments.shift()
        }
        return `/${segments.join("/")}`
    }

    function changeLanguage(newLang: string) {
        const newPath = removeLanguageSegment(url.pathname)
        i18n.changeLanguage(newLang as string).then()
        navigate(`/${newLang}${newPath}`)
    }

    const language = [
        { lable: "UZ", value: "uz" },
        { lable: "RU", value: "ru" },
    ]

    return (
        <div className="flex items-center justify-between min-w-[100%] px-[10px] py-[15px]">
            <div className="flex items-center gap-[20px]">
                <img src="/logo.svg" alt="Ishonch Logo" />
            </div>

            <div className="flex items-center gap-[20px] mr-[80px]">
                <input type="email" placeholder={`${t("Qidiruv")}`} className="border-2 rounded-3xl px-[10px] py-[10px] pl-[20px] w-[400px]" />
                <Button.Group size="large">
                    {language.map((item, index) => (
                        <Button
                            key={index}
                            className={`rounded-3xl ${i18n.language == item.value ? "bg-gray-900 hover:!bg-gray-900 !text-white !border-gray-900" : "bg-white !text-black !border-gray-900"}`}
                            onClick={() => changeLanguage(item.value)}
                        >
                            {item.lable}
                        </Button>
                    ))}
                </Button.Group>
            </div>
        </div>
    )
}
