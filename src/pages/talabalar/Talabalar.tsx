import {useTranslation} from "react-i18next";
import {Button, Drawer, Dropdown, Empty, FormProps, MenuProps, Segmented, Table, Typography} from "antd";
import {FiPlus} from "react-icons/fi";
import {AutoForm, IForm} from "../../components/auto-form/index..tsx";
import useForm from "antd/es/form/hooks/useForm";
import {useRouterPush} from "../../hooks/use-router-push.ts";
import {useLocationParams} from "../../hooks/use-location-params.ts";
import {HiOutlineDotsVertical} from "react-icons/hi";

export function Talabalar() {
    const {t} = useTranslation()
    const [form] = useForm()
    const {push} = useRouterPush();
    const {query} = useLocationParams();

    const onFinish: FormProps['onFinish'] = (values) => {
        console.log(values);
        onClose()
    };

    const segmentOptions = [
        {label: t('Talabalar'), value: t('Talabalar')},
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
            title: t('FIO'),
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: t('Telefon raqam'),
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: t("Groups"),
            dataIndex: 'group',
            key: 'group',
        },
        {
            title: t('Rol'),
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: t('Hodisa'),
            key: 'days',
            dataIndex: '.',
            render: () => {
                return (
                    <Dropdown menu={{items: menuItems}} trigger={['click']} placement="bottomRight">
                        <HiOutlineDotsVertical className="cursor-pointer"/>
                    </Dropdown>
                );
            },
        }
    ];

    const data = [
        {
            key: '1',
            id: 1,
            fullName: 'John Doe',
            phone: '+998901234567',
            group: 'Mathematics Group A',
            role: 'Admin',
        },
        {
            key: '2',
            id: 2,
            fullName: 'Jane Smith',
            phone: '+998909876543',
            group: 'Physics Group B',
            role: 'Ustoz',
        },
        {
            key: '3',
            id: 3,
            fullName: 'Dr. Albert',
            phone: '+998907654321',
            group: 'Chemistry Group C',
            role: 'O\'quvchi',
        },
    ];


    const formData = [
        {
            label: t('Familiya'),
            name: 'surname',
            size: 'large',
            span: 24,
            required: true,
        },
        {
            label: t("Ism"),
            span: 24,
            size: 'large',
            name: 'name',
            required: true,
        },
        {
            label: t("Telefon raqam"),
            span: 24,
            size: 'large',
            name: 'days',
            required: true,
        },
        {
            label: t("Parol"),
            span: 24,
            size: 'large',
            type: 'password',
            name: 'password',
            required: true,
        },
        {
            label: t("Rol"),
            size: 'large',
            type: 'select',
            name: 'role',
            span: 24,
            option: [
                {label: t('Admin'), value: t('Admin')},
                {label: t('Ustoz'), value: t('Ustoz')},
                {label: t('O\'quvchi'), value: t('O\'quvchi')},
            ],
            className: 'w-full',
            required: true,
        },
        {
            label: t("Tug'ilgan kuni"),
            size: 'large',
            type: 'datePicker',
            name: 'dataOfBirth',
            required: true,
            className: 'w-full',
            span: 12,
        },
        {
            label: t("Jins"),
            size: 'large',
            type: 'radio',
            radioOptions: [
                {label: t('Erkak'), value: t('Erkak')},
                {label: t('Ayol'), value: t('Ayol')}
            ],
            name: 'gender',
            required: true,
            className: 'w-full',
            span: 12,
        }
    ] as IForm[]

    return (
        <div className="w-full bg-[#F9F9F9] h-[84vh]">
            <div className="flex items-center justify-between mx-10 pt-7">
                <Typography.Title level={1} className="!font-semibold !mb-2">
                    {t("Talabalar")}
                </Typography.Title>

                <div className={'flex items-center gap-3'}>
                    <Segmented
                        defaultChecked={true}
                        options={segmentOptions}
                        value={query.sort as string}
                        onChange={handleSegmentChange}
                        className="w-[250px] shadow-md"
                        size={'large'}
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
}