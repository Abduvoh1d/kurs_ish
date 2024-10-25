import {useTranslation} from "react-i18next";
import {Button, Drawer, Dropdown, FormProps, MenuProps, Segmented, Table, Typography} from "antd";
import {useRouterPush} from "../../hooks/use-router-push.ts";
import {useLocationParams} from "../../hooks/use-location-params.ts";
import {FiPlus} from "react-icons/fi";
import {Empty} from 'antd';
import {HiOutlineDotsVertical} from "react-icons/hi";
import {AutoForm, IForm} from "../../components/auto-form/index..tsx";
import useForm from "antd/es/form/hooks/useForm";

export const Guruhlar = () => {
    const [form] = useForm()
    const {push} = useRouterPush();
    const {query} = useLocationParams();
    const {t} = useTranslation();

    const onFinish: FormProps['onFinish'] = (values) => {
        console.log(values);
        onClose()
    };

    const segmentOptions = [
        {label: t('Faol'), value: t('Faol')},
        {label: t('Arxiv'), value: t('Arxiv')},
    ];

    const handleSegmentChange = (value: string) => {
        push({query: {...query, sort: value}});
    };

    function openModal() {
        push({query: {...query, add: true}})
    }

    function onClose() {
        form.resetFields();
        push({query: {...query, add: undefined, edite: undefined}})
    }

    function edite() {
        push({query: {...query, edite: true}})
    }

    const menuItems: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <p className="cursor-pointer text-[16px]" onClick={edite}>
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
    ];

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: t('Guruhlar'),
            dataIndex: 'groups',
            key: 'groups',
        },
        {
            title: t('Ustozlar'),
            dataIndex: 'teacher',
            key: 'teacher',
        },
        {
            title: t("O'quvchi raqam"),
            dataIndex: 'number',
            key: 'number',
        },
        {
            title: t('Vaqt'),
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: t('Kun'),
            dataIndex: 'days',
            key: 'days',
        },
        {
            title: t('Hodisa'),
            key: 'days',
            dataIndex: '.',
            render: () => {
                return (
                    <Dropdown menu={{ items: menuItems }} trigger={['click']} placement="bottomRight">
                        <HiOutlineDotsVertical className="cursor-pointer" />
                    </Dropdown>
                );
            },
        }
    ];

    const data = [
        {
            key: '1',
            id: 1,
            groups: 'Mathematics Group A',
            teacher: 'John Doe',
            number: '10',
            time: '10:00 - 11:30',
            days: 'Mon, Wed, Fri',
        },
        {
            key: '2',
            id: 2,
            groups: 'Physics Group B',
            teacher: 'Jane Smith',
            number: '15',
            time: '12:00 - 13:30',
            days: 'Tue, Thu',
        },
        {
            key: '3',
            id: 3,
            groups: 'Chemistry Group C',
            teacher: 'Dr. Albert',
            number: '8',
            time: '14:00 - 15:30',
            days: 'Mon, Wed',
        },
    ];

    const formData = [
        {
            label: t('Kurs nomi'),
            name: 'kurs',
            size: 'large',
            span: 24,
            required: true,
        },
        {
            label: t("O'qituvchi tanlang"),
            span: 24,
            size: 'large',
            type: 'select',
            name: 'teacher',
            required: true,
            option: [
                {label: "Tech1", value: "tech1"},
                {label: "Tech2", value: "tech2"},
                {label: "Tech3", value: "tech3"},
            ]
        },
        {
            label: t("Kun"),
            span: 24,
            size: 'large',
            type: 'select',
            name: 'days',
            required: true,
            option: [
                {label: t("Dushanba"), value: t("Dushanba")},
                {label: t("Seshanba"), value: t("Seshanba")},
                {label: t("Chorshanba"), value: t("Chorshanba")},
                {label: t("Payshanba"), value: t("Payshanba")},
                {label: t("Juma"), value: t("Juma")},
                {label: t("Shanba"), value: t("Shanba")},
                {label: t("Yakshanba"), value: t("Yakshanba")},
            ]
        },
        {
            label: t("Xonani tanlang"),
            span: 24,
            size: 'large',
            type: 'select',
            name: 'room',
            required: true,
            option: [
                {label: "Room1", value: "room1"},
            ]
        },
        {
            label: t("Kun"),
            size: 'large',
            type: 'datePicker',
            name: 'date',
            required: true,
            className: 'w-full',
        },
        {
            label: t("Vaqt"),
            size: 'large',
            type: 'timePicker',
            name: 'time',
            required: true,
            className: 'w-full',
        }
    ] as IForm[]

    return (
        <div className="w-full bg-[#F9F9F9] h-[82vh]">
            <div className="flex items-center justify-between mx-10 pt-7">
                {/* Title and Button */}
                <div className="flex items-center gap-5">
                    <Typography.Title level={1} className="!font-semibold !mb-2">
                        {t("Groups")}
                    </Typography.Title>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-2xl text-lg">
                        {t("Davomat")}
                    </button>
                </div>

                <div className={'flex items-center gap-3'}>
                    <Segmented
                        defaultChecked={true}
                        options={segmentOptions}
                        value={query.sort as string}
                        onChange={handleSegmentChange}
                        className="w-[250px] shadow-md"
                        size={'large'}
                        type={'primary'}
                        block
                    />

                    <Button onClick={openModal} type={'primary'}
                            className={'h-[100%] text-[16px] rounded-xl flex items-center justify-center pb-2'}><span
                        className={'mt-1'}><FiPlus/></span>{t("Yangisini qo'shing")}</Button>
                </div>
            </div>

            <div className={'mt-10'}>
                <Table id={'GroupTable'} columns={columns} dataSource={data} size="large" locale={{
                    emptyText: (
                        <Empty
                            description={<span>{t("Malumot topilmadi")}</span>}
                        />
                    ),
                }}/>
            </div>

            <Drawer
                title={t("Yangi guruh qo’shish")}
                onClose={onClose}
                open={Boolean(query.add) || Boolean(query.edite)}
                width={530}
            >
                <AutoForm props={formData} form={form} layout="vertical" onFinish={onFinish}/>
                <div className={'flex items-center justify-end gap-3'}>
                    <Button onClick={onClose}>{t("Bekor qilish")}</Button>
                    <Button type="primary" htmlType="submit" onClick={() => form.submit()}>
                        {query.edite ? t("O'zgartirish") : t("Qo'shish")}
                    </Button>
                </div>
            </Drawer>
        </div>
    );
};
