import React from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { navLinks } from '@/src/lib/links';
import { usePathname } from 'next/navigation';
import { useEffect } from "react";
import { link } from 'node:fs';

interface DropdownMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

function DropdownMenu({ isOpen, onClose }: DropdownMenuProps) {
  const pathname = usePathname();
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <>
      <nav className={`mobile-menu ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <ul className='flex flex-col gap-6 p-6 mt-20'>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.name} className={`uppercase border-b border-gray-200 py-2 px-2 ${isActive ? 'text-foreground font-bold text-base' : 'text-gray-600'}`}>
                <Link
                  href={link.href}
                  onClick={onClose}
                >
                  {link.name}
                </Link>
              </li>
            )
          })}
        </ul>
        <div className='flex-1 flex items-end' onClick={onClose}>
          <span className='text-gray-400 text-xl font-light p-8'>BAKU DESSERTS STUDIO</span>
        </div>
      </nav>
    </>
  )
}

export default DropdownMenu