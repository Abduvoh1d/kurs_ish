import {Riple} from "react-loading-indicators";

export function Loading() {
    return (
        <div className={'w-[100%] h-[100vh] flex items-center justify-center'}>
            <Riple color="#32cd32" size="medium" text="" textColor=""/>
        </div>
    );
}