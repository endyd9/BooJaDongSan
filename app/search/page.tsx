"use client";

import List from "@/components/List";
import ChangePage from "@/components/changePage";
import { ListData } from "@/lib/types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";

interface SearchResponse {
  ok: boolean;
  apts: ListData[];
  totalPage: number;
  error?: string;
}
interface SearchForm {
  keyword: string;
}

export default function Search() {
  const [placeholde, setPlaceholder] = useState("전체조건");
  const [category, setCategory] = useState("전체");
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);

  const { data, mutate, isLoading } = useSWR<SearchResponse>(
    `api/search?keyword=${keyword}&category=${category}&page=${page}`
  );

  const { register, handleSubmit } = useForm<SearchForm>();

  const onSearch = (searchForm: SearchForm) => {
    if (searchForm.keyword === "") return alert("검색어를 입력하세요.");
    setKeyword(searchForm.keyword);
    mutate(`api/search?keyword=${keyword}&category=${category}&page=${page}`);
    setPage(1);
  };

  const onSubmenuClick: any = (event: React.ChangeEvent<HTMLElement>) => {
    setPage(1);
    const smenus = document.getElementById("smenus") as HTMLElement;
    const smenuList = smenus.querySelectorAll("div") as NodeListOf<Element>;
    smenuList.forEach((smenu) => {
      smenu.classList.remove("bg-gray-400");
    });

    if (event.target.innerText === category) {
      return setPlaceholder("전체조건");
    }

    event.target.classList.add("bg-gray-400");
    setCategory(event.target.innerText);
    setPlaceholder(event.target.innerText);
  };

  const pageTo = (page: number) => {
    window.scrollTo(0, 0);
    setPage(page);
    setTimeout(() => {
      mutate(`api/search?keyword=${keyword}&category=${category}&page=${page}`);
    }, 1000);
  };

  return (
    <main className="pt-28 overflow-y-hidden">
      <h1 className="text-3xl ml-5 font-extralight">Search</h1>
      <hr className="border-gray-300 mt-5 w-[95%] ml-3" />
      <br />
      <div
        id="smenus"
        onClick={onSubmenuClick}
        className="grid grid-rows-2 grid-cols-3 w-[80%] h-24 ml-10 hover:cursor-pointer"
      >
        <div className="flex items-center justify-center  border-2 border-gray-200">
          아파트 명
        </div>
        <div className="flex items-center justify-center border-2 border-gray-200">
          법정동
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
          placeholder={`${placeholde}(으)로 검색하기`}
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
      <div className="h-[45%] w-full flex justify-center px-5 my-5 overflow-y-scroll">
        {isLoading ? (
          "검색중..."
        ) : data?.apts ? (
          data.apts.length === 0 ? (
            <h1 className="text-xl mt-20">검색 결과가 없습니다.</h1>
          ) : (
            <List itemList={data.apts} />
          )
        ) : null}
      </div>
      {data?.totalPage ? (
        <ChangePage pages={data.totalPage} currentPage={page} pageTo={pageTo} />
      ) : null}
    </main>
  );
}
