"use client";

import { ListData } from "@/lib/types";
import Link from "next/link";

export default function List({ itemList }: any) {
  return (
    <div className="w-full px-1">
      <ul>
        {itemList?.map((e: ListData, i: number) => (
          <Link key={e.id} href={"/"}>
            <li className="w-full mb-3 grid grid-flow-col grid-cols-2 items-center justify-between px-5 h-20 border-gray-500 border shadow-xl">
              <div className="w-[110%] flex justify-between">
                <span>{e.name}</span>
                <span>{e.dong}</span>
              </div>
              <div className="flex justify-end">
                <span className="mr-2">거래금액:</span>
                <span>
                  {e.treadAmount > 9999
                    ? e.treadAmount > 99999
                      ? `${e.treadAmount.toString().slice(0, 2)} 억`
                      : `${e.treadAmount
                          .toString()
                          .slice(0, 2)
                          .replace(/(\d)(?=(?:\d{1})+(?!\d))/g, "$1.")} 억`
                    : `${e.treadAmount} 만`}
                </span>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
