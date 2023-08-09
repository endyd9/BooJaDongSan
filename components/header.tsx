"use client";

import { getCookie } from "cookies-next";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const openMenu = () => {
    const menu = document.getElementById("menu") as HTMLElement;
    menu.classList.remove("hidden");
    menu.style.transition = "0.6s";
    setTimeout(() => {
      menu.style.transform = `translate(-150%)`;
    }, 1);
  };
  const closeMenu = () => {
    const menu = document.getElementById("menu") as HTMLElement;
    menu.style.transform = `translate(0%)`;
    setTimeout(() => {
      menu.classList.add("hidden");
    }, 400);
  };
  useEffect(() => {
    setIsLoggedIn(Boolean(getCookie("x-jwt")));
  }, [location]);
  return (
    <header className="fixed bg-white w-full max-w-xl py-6 px-5 flex flex-row justify-between border-b-2">
      {/* 헤더내용 */}
      <div className="w-full flex justify-between">
        {/* 타이틀 */}
        <div className="flex items-center justify-end">
          <Link onClick={closeMenu} href={"/"}>
            <h1 className="text-4xl font-thin">부자동산</h1>
          </Link>
        </div>
        {/* 메뉴 아이콘 */}
        <div
          onClick={() => openMenu()}
          className="flex items-center justify-end hover:cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
      </div>
      {/* 메뉴 */}
      <div
        id="menu"
        className="fixed -right-96 top-0 w-64 h-full px-3 bg-black text-white hidden"
      >
        <div className="flex pt-5 items-center justify-between">
          <span className="text-3xl font-extralight">Menu</span>
          {/* 메뉴닫기 아이콘 */}
          <div onClick={closeMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 text-red-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>

        <div>
          <ul className="mt-5 pl-3 h-screen">
            <Link onClick={closeMenu} href={"/search"}>
              <li className="text-lg font-extralight">Search</li>
            </Link>
            <div className="absolute w-full bottom-0">
              {isLoggedIn ? (
                <div className="py-5 ml-28 flex w-2/5 justify-end">
                  <Link onClick={closeMenu} href={"/join"}>
                    <li className="text-lg font-extralight">My Page</li>
                  </Link>
                </div>
              ) : (
                <div className="py-5 ml-28 flex w-2/5 justify-between">
                  <Link onClick={closeMenu} href={"/join"}>
                    <li className="text-lg font-extralight">Join</li>
                  </Link>
                  <Link onClick={closeMenu} href={"/login"}>
                    <li className="text-lg font-extralight">Log-in</li>
                  </Link>
                </div>
              )}
            </div>
          </ul>
        </div>
      </div>
    </header>
  );
}
