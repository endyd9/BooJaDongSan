"use client";

import List from "@/components/List";
import { useState } from "react";
import useSWR from "swr";

export default function Home() {
  const [selctor, setSelector] = useState(true);
  const { data } = useSWR(`/api?selector=${selctor ? "view" : "like"}`);

  const onSelectorClicked: any = (event: React.ChangeEvent<HTMLElement>) => {
    switch (event.target.innerText) {
      case "조회수 높은":
        setSelector(true);
        break;
      case "좋아요 많은":
        setSelector(false);
        break;
    }
  };

  return (
    <main className="pt-28 flex min-h-screen flex-col items-center justify-between py-5">
      <nav className="text-xl mb-5">
        <button
          onClick={onSelectorClicked}
          className={selctor ? "" : "font-thin"}
        >
          조회수 높은
        </button>
        <span className="mx-10">/</span>
        <button
          onClick={onSelectorClicked}
          className={selctor ? "font-thin" : ""}
        >
          좋아요 많은
        </button>
      </nav>
      {data?.ok === true ? (
        <List itemList={data?.apts} />
      ) : (
        <span className="absolute top-[50%]">{data?.error}</span>
      )}
    </main>
  );
}

{
  /* 
    나중 참고용
    <ul>
        {isData ? (
          data.map((e, i) => (
            <li key={i}>
              <p>아파트명 : {e.아파트}</p>
              <p>
                거래일자 : {e.년}년{e.월}
                {e.일}
              </p>
              <p>거래금액 : {e.거래금액} </p>
              <p>도로명주소 : {e.도로명}</p>
              <br />
            </li>
          ))
        ) : (
          <h1>{data.toString()}</h1>
        )}
      </ul> */
}
