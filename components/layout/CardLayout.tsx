import React from "react";

const CardLayout = ({children, className}:{children:React.ReactNode, className?:string}): JSX.Element => {

	return (
        <div className={`bg-slate-800 rounded-lg p-4 w-full ${className??''}`}>
            {children}
        </div>
    )
}

export default CardLayout
