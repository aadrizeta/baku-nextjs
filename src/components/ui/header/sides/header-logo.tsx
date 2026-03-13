import React from 'react'
import Image from "next/image";
import Link from "next/link";

function HeaderLogo() {
  return (
    <Link href="/">
      <Image src="/images/logos/baku-header-logo.webp" alt="Baku Header Logo" width={150} height={150} />
    </Link>
  )
}

export default HeaderLogo
