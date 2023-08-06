"use client";

export default function Header() {
  const onMenuClick = () => {
    const menu = document.getElementById("menu");
    alert(menu);
  };
  return (
    <header className="w-full py-6 px-5 flex flex-row justify-between border-b-2">
      {/* 헤더내용 */}
      <div className="w-full flex justify-between">
        {/* 타이틀 */}
        <div className="flex items-center justify-end">
          <h1 className="text-3xl font-light">부자동산</h1>
        </div>
        {/* 메뉴 */}
        <div
          onClick={() => onMenuClick()}
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
      <div id="menu" className="absolute -right-96 top-0 w-96 h-full bg-black">
        <ul className="text-white">
          <span>메뉴</span>
          <li>메뉴1</li>
          <li>메뉴2</li>
          <li>메뉴3</li>
        </ul>
      </div>
    </header>
  );
}
