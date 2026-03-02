'use client';
import { useEffect, useState, useRef } from "react";
import HeaderNavbar from "@/src/components/ui/header/nav/header-navbar";
import HeaderLogo from "@/src/components/ui/header/logo/header-logo";
import React from 'react'

function Header() {
  return (
    <>
      <header className="header">
        <div className="main-header padding-responsive-wide">
          <HeaderLogo />
          <HeaderNavbar />
        </div>
      </header>
    </>
  )
}

export default Header;
