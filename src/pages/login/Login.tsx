import { AutoForm, IForm } from "../../components/auto-form/index..tsx"
import useForm from "antd/es/form/hooks/useForm"
import { Button, FormProps } from "antd"

export function Login() {
    const [form] = useForm()

    const props: IForm[] = [
        {
            label: "Telefon number",
            name: "phone_number",
            size: "large",
            required: true,
            span: 24,
        },
        {
            label: "Parol",
            name: "password",
            size: "large",
            required: true,
            span: 24,
        },
    ]

    const onFinish: FormProps["onFinish"] = (values: unknown) => {
        console.log(values)
    }

    return (
        <div
            className="h-[100vh] w-[100%] p-5 flex items-center justify-center main-bg"
            style={{
                backgroundImage: "url('/loginImage.webp')",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
            }}
        >
            <div className={"bg-white p-10 flex flex-col items-center justify-between rounded-2xl relative"}>
                <p className={"text-[45px] font-[500]"}>Login</p>
                <AutoForm props={props} form={form} onFinish={onFinish} layout={"vertical"} />
                <Button type={"primary"} className={"w-[100%]"} size={"large"} onClick={() => form.submit()}>
                    Submit
                </Button>
            </div>
        </div>
    )
}
