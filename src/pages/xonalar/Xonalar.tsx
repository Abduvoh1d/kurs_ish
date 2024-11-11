import {useTranslation} from "react-i18next";
import {Button, Drawer, Dropdown, Empty, FormProps, Table, Typography} from "antd";
import {AutoForm, IForm} from "../../components/auto-form/index..tsx";
import useForm from "antd/es/form/hooks/useForm";
import {useRouterPush} from "../../hooks/use-router-push.ts";
import {useLocationParams} from "../../hooks/use-location-params.ts";
import {IRooms} from "../../types";
import {FiPlus} from "react-icons/fi";
import {HiOutlineDotsVertical} from "react-icons/hi";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import RoomStore from "../../store/Room.ts";
import {useEffect} from "react";
import {ErrorToast, SuccessToast} from "../../components/toastify/Toastify.tsx";

export function Xonalar() {
    const {t} = useTranslation()
    const [form] = useForm()
    const {push} = useRouterPush();
    const {query} = useLocationParams();

    const queryClient = useQueryClient();


    const {data: Rooms, isFetching , isError} = useQuery({
        queryKey: ['rooms'],
        queryFn:(): Promise<IRooms[]> => RoomStore.getRooms()
    })

    const mutation = useMutation({
        mutationKey: ['addRoom'],
        mutationFn: (values: IRooms) => RoomStore.createRooms(values),
        onSuccess: () => {
            queryClient.invalidateQueries(['rooms']);
            SuccessToast("Xona qo'shildi");
        },
        onError: () => {
            ErrorToast("Foydalanuvchi qo'shib bo'lmadi");
        }
    })

    useEffect(() => {
        if (isError) {
            ErrorToast("Xodimlar topilmadi");
        }
    }, [isError]);

    const onFinish: FormProps['onFinish'] = (values: IRooms) => {
        console.log(values);
        mutation.mutate(values)
        onClose()
    };

    function openModal() {
        push({query: {...query, add: true}})
    }

    function onClose() {
        form.resetFields();
        push({query: {...query, add: undefined}})
    }

    const formData = [
        {
            label: t('Xonani nomi'),
            name: 'name',
            size: 'large',
            span: 24,
            required: true,
        },
        {
            label: t("Xona sig’imi"),
            size: 'large',
            name: 'room_capacity',
            required: true,
            span: 24,
            className: 'w-full',
        },
        {
            label: t("Parta va stullar soni"),
            name: 'number_of_desks_and_chairs',
            size: 'large',
            required: true,
            span: 24,
            className: 'w-full',
        }
    ] as IForm[]

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: t('FIO'),
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: t('Telefon raqam'),
            dataIndex: 'room_capacity',
            key: 'room_capacity',
        },
        {
            title: t("Groups"),
            dataIndex: 'number_of_desks_and_chairs',
            key: 'number_of_desks_and_chairs',
        },
        {
            title: t('Hodisa'),
            key: 'action',
            dataIndex: '.',
            render: () => {
                return (
                    <Dropdown menu={{items: [
                            {
                                key: '1',
                                label: (
                                    <p className="cursor-pointer text-[16px]">
                                        {t("O'zgartirish")}
                                    </p>
                                ),
                            },
                            {
                                key: '2',
                                label: (
                                    <p className="cursor-pointer text-[16px]">
                                        {t("O'chirish")}
                                    </p>
                                ),
                            },
                        ]}} trigger={['click']} placement="bottomRight">
                        <HiOutlineDotsVertical className="cursor-pointer"/>
                    </Dropdown>
                );
            },
        }
    ];

    return (
        <>
            <div className={'w-[100%] bg-[#F9F9F9] h-[85vh]'}>
                <div className={'flex items-center justify-between mx-10 pt-7'}>
                    <Typography.Title level={1} className={'!font-[600] !mb-2'}>{t("Xonalar")}</Typography.Title>
                    <Button
                        onClick={openModal}
                        type="primary"
                        className="h-full text-[16px] rounded-xl flex items-center justify-center pb-2"
                    >
              <span className="mt-1">
                <FiPlus/>
              </span>
                        {t("Yangisini qo'shing")}
                    </Button>
                </div>

                <Table<IRooms>
                    columns={columns}
                    dataSource={Rooms}
                    className={'mt-10'}
                    loading={isFetching}
                    size="large"
                    locale={{
                        emptyText: <Empty description={<span>{t("Malumot topilmadi")}</span>}/>,
                    }}/>
            </div>

            <Drawer
                title={t("Yangi xona qo'shish")}
                onClose={onClose}
                open={Boolean(query.add)}
                width={530}
            >
                <AutoForm props={formData} form={form} layout="vertical" onFinish={onFinish}/>
                <div className="flex items-center justify-end gap-3">
                    <Button onClick={onClose}>{t("Bekor qilish")}</Button>
                    <Button type="primary" htmlType="submit" onClick={() => form.submit()}>
                        {query.edite ? t("O'zgartirish") : t("Qo'shish")}
                    </Button>
                </div>
            </Drawer>
        </>
    );
}