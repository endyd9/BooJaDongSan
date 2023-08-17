"use client";

import List from "@/components/List";
import { useState } from "react";
import useSWR from "swr";

export default function Rise() {
  const [selctor, setSelector] = useState(true);
  const { data, isLoading } = useSWR(
    `/api/rise?selector=${selctor ? "rise" : "price"}`
  );
  if (data?.ok === false) {
    alert(data.error);
  }

  const onSelectorClicked: any = (event: React.ChangeEvent<HTMLElement>) => {
    switch (event.target.innerText) {
      case "상승률 Top10":
        setSelector(true);
        break;
      case "거래금액 Top10":
        setSelector(false);
        break;
    }
  };

  return (
    <main className="pt-28 flex min-h-screen flex-col items-center justify-between py-5">
      <nav className="fixed top-[5.6rem] h-14 w-full flex items-center justify-center text-xl bg-white">
        <button
          onClick={onSelectorClicked}
          className={selctor ? "" : "font-thin"}
        >
          상승률 Top10
        </button>
        <span className="mx-10">/</span>
        <button
          onClick={onSelectorClicked}
          className={selctor ? "font-thin" : ""}
        >
          거래금액 Top10
        </button>
      </nav>
      {isLoading ? (
        <div>
          <h1 className="text-2xl mt-52">로딩중...</h1>
        </div>
      ) : data?.ok === true ? (
        <div className="mt-10">
          {data.isRise === true ? (
            <List riseList={data?.apts} isRise={data.isRise} />
          ) : (
            <List itemList={data?.apts} isRise={data.isRise} />
          )}
        </div>
      ) : (
        <p className="absolute top-[50%] w-full text-center">
          데이터 로드 실패
        </p>
      )}
    </main>
  );
}
