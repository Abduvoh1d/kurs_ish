import { useState, useMemo, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { Button, Drawer, Dropdown, Empty, FormProps, MenuProps, Table, Typography, DatePicker } from "antd"
import { FiPlus } from "react-icons/fi"
import { AutoForm, IForm } from "../../components/auto-form/index..tsx"
import useForm from "antd/es/form/hooks/useForm"
import { useRouterPush } from "../../hooks/use-router-push.ts"
import { useLocationParams } from "../../hooks/use-location-params.ts"
import { HiOutlineDotsVertical } from "react-icons/hi"
import { FaMoneyBills } from "react-icons/fa6"
import { Dayjs } from "dayjs"

const { RangePicker } = DatePicker

export function Moliya() {
    const { t } = useTranslation()
    const [form] = useForm()
    const { push } = useRouterPush()
    const { query } = useLocationParams()

    const [range, setRange] = useState<string | null>(null)

    const onFinish: FormProps["onFinish"] = (values: unknown) => {
        console.log(values)
        onClose()
    }

    const openModal = useCallback(() => {
        push({ query: { ...query, add: true } })
    }, [push, query])

    const onClose = useCallback(() => {
        form.resetFields()
        push({ query: { ...query, add: undefined, edite: undefined } })
    }, [form, push, query])

    const edite = useCallback(() => {
        push({ query: { ...query, edite: true } })
    }, [push, query])

    const handleRangeChange =
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (dates: (Dayjs | null)[] | null, _: [string, string]) => {
            if (dates && dates[0] && dates[1]) {
                const [start, end] = dates
                const formattedRange = `${start.format("DD-MM-YYYY")} dan ${end.format("DD-MM-YYYY")} gacha`
                setRange(formattedRange)
                console.log(`Boshlanish: ${start.format("DD-MM-YYYY")}, Tugash: ${end.format("DD-MM-YYYY")}`)
            } else {
                setRange(null)
            }
        }

    const handleFilter = useCallback(() => {
        console.log("Tanlangan davr:", range)
    }, [range])

    const menuItems = useMemo<MenuProps["items"]>(
        () => [
            {
                key: "1",
                label: (
                    <p className="cursor-pointer text-[16px]" onClick={edite}>
                        {t("O'zgartirish")}
                    </p>
                ),
            },
            {
                key: "2",
                label: <p className="cursor-pointer text-[16px]">{t("O'chirish")}</p>,
            },
        ],
        [edite, t]
    )

    const columns = useMemo(
        () => [
            { title: t("Ism"), dataIndex: "name", key: "name" },
            { title: t("Kun"), dataIndex: "data", key: "data" },
            { title: t("Kategoriyalar"), dataIndex: "category", key: "category" },
            { title: t("Oluvchi"), dataIndex: "sum", key: "sum" },
            { title: t("Summa"), dataIndex: "role", key: "role" },
            {
                title: t("Hodisa"),
                key: "days",
                dataIndex: ".",
                render: () => (
                    <Dropdown menu={{ items: menuItems }} trigger={["click"]} placement="bottomRight">
                        <HiOutlineDotsVertical className="cursor-pointer" />
                    </Dropdown>
                ),
            },
        ],
        [menuItems, t]
    )

    const data = useMemo(
        () => [
            {
                key: "1",
                name: "John Doe",
                data: "2024-10-24",
                category: "Mathematics",
                sum: "1000 USD",
                role: "Admin",
            },
            {
                key: "2",
                name: "Jane Smith",
                data: "2024-09-18",
                category: "Physics",
                sum: "1500 USD",
                role: "Teacher",
            },
            {
                key: "3",
                name: "Dr. Albert",
                data: "2024-07-12",
                category: "Chemistry",
                sum: "1200 USD",
                role: "Student",
            },
        ],
        []
    )

    const formData: IForm[] = [
        {
            label: t("Familiya"),
            name: "surname",
            size: "large",
            span: 24,
            required: true,
        },
        { label: t("Ism"), name: "name", size: "large", span: 24, required: true },
        {
            label: t("Telefon raqam"),
            name: "days",
            size: "large",
            span: 24,
            required: true,
        },
        {
            label: t("Parol"),
            type: "password",
            name: "password",
            size: "large",
            span: 24,
            required: true,
        },
        {
            label: t("Rol"),
            type: "select",
            name: "role",
            size: "large",
            span: 24,
            option: [
                { label: t("Admin"), value: t("Admin") },
                { label: t("Ustoz"), value: t("Ustoz") },
                { label: t("O'quvchi"), value: t("O'quvchi") },
            ],
            required: true,
        },
        {
            label: t("Tug'ilgan kuni"),
            type: "datePicker",
            name: "dataOfBirth",
            size: "large",
            span: 12,
            required: true,
        },
        {
            label: t("Jins"),
            type: "radio",
            name: "gender",
            radioOptions: [
                { label: t("Erkak"), value: t("Erkak") },
                { label: t("Ayol"), value: t("Ayol") },
            ],
            size: "large",
            span: 12,
            required: true,
        },
    ]

    return (
        <div className="w-full bg-[#F9F9F9] min-h-[84vh]">
            <div className="flex items-center justify-between mx-10 pt-7">
                <Typography.Title level={1} className="!font-semibold !mb-2">
                    {t("Moliya")}
                </Typography.Title>
                <Button
                    onClick={openModal}
                    type="primary"
                    className="h-[100%] text-[16px] rounded-xl flex items-center justify-center pb-2"
                >
                    <FiPlus className="mt-1" />
                    {t("Yangisini qo'shing")}
                </Button>
            </div>

            <div className="px-10 mt-4 max-w-[100%] flex items-center justify-start gap-4">
                <RangePicker size="large" className="w-[300px]" onChange={handleRangeChange} />
                <Button onClick={handleFilter} type="primary">
                    {t("Filter")}
                </Button>
            </div>

            <div className="mx-10 mt-5 w-[500px] h-[60px] rounded-[10px] shadow-md bg-white flex items-center justify-center gap-4 text-[20px]">
                <p>Davr uchun xarajatlar</p>
                <p>6 7000 265 so’m</p>
                <FaMoneyBills className="text-blue-600" />
            </div>

            <div className="mt-4">
                <Table
                    id="GroupTable"
                    columns={columns}
                    dataSource={data}
                    size="large"
                    locale={{
                        emptyText: <Empty description={<span>{t("Malumot topilmadi")}</span>} />,
                    }}
                />
            </div>

            <Drawer
                title={t("Yangi guruh qo’shish")}
                onClose={onClose}
                open={Boolean(query.add) || Boolean(query.edite)}
                width={530}
            >
                <AutoForm props={formData} form={form} layout="vertical" onFinish={onFinish} />
                <div className="flex items-center justify-end gap-3">
                    <Button onClick={onClose}>{t("Bekor qilish")}</Button>
                    <Button type="primary" htmlType="submit" onClick={form.submit}>
                        {query.edite ? t("O'zgartirish") : t("Qo'shish")}
                    </Button>
                </div>
            </Drawer>
        </div>
    )
}
