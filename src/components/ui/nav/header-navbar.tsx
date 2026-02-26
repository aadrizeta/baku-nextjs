'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/src/lib/links";
import clsx from "clsx";
import { link } from "node:fs";

export default function HeaderNavbar() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex gap-8">
      <ul>
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <li key={link.name}>
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