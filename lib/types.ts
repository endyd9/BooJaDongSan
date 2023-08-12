export interface FullData {
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

export interface ListData {
  아파트: string;
  거래금액: number;
}

export interface IsLoggedInUserResponse {
  ok: boolean;
  user: {
    id: number;
  };
}
