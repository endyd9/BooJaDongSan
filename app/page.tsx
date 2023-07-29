import convert from "xml-js";
import { use } from "react";
import axios from "axios";

interface dataResponse {
  거래금액: number;
  거래유형?: number;
  년: number;
  도로명: number;
  도로명건물본번호코드: number;
  도로명건물부번호코드: number;
  도로명시군구코드: number;
  도로명일련번호코드: number;
  도로명코드: number;
  등기일자: number;
  법정동: string;
  법정동본번코드: number;
  법정동부번코드: number;
  멉정동동시군구코드: number;
  법정동읍면동코드: number;
  범정동지번코드: number;
  아파트: string;
  월: number;
  일: number;
  일련번호: string;
  전용면적: number;
  중개사소재지?: number;
  지번: number;
  지역코드: number;
  층: number;
  해제사유발생일?: number;
  해제여부?: number;
}

export default function Home() {
  const data: Array<dataResponse> = use(getData());

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ul>
        {data.map((e, i) => (
          <li>
            <p>아파트명 : {e.아파트}</p>
            <p>
              거래일자 : {e.년}년{e.월}
              {e.일}
            </p>
            <p>거래금액 : {e.거래금액} </p>
            <p>층 : {e.층}</p>
            <p>도로명주소 : {e.도로명}</p>
          </li>
        ))}
      </ul>
    </main>
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
    `${process.env.REQUEST_URL}?serviceKey=${process.env.API_KEY}&pageNo=1&numOfRows=10&LAWD_CD=11110&DEAL_YMD=201512`
  );

  return item;
};
