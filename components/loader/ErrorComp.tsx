import React from "react";
import { MdInfo } from "react-icons/md";
import type { KeyedMutator } from "swr";

const ErrorComp = ({errorText, mutateData, tryAgainText}:{errorText?:string, mutateData?:KeyedMutator<any>, tryAgainText?:string}):JSX.Element=>{
    return(
        <div className="my-2 text-red-300 h-full flex flex-col justify-center items-center">
            <MdInfo size={48} className="animate-pulse" />
            <span className="text-center">{errorText??'Something is wrong.'}</span>
            {
                mutateData?
                (
                    <button className="btn btn-error rounded-full capitalize">
                        <span>{tryAgainText??'Try Again'}</span>
                    </button>
                )
                : null
            }
        </div>
    )
}

export default ErrorComp