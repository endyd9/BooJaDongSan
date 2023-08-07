"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

interface SearchForm {
  keyword: string;
}

export default function Search() {
  const [placeholde, setPlaceholder] = useState("검색어를 입력하세요.");
  const { register, handleSubmit } = useForm<SearchForm>();

  const onSearch = (searchForm: SearchForm) => {
    if (searchForm.keyword === "") return alert("검색어를 입력하세요.");
    setPlaceholder(searchForm.keyword);
  };

  const onSubmenuClick: any = (event: React.ChangeEvent<HTMLElement>): void => {
    const smenus = document.getElementById("smenus") as HTMLElement;
    const smenuList = smenus.querySelectorAll("div") as NodeListOf<Element>;
    smenuList.forEach((smenu) => {
      smenu.classList.remove("bg-gray-400");
    });
    event.target.classList.add("bg-gray-400");
    setPlaceholder(`${event.target?.innerText}(으)로 검색하기`);
  };
  return (
    <div className="h-screen pt-28">
      <h1 className="text-3xl ml-5 font-extralight">Search</h1>
      <hr className="border-gray-300 mt-5 w-[95%] ml-3" />
      <br />
      <div
        id="smenus"
        onClick={onSubmenuClick}
        className="grid grid-rows-2 grid-cols-3 w-[80%] h-24 ml-10"
      >
        <div className="flex items-center justify-center  border-2 border-gray-200">
          아파트 명
        </div>
        <div className="flex items-center justify-center border-2 border-gray-200">
          시,군,구
        </div>
        <div className="flex items-center justify-center border-2 border-gray-200">
          평 형
        </div>
        <div className="flex items-center justify-center border-2 border-t-1 border-gray-200">
          거래액
        </div>
        <div className="flex items-center justify-center border-2 border-t-1 border-gray-200">
          거래일자
        </div>
        <div className="flex items-center justify-center border-2 border-t-1 border-gray-200">
          건축년도
        </div>
      </div>
      <hr className="border-gray-300 mt-5 w-[95%] ml-3" />
      <br />
      <form onSubmit={handleSubmit(onSearch)} className="flex justify-center">
        <input
          className="border-2 w-[90%] h-10 pl-2 placeholder:font-mono"
          type="text"
          id="keyword"
          placeholder={placeholde}
          {...register("keyword")}
        />
        <button className="flex items-center justify-center absolute right-[1.5rem] hover:bg-gray-200 w-10 h-10 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </form>
      <div className="h-1/2 flex justify-center items-center">
        <h1>검색결과자리</h1>
      </div>
    </div>
  );
}
