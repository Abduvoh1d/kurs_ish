import {Button, Result} from 'antd';
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import PagesConfig from "../../config/pages.config.ts";

export function Not_Found() {
    const {i18n} = useTranslation()

    return (
        <div className={'w-[100%] h-[100vh] flex items-center justify-center'}>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Link to={`/${i18n.language}/${PagesConfig.Dashboard}\``}><Button type="primary">Back Home</Button></Link>}
            />
        </div>
    );
}