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
      <ul className="flex gap-8">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <li key={link.name} className={clsx("text-xs tracking-wider text-left py-2 uppercase transition-colors duration-300", isActive ? "text-primary" : "text-gray-600 hover:text-primary")}>
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