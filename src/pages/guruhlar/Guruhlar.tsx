import { Button, Dropdown, FormProps, Table, Typography, Drawer } from "antd"
import { HiOutlineDotsVertical } from "react-icons/hi"
import { AutoForm, IForm } from "../../components/auto-form/index..tsx"
import { useLocationParams } from "../../hooks/use-location-params.ts"
import { useRouterPush } from "../../hooks/use-router-push.ts"
import useForm from "antd/es/form/hooks/useForm"
import { useTranslation } from "react-i18next"
import { FiPlus } from "react-icons/fi"
import { Empty } from "antd"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import GroupStore from "../../store/Groups.ts"
import { IGroups, IRooms } from "../../types"
import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { ErrorToast, SuccessToast } from "../../components/toastify/Toastify.tsx"
import Excel from "../../components/Excel.tsx"
import dayjs from "dayjs"
import RoomStore from "../../store/Room.ts"
import Xodimlar from "../../store/Xodimlar.ts"

export const Guruhlar = observer(() => {
    const [form] = useForm()
    const { push } = useRouterPush()
    const { query } = useLocationParams()
    const { t } = useTranslation()

    const queryClient = useQueryClient()

    const {
        data: groupData,
        isFetching: groupFetching,
        isError,
    } = useQuery<IGroups[]>({
        queryKey: ["groups"],
        queryFn: (): Promise<IGroups[]> => GroupStore.getGroups(),
    })

    const { data: roomData, isFetching: roomFetching } = useQuery<IRooms[]>({
        queryKey: ["rooms"],
        queryFn: (): Promise<IRooms[]> => RoomStore.getRooms(),
        enabled: Boolean(query.add) || Boolean(query.edite),
    })

    const { data: Teachers, isFetching: teacherLoading } = useQuery({
        queryFn: () => Xodimlar.getEmployee("teacher"),
        enabled: Boolean(query.add) || Boolean(query.edite),
    })

    const getOneGroup = useMutation({
        mutationFn: (id: number) => GroupStore.getOneGroup(id),
        onSuccess: (data) => {
            form.setFieldsValue(data)
        },
        onError: () => {
            ErrorToast("Gruppa o'chirib bo'lmadi")
        },
    })

    const createGroup = useMutation({
        mutationKey: ["createGroup"],
        mutationFn: (data: IGroups) => GroupStore.createGroup(data),
        onSuccess: () => {
            SuccessToast("Gruppa qo'shildi")
            queryClient.invalidateQueries(["groups"])
        },
        onError: () => {
            ErrorToast("Gruppa qo'shib bo'lmadi")
        },
    })

    const deleteGroup = useMutation({
        mutationKey: ["deleteGroup"],
        mutationFn: (id: number) => GroupStore.deleteGroup(id),
        onSuccess: () => {
            SuccessToast("Gruppa o'chirildi")
            queryClient.invalidateQueries(["groups"])
        },
        onError: () => {
            ErrorToast("Gruppa o'chirib bo'lmadi")
        },
    })

    useEffect(() => {
        if (isError) {
            ErrorToast("Xodimlar topilmadi")
        }
    }, [isError])

    const onFinish: FormProps["onFinish"] = (values: IGroups) => {
        if (query.edite) {
            console.log("update")
        } else {
            values.course_start_time = dayjs(values.course_start_time).format("HH:mm:ss")
            createGroup.mutate(values)
        }
        onClose()
    }

    function openModal() {
        push({ query: { ...query, add: true } })
    }

    function edite(id: number) {
        getOneGroup.mutate(id)
        push({ query: { ...query, edite: true, id } })
    }

    function onClose() {
        form.resetFields()
        push({
            query: { ...query, edite: undefined, id: undefined, add: undefined },
        })
    }

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: t("Guruhlar"),
            dataIndex: "name",
            key: "name",
        },
        {
            title: t("Ustozlar"),
            dataIndex: "teacher",
            key: "teacher",
        },
        {
            title: t("Vaqt"),
            dataIndex: "course_start_time",
            key: "course_start_time",
        },
        {
            title: t("Kun"),
            dataIndex: "day",
            key: "day",
        },
        {
            title: t("Hodisa"),
            key: "days",
            dataIndex: ".",
            render: (_: unknown, item: IGroups) => {
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
                                    onClick: () => deleteGroup.mutate(item.id),
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

    // const storyTable = [
    //     {
    //         title: "Name",
    //         dataIndex: "name",
    //         key: "name",
    //     },
    //     {
    //         title: "22-yan",
    //         dataIndex: "day",
    //         key: "22-yan",
    //         render: (day: boolean) => (
    //             <div
    //                 className={`w-[40px] h-[40px] flex items-center justify-center rounded-full ${day == null ? "bg-[#D0D9DD]" : day ? "bg-green-500" : "bg-red-500"}`}
    //             >
    //                 {day == null ? (
    //                     <></>
    //                 ) : day ? (
    //                     <IoIosCheckmark className={"text-white text-[26px]"} />
    //                 ) : (
    //                     <IoMdClose className={"text-white text-[18px]"} />
    //                 )}
    //             </div>
    //         ),
    //     },
    //     {
    //         title: "23-yan",
    //         dataIndex: "day",
    //         key: "23-yan",
    //         render: (day: boolean) => (
    //             <div
    //                 className={`w-[40px] h-[40px] flex items-center justify-center rounded-full ${day == null ? "bg-[#D0D9DD]" : day ? "bg-green-500" : "bg-red-500"}`}
    //             >
    //                 {day == null ? (
    //                     <></>
    //                 ) : day ? (
    //                     <IoIosCheckmark className={"text-white text-[26px]"} />
    //                 ) : (
    //                     <IoMdClose className={"text-white text-[18px]"} />
    //                 )}
    //             </div>
    //         ),
    //     },
    //     {
    //         title: "24-yan",
    //         dataIndex: "day",
    //         key: "24-yan",
    //         render: (day: boolean) => (
    //             <div
    //                 className={`w-[40px] h-[40px] flex items-center justify-center rounded-full ${day == null ? "bg-[#D0D9DD]" : day ? "bg-green-500" : "bg-red-500"}`}
    //             >
    //                 {day == null ? (
    //                     <></>
    //                 ) : day ? (
    //                     <IoIosCheckmark className={"text-white text-[26px]"} />
    //                 ) : (
    //                     <IoMdClose className={"text-white text-[18px]"} />
    //                 )}
    //             </div>
    //         ),
    //     },
    // ]

    // const storyData = [
    //     { key: "1", name: "Python", day: false },
    //     { key: "2", name: "Python" },
    //     { key: "3", name: "Python", day: true },
    //     { key: "4", name: "Python", day: false },
    // ]

    const formData: IForm[] = [
        {
            label: t("Kurs nomi"),
            name: "name",
            size: "large",
            span: 24,
            required: true,
        },
        {
            label: t("O'qituvchi tanlang"),
            span: 24,
            size: "large",
            type: "select",
            name: "teacher",
            required: true,
            option:
                Teachers && !teacherLoading ? Teachers.map((item) => ({ label: item.first_name, value: item.id })) : [],
        },
        {
            label: t("Kun"),
            span: 24,
            size: "large",
            type: "select",
            name: "day",
            required: true,
            option: [
                { label: t("Har kun"), value: t("har kun") },
                { label: t("Juft kun"), value: t("juft kun") },
                { label: t("Toq kun"), value: t("toq kun") },
            ],
        },
        {
            label: t("Xonani tanlang"),
            span: 24,
            size: "large",
            type: "select",
            name: "room",
            required: true,
            option: roomData && !roomFetching ? roomData.map((item) => ({ label: item.name, value: item.id })) : [],
        },
        {
            label: t("Vaqt"),
            size: "large",
            type: "timePicker",
            name: "course_start_time",
            required: true,
            className: "w-full",
        },
    ]

    return (
        <div className="w-full bg-[#F9F9F9] h-full overflow-auto">
            {/*{query.id ? (*/}
            {/*    <div className="p-10">*/}
            {/*        <div className="text-[40px] font-[600]">Web design | English Beginner | Ru.Abdulloh</div>*/}
            {/*        <Row className="pt-5 w-full gap-10">*/}
            {/*            <Col span={7} className={"p-5 max-h-auto shadow-lg"}>*/}
            {/*                <div className={"flex flex-col gap-5"}>*/}
            {/*                    <div className={"flex justify-between items-center"}>*/}
            {/*                        <p className={"text-[24px] font-[500]"}>Web design</p>*/}

            {/*                        <div className={"flex items-center gap-3"}>*/}
            {/*                            <div className={"p-2 rounded-full border-2 border-[#7338AC] text-[#7338AC]"}>*/}
            {/*                                <HiPencil className={"text-[18px]"} />*/}
            {/*                            </div>*/}
            {/*                            <div className={"p-2 text-[#7338AC] text-[24px]"}>*/}
            {/*                                <FaRegTrashAlt />*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}

            {/*                    <p className={"text-[18px] font-[500] text-[#455B66]"}>*/}
            {/*                        English Beginner | Ru.Abdulloh*/}
            {/*                    </p>*/}

            {/*                    <div>*/}
            {/*                        <p className={"text-[16px] font-[500] text-[#617E8C]"}>{t("Narxi")}:</p>*/}
            {/*                        <p className={"text-[20px] font-[600]"}>500 000 UZS</p>*/}
            {/*                    </div>*/}

            {/*                    <div>*/}
            {/*                        <p className={"text-[16px] font-[500] text-[#617E8C]"}>{t("Kunlar")}:</p>*/}
            {/*                        <p className={"text-[20px] font-[600]"}>Juft kunlari</p>*/}
            {/*                    </div>*/}

            {/*                    <div>*/}
            {/*                        <p className={"text-[16px] font-[500] text-[#617E8C]"}>{t("Xona")}:</p>*/}
            {/*                        <p className={"text-[20px] font-[600]"}>Blue Room</p>*/}
            {/*                    </div>*/}

            {/*                    <div>*/}
            {/*                        <p className={"text-[16px] font-[500] text-[#617E8C]"}>{t("Boshlanish vaqti")}:</p>*/}
            {/*                        <p className={"text-[20px] font-[600]"}>08:00</p>*/}
            {/*                    </div>*/}

            {/*                    <div>*/}
            {/*                        <p className={"text-[16px] font-[500] text-[#617E8C]"}>{t("Boshlanish sanasi")}:</p>*/}
            {/*                        <p className={"text-[20px] font-[600]"}>2021 - 01 - 01</p>*/}
            {/*                    </div>*/}

            {/*                    <div>*/}
            {/*                        <p className={"text-[16px] font-[500] text-[#617E8C]"}>{t("Boshlanish sanasi")}:</p>*/}
            {/*                        <p className={"text-[20px] font-[600]"}>2021 - 07 - 01</p>*/}
            {/*                    </div>*/}

            {/*                    <div className={"line-through w-[100%] h-[2px] bg-[#D7DEE2]"}></div>*/}

            {/*                    <div className={"flex items-center"}>*/}
            {/*                        <p className={"text-[18px] w-[33%] font-[600] flex justify-start"}>{t("Ism")}</p>*/}
            {/*                        <p className={"text-[18px] w-[33%] font-[600] flex justify-start"}>{t("Raqam")}</p>*/}
            {/*                        <p className={"text-[18px] w-[33%] font-[600] flex justify-center"}>*/}
            {/*                            {t("Hodisa")}*/}
            {/*                        </p>*/}
            {/*                    </div>*/}

            {/*                    <div className={"flex items-center"}>*/}
            {/*                        <p className={"w-[33%] text-[14px] font-[500] text-[#455B66]"}>Omadbek</p>*/}
            {/*                        <p className={"w-[33%] text-[14px] font-[500] text-[#455B66]"}>94 778 33 73</p>*/}
            {/*                        <div*/}
            {/*                            className={*/}
            {/*                                "w-[15%] flex items-center justify-center m-auto rounded-xl bg-[#7338AC] text-white cursor-pointer"*/}
            {/*                            }*/}
            {/*                        >*/}
            {/*                            <HiOutlineDotsHorizontal size={20} />*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </Col>*/}
            {/*            <Col span={15} className={"max-h-auto"}>*/}
            {/*                <Table*/}
            {/*                    columns={storyTable}*/}
            {/*                    dataSource={storyData}*/}
            {/*                    size="large"*/}
            {/*                    locale={{*/}
            {/*                        emptyText: <Empty description={<span>{t("Malumot topilmadi")}</span>} />,*/}
            {/*                    }}*/}
            {/*                ></Table>*/}
            {/*            </Col>*/}
            {/*        </Row>*/}
            {/*    </div>*/}
            {/*) : (*/}
            <>
                <div className="flex items-center justify-between mx-10 pt-7">
                    <div className="flex items-center gap-5">
                        <Typography.Title level={1} className="!font-semibold !mb-2">
                            {t("Groups")}
                        </Typography.Title>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-2xl text-lg">{t("Davomat")}</button>
                    </div>

                    <div className="flex items-center gap-1">
                        <Excel name={"GroupTable"} />
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

                <div className="mt-10">
                    <Table<IGroups>
                        id="GroupTable"
                        columns={columns}
                        dataSource={groupData}
                        loading={groupFetching}
                        size="large"
                        locale={{
                            emptyText: <Empty description={<span>{t("Malumot topilmadi")}</span>} />,
                        }}
                    />
                </div>

                <Drawer
                    title={t("Yangi guruh qo'shish")}
                    onClose={onClose}
                    open={Boolean(query.add) || Boolean(query.edite)}
                    width={530}
                >
                    <AutoForm props={formData} form={form} layout="vertical" onFinish={onFinish} />
                    <div className="flex items-center justify-end gap-3">
                        <Button onClick={onClose}>{t("Bekor qilish")}</Button>
                        <Button type="primary" htmlType="submit" onClick={() => form.submit()}>
                            {query.edite ? t("O'zgartirish") : t("Qo'shish")}
                        </Button>
                    </div>
                </Drawer>
            </>
            {/*}*/}
        </div>
    )
})
