'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/src/lib/links";
import clsx from "clsx";

export default function HeaderNavbar() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex gap-8">
      <ul className="flex gap-8 items-center">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <li key={link.name} className={clsx('navlink', isActive && 'navlink-active')}>
              <Link href={link.href}>
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}