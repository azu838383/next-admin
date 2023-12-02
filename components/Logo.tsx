import React from "react";
import Image from "next/image";

export function Logo(props: React.ComponentPropsWithoutRef<'svg'>) {
    return (
      <>
        <Image
        src={'/img/logo/sgg-logo-yellow.png'}
        alt="Logo Admin"
        width={200}
        height={50}
        className="drop-shadow-lg saturate-200 dark:drop-shadow-none "
        />
      </>
    );
  }