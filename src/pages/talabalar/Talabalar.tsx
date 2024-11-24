import { useTranslation } from "react-i18next"
import { Button, Drawer, Dropdown, Empty, FormProps, Table, Typography } from "antd"
import { FiPlus } from "react-icons/fi"
import { AutoForm, IForm } from "../../components/auto-form/index..tsx"
import useForm from "antd/es/form/hooks/useForm"
import { useRouterPush } from "../../hooks/use-router-push.ts"
import { useLocationParams } from "../../hooks/use-location-params.ts"
import { HiOutlineDotsVertical } from "react-icons/hi"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import StudentStore from "../../store/Student.ts"
import { IStudent } from "../../types"
import Excel from "../../components/Excel.tsx"
import { ColumnType } from "antd/es/table"
import { ErrorToast, SuccessToast } from "../../components/toastify/Toastify.tsx"
import dayjs from "dayjs"
import { useEffect } from "react"

export function Talabalar() {
    const { t } = useTranslation()
    const [form] = useForm()
    const { push } = useRouterPush()
    const { query } = useLocationParams()
    const queryClient = useQueryClient()

    const {
        data: Students,
        isFetching,
        isError,
    } = useQuery({
        queryKey: ["student"],
        queryFn: (): Promise<IStudent[]> => StudentStore.getStudent(),
        retry: 1,
    })

    const getOneStudent = useMutation({
        mutationFn: (id: number) => StudentStore.getOneStudent(id),
        onSuccess: (data) => {
            form.setFieldsValue(data)
        },
        onError: (error) => {
            ErrorToast(`${error}`)
        },
    })

    const createStudent = useMutation({
        mutationFn: (data: IStudent) => StudentStore.createStudent(data),
        onSuccess: () => {
            SuccessToast("Talaba qo'shildi")
            queryClient.invalidateQueries({ queryKey: ["student"] })
        },
        onError: () => {
            ErrorToast("Talaba qo'shilmadi")
        },
    })

    const deleteStudent = useMutation({
        mutationFn: (id: number) => StudentStore.deleteStudent(id),
        onSuccess: () => {
            SuccessToast("Talaba o'chirildi")
            queryClient.invalidateQueries({ queryKey: ["student"] })
        },
        onError: (error) => {
            ErrorToast(`${error}`)
        },
    })

    useEffect(() => {
        if (isError) {
            ErrorToast("Error")
        }
    }, [isError])

    const onFinish: FormProps["onFinish"] = (values) => {
        values.date_of_birth = dayjs(values.date_of_birth.$d).format("YYYY-MM-DD")
        createStudent.mutate(values)
        onClose()
    }

    function openModal() {
        push({ query: { ...query, add: true } })
    }

    function onClose() {
        form.resetFields()
        push({
            query: { ...query, add: undefined, edite: undefined, id: undefined },
        })
    }

    function edite(id: number) {
        getOneStudent.mutate(id)
        push({ query: { ...query, edite: true, id } })
    }

    const columns: ColumnType<IStudent>[] = [
        {
            title: t("Rasm"),
            dataIndex: "photo",
            key: "photo",
            render: (_, item: IStudent) => (
                <img
                    src={item.photo || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full"
                />
            ),
        },
        {
            title: t("Ism"),
            dataIndex: "first_name",
            key: "first_name",
        },
        {
            title: t("Familiya"),
            dataIndex: "last_name",
            key: "last_name",
        },
        {
            title: t("Telefon raqam"),
            dataIndex: "phone_number",
            key: "phone_number",
        },
        {
            title: t("Tug'ilgan kuni"),
            dataIndex: "date_of_birth",
            key: "date_of_birth",
        },
        {
            title: t("Gender"),
            dataIndex: "gender",
            key: "gender",
        },
        {
            title: t("Hodisa"),
            key: "days",
            dataIndex: ".",
            render: (_: unknown, item: IStudent) => {
                return (
                    <Dropdown
                        menu={{
                            items: [
                                {
                                    key: "1",
                                    label: <p className="cursor-pointer text-[16px]">{t("O'zgartirish")}</p>,
                                    onClick: () => edite(item.id),
                                },
                                {
                                    key: "2",
                                    label: <p className="cursor-pointer text-[16px]">{t("O'chirish")}</p>,
                                    onClick: () => {
                                        deleteStudent.mutate(item.id)
                                    },
                                },
                            ],
                        }}
                        trigger={["click"]}
                        placement="bottomRight"
                    >
                        <HiOutlineDotsVertical className="cursor-pointer" />
                    </Dropdown>
                )
            },
        },
    ]

    const formData = [
        {
            label: t("Ism"),
            span: 24,
            size: "large",
            name: "first_name",
            required: true,
        },
        {
            label: t("Familiya"),
            name: "last_name",
            size: "large",
            span: 24,
            required: true,
        },
        {
            label: t("Rasm Url"),
            name: "photo",
            size: "large",
            span: 24,
        },
        {
            label: t("Telefon raqam"),
            span: 24,
            size: "large",
            name: "phone_number",
            required: true,
        },
        !query.edite && {
            label: t("Parol"),
            span: 24,
            size: "large",
            type: "password",
            name: "password",
            required: true,
        },
        {
            label: t("Tug'ilgan kuni"),
            size: "large",
            type: "datePicker",
            name: "date_of_birth",
            required: true,
            className: "w-full",
            span: 12,
        },
        {
            label: t("Jins"),
            size: "large",
            type: "radio",
            radioOptions: [
                { label: t("Erkak"), value: t("male") },
                { label: t("Ayol"), value: t("female") },
            ],
            name: "gender",
            required: true,
            className: "w-full",
            span: 12,
        },
    ] as IForm[]

    return (
        <div className="w-full bg-[#F9F9F9] h-[84vh]">
            <div className="flex items-center justify-between mx-10 pt-7">
                <Typography.Title level={1} className="!font-semibold !mb-2">
                    {t("Talabalar")}
                </Typography.Title>

                <div className={"flex items-center gap-1"}>
                    <Excel name={"GroupTable"} />
                    <Button
                        onClick={openModal}
                        type={"primary"}
                        className={"h-[100%] text-[16px] rounded-xl flex items-center justify-center pb-2"}
                    >
                        <span className={"mt-1"}>
                            <FiPlus />
                        </span>
                        {t("Yangisini qo'shing")}
                    </Button>
                </div>
            </div>

            <div className={"mt-10"}>
                <Table<IStudent>
                    id={"GroupTable"}
                    columns={columns}
                    dataSource={Students}
                    loading={isFetching}
                    size="large"
                    locale={{
                        emptyText: <Empty description={<span>{t("Malumot topilmadi")}</span>} />,
                    }}
                />
            </div>

            <Drawer
                title={t(query.add ? "Yangi talaba qo'shish" : "Talabani o'zgartish")}
                onClose={onClose}
                open={Boolean(query.add) || Boolean(query.edite)}
                width={530}
            >
                <AutoForm props={formData} form={form} layout="vertical" onFinish={onFinish} />
                <div className={"flex items-center justify-end gap-3"}>
                    <Button onClick={onClose}>{t("Bekor qilish")}</Button>
                    <Button type="primary" htmlType="submit" onClick={() => form.submit()}>
                        {query.edite ? t("O'zgartirish") : t("Qo'shish")}
                    </Button>
                </div>
            </Drawer>
        </div>
    )
}
