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
  like: [{ apt: ListData }];
  error?: string;
}

export default function MyPage() {
  const [isMy, setIsMy] = useState(false);
  const { data } = useSWR<UserInfoResponse>("/api/profile");
  const { data: isLoggedIn } =
    useSWR<IsLoggedInUserResponse>("/api/is-logged-in");

  const apts: any = [];
  if (data?.ok === true) {
    data?.like.forEach((apt) => {
      const {
        apt: { id, name, dong, treadAmount },
      } = apt;

      apts.push({ id, name, treadAmount, dong });
    });
  }

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
              <Link href={`/profile/edit`}>
                <span className="text-xl text-gray-500 font-thin">
                  정보 수정
                </span>
              </Link>
            ) : null}
          </div>
          <div className="flex flex-col w-full px-3">
            <h1 className="ml-3 text-xl ">관심 매물</h1>
            {data?.like.length > 0 ? (
              <List itemList={apts} />
            ) : (
              <p className="mt-28 text-center">등록된 관심매물이 없습니다.</p>
            )}
          </div>
        </>
      ) : (
        <h1>{data?.error}</h1>
      )}
    </main>
  );
}
