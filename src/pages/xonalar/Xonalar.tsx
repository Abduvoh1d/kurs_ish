import { useTranslation } from "react-i18next"
import { Button, Drawer, Dropdown, Empty, FormProps, Table, Typography } from "antd"
import { AutoForm, IForm } from "../../components/auto-form/index..tsx"
import useForm from "antd/es/form/hooks/useForm"
import { useRouterPush } from "../../hooks/use-router-push.ts"
import { useLocationParams } from "../../hooks/use-location-params.ts"
import { IRooms } from "../../types"
import { FiPlus } from "react-icons/fi"
import { HiOutlineDotsVertical } from "react-icons/hi"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import RoomStore from "../../store/Room.ts"
import { useEffect } from "react"
import { ErrorToast, SuccessToast } from "../../components/toastify/Toastify.tsx"
import Excel from "../../components/Excel.tsx"

export function Xonalar() {
    const { t } = useTranslation()
    const [form] = useForm()
    const { push } = useRouterPush()
    const { query } = useLocationParams()
    const queryClient = useQueryClient()

    const {
        data: Rooms,
        isFetching,
        isError,
    } = useQuery({
        queryKey: ["rooms"],
        queryFn: (): Promise<IRooms[]> => RoomStore.getRooms(),
    })

    const getOneRoom = useMutation({
        mutationFn: (id: number): Promise<IRooms> => RoomStore.getOneRoom(id),
        onSuccess: (data) => {
            form.setFieldsValue(data)
        },
        onError: () => {
            ErrorToast("Xatolik yuz berdi")
        },
    })

    const createRoom = useMutation({
        mutationFn: (values: IRooms) => RoomStore.createRooms(values),
        onSuccess: () => {
            queryClient.invalidateQueries(["rooms"])
            SuccessToast("Xona qo'shildi")
        },
        onError: () => {
            ErrorToast("Foydalanuvchi qo'shib bo'lmadi")
        },
    })

    const updateRoom = useMutation({
        mutationFn: ({ id, values }: { id: number; values: IRooms }) => RoomStore.updateRooms(id, values),
        onSuccess: () => {
            queryClient.invalidateQueries(["rooms"])
            SuccessToast("Xona yangilandi")
        },
        onError: () => {
            ErrorToast("Xona yangilanmadi")
        },
    })

    const deleteRoom = useMutation({
        mutationFn: (id: number) => RoomStore.deleteRooms(id),
        onSuccess: () => {
            queryClient.invalidateQueries(["rooms"])
            SuccessToast("Xona o'chirildi")
        },
        onError: () => {
            ErrorToast("Xona o'chirib bo'lmadi")
        },
    })

    useEffect(() => {
        if (isError) {
            ErrorToast("Xodimlar topilmadi")
        }
    }, [isError])

    const onFinish: FormProps["onFinish"] = (values: IRooms) => {
        const id: number = Number(query.id)
        if (query.add) {
            createRoom.mutate(values)
        } else {
            updateRoom.mutate({ id, values })
        }
        onClose()
    }

    function openModal() {
        push({ query: { ...query, add: true } })
    }

    function edite(id: number) {
        getOneRoom.mutate(id)
        push({ query: { ...query, edite: true, id } })
    }

    function onClose() {
        form.resetFields()
        push({
            query: { ...query, add: undefined, edite: undefined, id: undefined },
        })
    }

    const formData = [
        {
            label: t("Xonani nomi"),
            name: "name",
            size: "large",
            span: 24,
            required: true,
        },
        {
            label: t("Xona sig'imi"),
            type: "number",
            name: "room_capacity",
            size: "large",
            required: true,
            span: 24,
            className: "w-full",
        },
        {
            label: t("Parta va stullar soni"),
            type: "number",
            name: "number_of_desks_and_chairs",
            size: "large",
            required: true,
            span: 24,
            className: "w-full",
        },
    ] as IForm[]

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: t("Xonani nomi"),
            dataIndex: "name",
            key: "name",
        },
        {
            title: t("Xona sig'imi"),
            dataIndex: "room_capacity",
            key: "room_capacity",
        },
        {
            title: t("Parta va stullar soni"),
            dataIndex: "number_of_desks_and_chairs",
            key: "number_of_desks_and_chairs",
        },
        {
            title: t("Hodisa"),
            key: "action",
            dataIndex: ".",
            render: (_: unknown, item: IRooms) => {
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
                                    onClick: () => deleteRoom.mutate(item.id),
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

    return (
        <>
            <div className={"w-[100%] bg-[#F9F9F9] h-[85vh]"}>
                <div className={"flex items-center justify-between mx-10 pt-7"}>
                    <Typography.Title level={1} className={"!font-[600] !mb-2"}>
                        {t("Xonalar")}
                    </Typography.Title>
                    <div className={"flex items-center gap-2"}>
                        <Excel name={"rooms"} />
                        <Button
                            onClick={openModal}
                            type="primary"
                            className="h-full text-[16px] rounded-xl flex items-center justify-center pb-2"
                        >
                            <span className="mt-1">
                                <FiPlus />
                            </span>
                            {t("Yangisini qo'shing")}
                        </Button>
                    </div>
                </div>
                <Table<IRooms>
                    id={"rooms"}
                    columns={columns}
                    dataSource={Rooms}
                    className={"mt-10"}
                    loading={isFetching}
                    size="large"
                    locale={{
                        emptyText: <Empty description={<span>{t("Malumot topilmadi")}</span>} />,
                    }}
                />
            </div>

            <Drawer
                title={query.add ? t("Yangi xona qo'shish") : t("Xonani o'zgartirish")}
                onClose={onClose}
                open={Boolean(query.add) || Boolean(query.edite)}
                width={530}
            >
                <AutoForm props={formData} form={form} layout="vertical" onFinish={onFinish} />
                <div className="flex items-center justify-end gap-3">
                    <Button onClick={onClose}>{t("Bekor qilish")}</Button>
                    <Button type="primary" htmlType="submit" onClick={() => form.submit()}>
                        {query.add ? t("Qo'shish") : t("O'zgartirish")}
                    </Button>
                </div>
            </Drawer>
        </>
    )
}
