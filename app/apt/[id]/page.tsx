"use client";

import KakaoMap from "@/components/kakaomap";
import { FullData } from "@/lib/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

interface AptDetailResponse {
  ok: boolean;
  apt: FullData;
  coords: object;
  error?: string;
  isLike: boolean;
}

export default function Detail({ params }: { params: { id: string } }) {
  const { data, isLoading } = useSWR<AptDetailResponse>(
    `/api/apt/${params.id}`
  );
  const { data: isLoggedin } = useSWR("/api/is-logged-in");

  const [isLike, setIslike] = useState(false);

  const router = useRouter();

  const onLikeclick = () => {
    if (isLoggedin?.ok !== true) {
      alert("관심 매물을 등록하려면 로그인 해주세요.");
      router.push("/login");
    } else {
      const data = axios.post(`/api/apt/${params.id}/like`);
      setIslike((prev) => !prev);
    }
  };

  useEffect(() => {
    if (data?.isLike) {
      setIslike(data.isLike);
    }
  }, [data]);

  return (
    <main className="pt-28 flex max-h-screen flex-col items-center justify-between py-5">
      {isLoading ? (
        <div>
          <h1 className="text-2xl mt-52">로딩중...</h1>
        </div>
      ) : data?.apt !== undefined ? (
        <div className="w-full px-4">
          <div className="flex justify-between">
            <div>
              <h1 className="text-2xl">{data.apt.name}</h1>
              <span className="text-md ml-2">조회수 : {data.apt.view}회</span>
            </div>
            <button
              onClick={onLikeclick}
              className="text-3xl mb-5 text-red-400 cursor-pointer"
            >
              {isLike ? "♥" : "♡"}
            </button>
          </div>
          <hr className="mt-2" />
          <div className="mt-5 ml-2">
            <ul className="list-disc">
              <h2 className="text-xl mb-3">거래 상세 내역</h2>
              <li className="text-lg ml-3">거래일 : {data.apt.treadDate}</li>
              <li className="text-lg ml-3">
                거래가격 :{" "}
                {data.apt.treadAmount > 9999
                  ? data.apt.treadAmount > 99999
                    ? `${data.apt.treadAmount.toString().slice(0, 2)} 억원`
                    : `${data.apt.treadAmount
                        .toString()
                        .slice(0, 2)
                        .replace(/(\d)(?=(?:\d{1})+(?!\d))/g, "$1.")} 억원`
                  : `${data.apt.treadAmount} 만원`}
              </li>
              <li className="text-lg ml-3">거래 층 : {data.apt.floor} 층</li>
            </ul>
            <br />
            <ul className="list-disc">
              <h2 className="text-xl mb-3">매물 상세 내역</h2>
              <li className="text-lg ml-3">
                건축년도 : {data.apt.buildYear} 년
              </li>
              <li className="text-lg ml-3">
                전용면적 : {data.apt.dedicatedArea} m2
              </li>
              <li className="text-lg ml-3">
                아파트 소재 법정동 : {data.apt.dong}
              </li>
              <li className="text-lg ml-3">
                {" "}
                도로명 주소 : {data.apt.roadName} {+data.apt.buildingNum}-
                {+data.apt.buildingMinorNum}
              </li>
            </ul>
          </div>
          <br />
          <div>
            <h2 className="text-2xl">위치</h2>
            <br />
            <KakaoMap coords={data.coords} />
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-2xl mt-52">데이터 로드 실패</h1>
        </div>
      )}
    </main>
  );
}
