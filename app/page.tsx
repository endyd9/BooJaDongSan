import { use } from "react";
import axios from "axios";
import { BoodongsnaTypes } from "@/lib/types";

export default function Home() {
  const data: BoodongsnaTypes[] = use(getData());

  return (
    <div className="flex min-h-screen flex-col items-center justify-between py-10">
      <ul>
        {data.map((e, i) => (
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
        ))}
      </ul>
    </div>
  );
}

export const getData = async () => {
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
};
