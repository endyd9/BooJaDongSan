"use client";

import List from "@/components/List";
import { IsLoggedInUserResponse, ListData } from "@/lib/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";

interface UserInfoResponse {
  ok: boolean;
  user: {
    id: string;
    email: string;
    nickName: string;
  };
  isOwner: boolean;
  like: [apt: ListData];
  totalPage: [];
  error?: string;
}

export default function MyPage({ params }: { params: { id: string } }) {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useSWR<UserInfoResponse>(
    `/api/profile/${params.id}?page=${page}`
  );

  const apts: any = [];
  if (data?.ok === true) {
    data?.like.forEach((apt: any) => {
      const {
        apt: { id, name, dong, treadAmount },
      } = apt;
      apts.push({ id, name, treadAmount, dong });
    });
  }

  const onPageClick: any = (event: React.ChangeEvent<HTMLElement>) => {
    setPage(+event.target.innerText);
  };
  return (
    <main className="pt-28 flex max-h-screen flex-col items-center justify-between py-5">
      {isLoading ? (
        <div>
          <h1 className="text-2xl mt-52">로딩중...</h1>
        </div>
      ) : data?.ok === true ? (
        <>
          <div className="my-5 flex flex-col items-center">
            <h1 className="text-2xl font-extralight">
              {data.user.nickName} 님의 페이지
            </h1>
            {data.isOwner === true ? (
              <Link href={`/profile/edit`}>
                <span className="text-xl text-gray-500 font-thin">
                  정보 수정
                </span>
              </Link>
            ) : null}
          </div>
          <div className="flex flex-col w-full px-3">
            <h1 className="ml-3 text-xl ">관심 매물</h1>
            {data.like.length > 0 ? (
              <div className="mt-10">
                <List itemList={apts} />
                <ul className="flex justify-center">
                  {data.totalPage.map((_, i) => (
                    <li key={i} className="mx-2">
                      <button
                        onClick={onPageClick}
                        className={page === i + 1 ? "font-bold" : ""}
                      >
                        {i + 1}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="mt-28 text-center">등록된 관심매물이 없습니다.</p>
            )}
          </div>
        </>
      ) : (
        <h1>유저 정보를 찾을 수 없습니다.</h1>
      )}
    </main>
  );
}
