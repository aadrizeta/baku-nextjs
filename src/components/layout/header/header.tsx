'use client';
import { useEffect, useState, useRef } from "react";
import HeaderNavbar from "@/src/components/ui/header/nav/header-navbar";
import HeaderLogo from "@/src/components/ui/header/sides/header-logo";
import React from 'react'
import BurgerMenu from "@/src/components/ui/header/sides/burger-menu";
import DropdownMenu from "@/src/components/ui/header/nav/dropdown-menu";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  return (
    <>
      <header className="header">
        <div className="main-header padding-responsive-wide">
          <HeaderLogo />
          <HeaderNavbar />
          <BurgerMenu isOpen={isMenuOpen} onToggle={() => setIsMenuOpen(!isMenuOpen)} />
        </div>
      </header>
      <DropdownMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  )
}

export default Header;
