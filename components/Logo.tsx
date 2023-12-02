import React from "react";
import Image from "next/image";

export function Logo(props: React.ComponentPropsWithoutRef<'svg'>) {
    return (
      <Image
      src={'/img/logo/dummy-logo-gray.png'}
      alt="Logo Admin"
      width={200}
      height={50}
      />
    );
  }