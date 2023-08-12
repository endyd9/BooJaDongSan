"use client";

import List from "@/components/List";
import { IsLoggedInUserResponse } from "@/lib/types";
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
  error?: string;
}

export default function MyPage() {
  const [isMy, setIsMy] = useState(false);
  const { data } = useSWR<UserInfoResponse>("/api/profile");
  const { data: isLoggedIn } =
    useSWR<IsLoggedInUserResponse>("/api/is-logged-in");
  console.log(data);

  useEffect(() => {
    setIsMy(data?.user?.id === isLoggedIn?.user?.id);
  }, [data]);

  return (
    <main className="pt-28 flex max-h-screen flex-col items-center justify-between py-5">
      {data?.ok === true ? (
        <>
          <div className="my-5 flex flex-col items-center">
            <h1 className="text-2xl font-extralight">
              {data?.user?.nickName} 님의 페이지
            </h1>
            {isMy ? (
              <Link href={`/profile/${data?.user?.id}/edit`}>
                <span className="text-xl text-gray-500 font-thin">
                  정보 수정
                </span>
              </Link>
            ) : null}
          </div>
          <div className="flex flex-col w-[90%]">
            <h1 className="my-3 text-xl">관심 매물</h1>
            <List
              itemList={[
                { 아파트: "관심 아파트1", 가격: 1000 },
                { 아파트: "관심 아파트2", 가격: 1000 },
              ]}
            />
          </div>
        </>
      ) : (
        <h1>{data?.error}</h1>
      )}
    </main>
  );
}
