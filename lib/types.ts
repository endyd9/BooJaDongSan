export interface FullData {
  id: number;
  name: string;
  dedicatedArea: number;
  floor: number;
  buildYear: number;
  treadDate: number;
  treadAmount: number;
  cityCode: number;
  dong: string;
  roadName: string;
  buildingNum: string;
  buildingMinorNum: string;
  view: number;
}

export interface ListData {
  id: number;
  name: string;
  treadAmount: number;
  dong: string;
  isRise?: boolean;
}

export interface IsLoggedInUserResponse {
  ok: boolean;
  user?: {
    id: number;
  };
}
