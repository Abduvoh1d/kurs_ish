import {AutoForm, IForm} from "../../components/auto-form/index..tsx";
import useForm from "antd/es/form/hooks/useForm";
import {Button, FormProps} from "antd";
import {Link} from "react-router-dom";

export function Login() {
    const [form] = useForm()

    const props: IForm[] = [
        {
            label: 'Email',
            name: 'email',
            size: 'large',
            required: true,
            span: 24
        },
        {
            label: 'Password',
            name: 'password',
            size: 'large',
            required: true,
            span: 24
        }
    ]

    const onFinish: FormProps["onFinish"] = (values: unknown) => {
        console.log(values);
    };

    return (
        <div
            className="h-[100vh] w-[100%] flex items-center justify-center"
            style={{
                backgroundImage: "url('/loginImage.webp')",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
            }}
        >
            <div
                className={'bg-white p-10 flex flex-col items-center justify-between rounded-2xl relative backdrop-blur-md'}>
                <p className={'text-[45px] font-[500]'}>Login</p>
                <AutoForm props={props} form={form} onFinish={onFinish} layout={'vertical'}/>
                <Button type={'primary'} className={'w-[100%]'} size={'large'}
                        onClick={() => form.submit()}>Submit</Button>

                <p className={'text-center mt-10'}>You do not have account <Link to={'/register'}
                                                                           className={'text-green-500 ml-1'}>Sign in</Link>
                </p>
            </div>
        </div>
    );
}