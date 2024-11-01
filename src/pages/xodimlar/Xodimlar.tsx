import {useTranslation} from "react-i18next";
import {Button, Col, Drawer, Dropdown, Empty, FormProps, Row, Segmented, Table, Typography} from "antd";
import {FiPlus} from "react-icons/fi";
import {AutoForm, IForm} from "../../components/auto-form/index..tsx";
import useForm from "antd/es/form/hooks/useForm";
import {useRouterPush} from "../../hooks/use-router-push.ts";
import {useLocationParams} from "../../hooks/use-location-params.ts";
import {HiOutlineDotsVertical} from "react-icons/hi";
import dayjs from "dayjs";
import {LuPencil} from "react-icons/lu";
import {IoIosCheckmark, IoMdClose} from "react-icons/io";

export const Xodimlar = () => {
    const {t} = useTranslation();
    const [form] = useForm();
    const [profileForm] = useForm();
    const {push} = useRouterPush();
    const {query} = useLocationParams();

    const onFinish: FormProps['onFinish'] = (values) => {
        if (values.dataOfBirth) {
            values.dataOfBirth = dayjs(values.dataOfBirth).format("DD/MM/YYYY");
        }
        console.log(values);
        onClose();
    };

    const editeFinish: FormProps['onFinish'] = (values) => {
        push({query: {...query, edite: undefined}})
        console.log(values);
    };

    const handleSegmentChange = (value: string) => {
        push({query: {...query, sort: value}});
    };

    const openModal = () => {
        push({query: {...query, add: true}});
    };

    const onClose = () => {
        form.resetFields();
        push({query: {...query, add: undefined}});
    };

    const edite = () => {
        push({query: {...query, edite: true}})
    }

    const onePerson = (item: unknown) => {
        push({query: {...query, profile: true, sort: t('Profile')}});
        // profileForm.setFields(item)
        console.log(item)
    };

    const segmentOptions = [
        {label: t('Faol'), value: t('Faol')},
        {label: t('Ustozlar'), value: t('Ustozlar')},
        {label: t('Boshqa xodimlar'), value: t('Boshqa xodimlar')},
    ];

    const editeSegmentOptions = [
        {label: t('Profile'), value: t('Profile')},
        {label: t('Hikoya'), value: t('Hikoya')},
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
            title: t('Phone'),
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: t("Rol"),
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: t('Hodisa'),
            key: 'days',
            dataIndex: '.',
            render: (_: unknown, item: unknown) => (
                <Dropdown menu={{
                    items: [
                        {
                            key: '1',
                            label: (
                                <p className="cursor-pointer text-[16px]" onClick={() => onePerson(item)}>
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
                    ]
                }} trigger={['click']} placement="bottomRight">
                    <HiOutlineDotsVertical className="cursor-pointer"/>
                </Dropdown>
            ),
        },
    ];

    const storyTable = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '22-yan',
            dataIndex: 'day',
            key: '22-yan',
            render: (day: boolean) => (
                <div
                    className={`w-[40px] h-[40px] flex items-center justify-center rounded-full ${day == null ? 'bg-gray-500' : day ? 'bg-green-500' : 'bg-red-500'}`}>
                    {day == null ? <></> : (day ? <IoIosCheckmark className={'text-white text-[26px]'}/> :
                        <IoMdClose className={'text-white text-[18px]'}/>)}
                </div>
            )
        },
        {
            title: '23-yan',
            dataIndex: 'day',
            key: '23-yan',
            render: (day: boolean) => (
                <div
                    className={`w-[40px] h-[40px] flex items-center justify-center rounded-full ${day == null ? 'bg-gray-500' : day ? 'bg-green-500' : 'bg-red-500'}`}>
                    {day == null ? <></> : (day ? <IoIosCheckmark className={'text-white text-[26px]'}/> :
                        <IoMdClose className={'text-white text-[18px]'}/>)}
                </div>
            )
        },
        {
            title: '24-yan',
            dataIndex: 'day',
            key: '24-yan',
            render: (day: boolean) => (
                <div
                    className={`w-[40px] h-[40px] flex items-center justify-center rounded-full ${day == null ? 'bg-gray-500' : day ? 'bg-green-500' : 'bg-red-500'}`}>
                    {day == null ? <></> : (day ? <IoIosCheckmark className={'text-white text-[26px]'}/> :
                        <IoMdClose className={'text-white text-[18px]'}/>)}
                </div>
            )
        }
    ]

    const storyData = [
        {key: '1', name: 'Python', day: false},
        {key: '2', name: 'Python'},
        {key: '3', name: 'Python', day: true},
        {key: '4', name: 'Python', day: false},
    ]

    const data = [
        {key: '1', id: 1, fullName: 'John Doe', phone: '+998 90 123 45 67', role: 'Mathematics Teacher'},
        {key: '2', id: 2, fullName: 'Jane Smith', phone: '+998 91 987 65 43', role: 'Physics Teacher'},
        {key: '3', id: 3, fullName: 'Dr. Albert', phone: '+998 93 345 67 89', role: 'Chemistry Teacher'},
    ];

    const formData: IForm[] = [
        {label: t('Familiya'), name: 'surname', size: 'large', span: 24, required: true},
        {label: t("Ism"), name: 'name', size: 'large', span: 24, required: true},
        {label: t("Telefon raqam"), name: 'days', size: 'large', span: 24, required: true},
        {label: t("Parol"), name: 'password', type: 'password', size: 'large', span: 24, required: true},
        {
            label: t("Rol"),
            name: 'role',
            type: 'select',
            size: 'large',
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
            name: 'dataOfBirth',
            type: 'datePicker',
            size: 'large',
            span: 12,
            className: 'w-full',
            required: true,
        },
        {
            label: t("Jins"),
            name: 'gender',
            type: 'radio',
            radioOptions: [
                {label: t('Erkak'), value: t('Erkak')},
                {label: t('Ayol'), value: t('Ayol')},
            ],
            size: 'large',
            span: 12,
            className: 'w-full',
            required: true,
        },
    ];

    const profileData = [
        {
            label: t('Telefon raqam'),
            name: 'phone',
            type: 'phone',
            size: 'large',
            span: 24,
            disabled: Boolean(!query.edite)
        },
        {
            label: t('Parol'),
            name: 'password',
            type: 'password',
            size: 'large',
            span: 24,
            disabled: Boolean(!query.edite)
        },
        {label: t('Balance'), name: 'balance', size: 'large', span: 24, disabled: Boolean(!query.edite)},
        {
            label: t('Rol'),
            name: 'role',
            type: 'select',
            option: [
                {label: t('Admin'), value: t('Admin')},
                {label: t('Ustoz'), value: t('Ustoz')},
                {label: t('O\'quvchi'), value: t('O\'quvchi')},
            ],
            size: 'large',
            span: 24,
            disabled: Boolean(!query.edite)
        },
        {label: t('Branch'), name: 'branch', size: 'large', span: 24, disabled: Boolean(!query.edite)},
    ] as IForm[]

    return (
        <>
            {!query.profile ? (
                <div className="w-full h-full bg-[#F9F9F9]">
                    <div className="flex items-center justify-between mx-10 pt-7">
                        <Typography.Title level={1} className="!font-semibold !mb-2">
                            {t("Xodimlar")}
                        </Typography.Title>
                        <div className="flex items-center gap-3">
                            <Segmented
                                options={segmentOptions}
                                value={query.sort as string}
                                onChange={handleSegmentChange}
                                className="w-[350px] shadow-md"
                                size="large"
                                block
                            />
                            <Button
                                onClick={openModal}
                                type="primary"
                                className="h-full text-[16px] rounded-xl flex items-center justify-center pb-2"
                            >
                                <FiPlus className="mt-1"/>
                                {t("Yangisini qo'shing")}
                            </Button>
                        </div>
                    </div>
                    <div className="mt-10">
                        <Table
                            id="GroupTable"
                            columns={columns}
                            dataSource={data}
                            size="large"
                            locale={{
                                emptyText: <Empty description={<span>{t("Malumot topilmadi")}</span>}/>,
                            }}
                        />
                    </div>
                    <Drawer
                        title={t("Yangi guruh qo’shish")}
                        onClose={onClose}
                        open={Boolean(query.add)}
                        width={530}
                    >
                        <AutoForm props={formData} form={form} layout="vertical" onFinish={onFinish}/>
                        <div className="flex items-center justify-end gap-3">
                            <Button onClick={onClose}>{t("Bekor qilish")}</Button>
                            <Button type="primary" htmlType="submit" onClick={() => form.submit()}>
                                {t("O'zgartirish")}
                            </Button>
                        </div>
                    </Drawer>
                </div>
            ) : (
                <div className={'px-10 pt-5 bg-[#F9F9F9] overflow-y-auto'}>
                    <div className={'flex justify-between items-center gap-4 me-10'}>
                        <div className={'flex items-center gap-5'}>
                            <Typography.Title level={1} className="!font-semibold !mb-2">
                                {t("Xodimlar")}
                            </Typography.Title>

                            <p className={'text-[16px] mt-1 text-gray-400 underline'}>
                                {t("Xodim profilida")}
                            </p>
                        </div>

                        <Segmented
                            options={editeSegmentOptions}
                            value={query.sort as string}
                            onChange={handleSegmentChange}
                            className="w-[200px] shadow-md"
                            size="large"
                            block
                        />

                        <div></div>
                    </div>

                    {query.sort === t('Profile') ? (
                        <Row className={'my-10 gap-8'}>
                            <Col span={8} className={'px-5 py-9 bg-white shadow-lg'}>
                                <div className={'w-[100%] flex justify-end'}>
                                    <div onClick={edite} className={'p-3 bg-orange-300 rounded-full cursor-pointer'}>
                                        <LuPencil/>
                                    </div>
                                </div>

                                <div className={'flex flex-col items-center'}>
                                    <div>
                                        <img src="/user.svg" alt="user" width={150} height={150}/>
                                    </div>

                                    <p className={'mt-2 font-[500] text-[16px]]'}>Abduvohidov Abdurazzoq</p>
                                    <p className={'text-[#8F8F8F] font-[Poppins]'}>(id: 11587)</p>
                                </div>

                                <AutoForm props={profileData} form={profileForm} onFinish={editeFinish}/>

                                {Boolean(query.edite) && (
                                    <div className={'w-[100%] flex items-center justify-end gap-3'}>
                                        <Button type={'default'} className={'px-4 py-4 text-[14px]'}
                                                onClick={() => push({
                                                    query: {
                                                        ...query,
                                                        edite: undefined
                                                    }
                                                })}>{t("Bekor qilish")}</Button>
                                        <Button type={'primary'} className={'px-4 py-4 text-[14px]'}
                                                onClick={() => profileForm.submit()}>{t("O'zgartirish")}</Button>
                                    </div>
                                )}
                            </Col>
                            <Col span={15} className={'w-[100%]'}>
                                <p className={'text-[26px] font-[600] font-[Poppins]'}>Groups</p>

                                <Row className={'mb-5 mt-2'}>
                                    <Col span={12} className={'px-2 mb-2'}>
                                        <div
                                            className={'bg-white shadow-md flex items-center justify-evenly py-3 px-3'}>
                                            <div className={'flex items-center w-[100%]  gap-3'}>
                                                <div
                                                    className={'bg-blue-600 px-5 py-1 text-white rounded-md text-[10px]'}>РУССГР1
                                                </div>
                                                <p className={'text-[12px] font-[500]'}>Python</p>
                                            </div>

                                            <div className={'flex items-center gap-3'}>
                                                <p>15:30</p>
                                                <p>Четные дни</p>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col span={12} className={'px-2 mb-2'}>
                                        <div
                                            className={'bg-white shadow-md flex items-center justify-evenly py-3 px-3'}>
                                            <div className={'flex items-center w-[100%]  gap-3'}>
                                                <div
                                                    className={'bg-blue-600 px-5 py-1 text-white rounded-md text-[10px]'}>РУССГР1
                                                </div>
                                                <p className={'text-[12px] font-[500]'}>Python</p>
                                            </div>

                                            <div className={'flex items-center gap-3'}>
                                                <p>15:30</p>
                                                <p>Четные дни</p>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>

                                <div>
                                    <p className={'text-[20px] font-[600]'}>{t('Payments')}</p>

                                    <div
                                        className={'h-[75vh] w-[100%] overflow-y-auto mt-5 bg-white flex flex-col gap-8'}>
                                        <div
                                            className={'flex items-center bg-[#F7F7F7] p-5 shadow-lg'}>
                                            <p className={'text-[14px] font-[500] w-[50%]'}>Date of payment</p>
                                            <p>23.02.2023</p>
                                        </div>

                                        <div
                                            className={'flex items-center bg-[#F7F7F7] p-5 shadow-lg'}>
                                            <p className={'text-[14px] font-[500] w-[50%]'}>Groups</p>
                                            <p>-</p>
                                        </div>

                                        <div
                                            className={'flex items-center bg-[#F7F7F7] p-5 shadow-lg'}>
                                            <p className={'text-[14px] font-[500] w-[50%]'}>Amount</p>
                                            <p className={' w-[50%]'}><span
                                                className={'text-[#0ABF49]'}>400 000</span> UZS
                                            </p>
                                        </div>

                                        <div
                                            className={'flex items-center bg-[#F7F7F7] p-5 shadow-lg'}>
                                            <p className={'text-[14px] font-[500] w-[50%]'}>Comment</p>
                                            <div>Lorem ipsum</div>
                                        </div>

                                        <div
                                            className={'flex items-center bg-[#F7F7F7] p-5 shadow-lg'}>
                                            <p className={'text-[14px] font-[500] w-[50%]'}>Who Paid</p>
                                            <div>Ra. Abdullah</div>
                                        </div>

                                        <div
                                            className={'flex items-center bg-[#F7F7F7] p-5 shadow-lg'}>
                                            <p className={'text-[14px] font-[500] w-[50%]'}>How many students?</p>
                                            <p>44</p>
                                        </div>

                                        <div
                                            className={'flex items-center bg-[#F7F7F7] p-5 shadow-lg'}>
                                            <p className={'text-[14px] font-[500] w-[50%]'}>Credit</p>
                                            <div><span className={'text-[#E70C0C]'}>-400 000</span> UZS
                                            </div>
                                        </div>

                                        <div
                                            className={'flex items-center bg-[#F7F7F7] px-5 py-4 shadow-lg'}>
                                            <p className={'text-[14px] font-[500] w-[50%]'}>Return</p>
                                            <button
                                                className={' bg-[#E70C0C] text-white px-4 py-1 rounded-md'}>Return
                                            </button>
                                        </div>

                                        <div
                                            className={'flex items-center bg-[#F7F7F7] p-5 shadow-lg'}>
                                            <p className={'text-[14px] font-[500] w-[50%]'}>Monthly output</p>
                                            <p><span
                                                className={'text-[#0ABF49]'}>400 000</span> UZS</p>
                                            <div></div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    ) : (query.sort === t('Hikoya') && (
                        <Row className={'my-10'}>
                            <Col span={13} className={'pe-5'}>
                                <div className={'w-[100%] h-[100%] flex flex-col gap-5'}>
                                    <div className={'flex items-center bg-white px-8 py-3 rounded-xl'}>
                                        <p className={'text-[16px] font-[600] w-[50%]'}>Id</p>
                                        <p className={'text-[#455B66] text-[16px]'}>11587</p>
                                    </div>

                                    <div className={'flex items-center bg-white px-8 py-3 rounded-xl'}>
                                        <p className={'text-[16px] font-[600] w-[50%]'}>Course name</p>
                                        <p className={'text-[#455B66] text-[16px]'}>Python</p>
                                    </div>

                                    <div className={'flex items-center bg-white px-8 py-3 rounded-xl'}>
                                        <p className={'text-[16px] font-[600] w-[50%]'}>Date</p>
                                        <p className={'text-[#455B66] text-[16px]'}>28.03.2023 12:45:10</p>
                                    </div>

                                    <div className={'flex items-center bg-white px-8 py-3 rounded-xl'}>
                                        <p className={'text-[16px] font-[600] w-[50%]'}>Attendance</p>
                                        <p className={'text-[#455B66] text-[16px]'}>28/30</p>
                                    </div>

                                    <div className={'flex items-center bg-white px-8 py-3 rounded-xl'}>
                                        <p className={'text-[16px] font-[600] w-[50%]'}>Sum</p>
                                        <p className={'text-[#455B66] text-[16px]'}>1 000 000</p>
                                    </div>

                                    <div className={'flex items-center bg-white px-8 py-3 rounded-xl'}>
                                        <p className={'text-[16px] font-[600] w-[50%]'}>Paid</p>
                                        <p className={'text-[#455B66] text-[16px]'}>500 000</p>
                                    </div>

                                    <div className={'flex items-center bg-white px-8 py-3 rounded-xl'}>
                                        <p className={'text-[16px] font-[600] w-[50%]'}>Duty</p>
                                        <p className={'text-[#455B66] text-[16px]'}>500 000</p>
                                    </div>

                                    <div className={'flex items-center bg-white px-8 py-3 rounded-xl'}>
                                        <p className={'text-[16px] font-[600] w-[50%]'}>Teacher</p>
                                        <p className={'text-[#455B66] text-[16px]'}>Ruxtamxojayev Abdulloh</p>
                                    </div>
                                </div>
                            </Col>
                            <Col span={11} className={'ps-5'}>
                                <div className={'w-[100%] h-[100%]'}>
                                    <Table
                                        columns={storyTable}
                                        dataSource={storyData}
                                        size="large"
                                        locale={{
                                            emptyText: <Empty description={<span>{t("Malumot topilmadi")}</span>}/>,
                                        }}></Table>
                                </div>
                            </Col>
                        </Row>
                    ))}
                </div>
            )}
        </>
    );
};
