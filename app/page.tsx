import { use } from "react";
import axios from "axios";
import { FullData, ListData } from "@/lib/types";
import List from "@/components/List";

export default function Home() {
  const data: FullData[] = use(getData());
  const isData = typeof data !== "object";

  const 더미데이터: ListData[] = [
    { 아파트: "아파트1", 거래금액: 10000 },
    { 아파트: "아파트2", 거래금액: 40000 },
    { 아파트: "아파트3", 거래금액: 51000 },
    { 아파트: "아파트4", 거래금액: 34000 },
    { 아파트: "아파트5", 거래금액: 125000 },
    { 아파트: "아파트6", 거래금액: 45000 },
    { 아파트: "아파트7", 거래금액: 55000 },
    { 아파트: "아파트8", 거래금액: 56000 },
    { 아파트: "아파트8", 거래금액: 56000 },
    { 아파트: "아파트8", 거래금액: 56000 },
    { 아파트: "아파트8", 거래금액: 56000 },
    { 아파트: "아파트8", 거래금액: 56000 },
    { 아파트: "아파트8", 거래금액: 56000 },
    { 아파트: "아파트8", 거래금액: 56000 },
  ];

  return (
    <div className="pt-28 flex min-h-screen flex-col items-center justify-between py-5">
      <List itemList={더미데이터} />
    </div>
  );
}

const getData = async () => {
  try {
    throw new Error();
    const {
      data: {
        response: {
          body: {
            items: { item },
          },
        },
      },
    } = await axios.get(
      `${process.env.REQUEST_URL}?serviceKey=${
        process.env.API_KEY
      }&pageNo=${1}&numOfRows=${10}&LAWD_CD=${11110}&DEAL_YMD=${201512}`
    );

    return item;
  } catch {
    return ["데이터가 읎다"];
  }
};

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
