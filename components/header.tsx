"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [isMenu, setIsMenu] = useState(false);
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
  return (
    <header className="fixed bg-white w-full max-w-xl py-6 px-5 flex flex-row justify-between border-b-2">
      {/* 헤더내용 */}
      <div className="w-full flex justify-between">
        {/* 타이틀 */}
        <div className="flex items-center justify-end">
          <h1 className="text-3xl font-light">부자동산</h1>
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
          <span className="text-3xl">메뉴</span>
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
          <ul className="mt-5">
            <li>미정메뉴</li>
            <li>회원가입</li>
            <li>로그인</li>
          </ul>
        </div>
      </div>
    </header>
  );
}
