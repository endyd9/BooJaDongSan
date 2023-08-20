"use client";

import { AptRise } from "@/app/api/rise/route";
import { ListData } from "@/lib/types";
import Link from "next/link";

interface ListProps {
  itemList?: ListData[];
  riseList?: AptRise[];
  isRise?: boolean;
}

export default function List(props: ListProps) {
  return (
    <div className="w-full px-1">
      <ul>
        {props.isRise === true
          ? props.riseList?.map((apt) => (
              <Link
                key={apt.id}
                href={`/search?keyword=${apt.name}&category=아파트 명&page=1`}
              >
                <li className="w-full mb-3 grid grid-flow-col grid-cols-2 items-center justify-between px-5 h-20 border-gray-500 border shadow-xl">
                  <div className="w-[130%] flex items-center justify-between">
                    <div className="w-[50%] grid grid-cols-1">
                      <span className="text-center">{apt.name}</span>
                      <span className="text-center">
                        ({apt.dong} {apt.dedicatedArea}형)
                      </span>
                    </div>
                    <div className="w-[55%] grid grid-cols-2 text-end">
                      <span>최저가 :</span>
                      <span>
                        {apt.min > 9999
                          ? apt.min > 99999
                            ? `${apt.min.toString().slice(-0, -4)} 억`
                            : `${apt.min
                                .toString()
                                .slice(0, 2)
                                .replace(/(\d)(?=(?:\d)+(?!\d))/g, "$1.")} 억`
                          : `${apt.min} 만`}
                      </span>
                      <span>최고가 :</span>
                      <span>
                        {apt.max > 9999
                          ? apt.max > 99999
                            ? `${apt.max.toString().slice(-0, -4)} 억`
                            : `${apt.max
                                .toString()
                                .slice(0, 2)
                                .replace(/(\d)(?=(?:\d)+(?!\d))/g, "$1.")} 억`
                          : `${apt.max} 만`}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <span>상승률 : {apt.rise}%</span>
                  </div>
                </li>
              </Link>
            ))
          : props.itemList?.map((apt) => (
              <Link key={apt.id} href={`/apt/${apt.id}`}>
                <li className="w-full mb-3 grid grid-flow-col grid-cols-2 items-center justify-between px-5 h-20 border-gray-500 border shadow-xl">
                  <div className="w-[110%] flex items-center justify-between">
                    <span className="w-3/5">{apt.name}</span>
                    <span className="">{apt.dong}</span>
                  </div>
                  <div className="flex justify-end">
                    <span className="mx-1">거래금액:</span>
                    <span>
                      {apt.treadAmount > 9999
                        ? apt.treadAmount > 99999
                          ? `${apt.treadAmount.toString().slice(-0, -4)} 억`
                          : `${apt.treadAmount
                              .toString()
                              .slice(0, 2)
                              .replace(/(\d)(?=(?:\d)+(?!\d))/g, "$1.")} 억`
                        : `${apt.treadAmount} 만`}
                    </span>
                  </div>
                </li>
              </Link>
            ))}
      </ul>
    </div>
  );
}
