import { Button, Result } from 'antd';
import {Link} from "react-router-dom";

export function Not_Found() {
    return (
        <div className={'w-[100%] h-[100vh] flex items-center justify-center'}>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Link to={'/'}><Button type="primary">Back Home</Button></Link>}
            />
        </div>
    );
}