"use client";

import Logo from "../public/logo.svg";
import navItems from "@/utils/navItems";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FaUserCircle, FaCaretDown } from "react-icons/fa";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  //   const toggleLoginState = () => {
  //     setIsLoggedIn((prevState) => !prevState);
  //   };

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  return (
    <nav className="bg-black text-white px-4 py-2 flex items-center justify-between sm:px-28">
      <div className="flex items-center">
        <Link href="/">
          <Image src={Logo} alt="Logo" className="w-10 h-10 sm:w-14 sm:h-14" />
        </Link>
      </div>
      <div className="flex justify-center flex-1 pb-0">
        <div className="flex space-x-2 sm:space-x-4">
          {navItems.navItemsLeft.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className={`text-white text-sm sm:text-base hover:text-luxtix-6 ${
                pathname === item.path ? "border-b-2 border-luxtix-6" : ""
              }`}
            >
              {item.text}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex space-x-2 sm:space-x-4 items-center">
        {isLoggedIn ? (
          <>
            <div className="relative sm:hidden">
              <button
                onClick={toggleDropdown}
                className="flex items-center text-white text-sm sm:text-base hover:text-luxtix-6"
              >
                <FaUserCircle className="text-xl sm:text-2xl" />
                <FaCaretDown className="ml-1" />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-50">
                  <Link
                    href="/create-events"
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Create Event
                  </Link>
                  {navItems.navItemsIcon.map((item, index) => (
                    <Link
                      key={index}
                      href={item.path}
                      className={`block px-4 py-2 ${
                        pathname === item.path ? "bg-luxtix-6" : ""
                      }`}
                      onClick={() => setDropdownOpen(false)}
                    >
                      {item.text}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <div className="hidden sm:flex space-x-2 sm:space-x-4 items-center">
              <Link
                href="/create-events"
                className="text-white text-sm sm:text-base hover:text-luxtix-6"
              >
                Create Event
              </Link>
              {navItems.navItemsIcon.map((item, index) => (
                <Link
                  key={index}
                  href={item.path}
                  className="text-white hover:text-luxtix-6 flex flex-col items-center"
                >
                  <item.icon className="text-xl" />
                  <span className="text-xs">{item.text}</span>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <>
            {navItems.navItemsRight.map((item, index) => (
              <Link
                key={index}
                href="/sign-up"
                className="text-white text-sm sm:text-base hover:text-luxtix-6 hidden sm:block"
              >
                {item.text}
              </Link>
            ))}
            <div>
              <Link
                href="/sign-in"
                className="bg-luxtix-6 text-black px-4 py-2 rounded-lg hover:bg-luxtix-2"
              >
                Login
              </Link>
            </div>
          </>
        )}
      </div>
      {/* <button onClick={toggleLoginState}>Test</button> */}
    </nav>
  );
}

export default Navbar;
