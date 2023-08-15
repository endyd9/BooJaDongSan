"use client";

import { ListData } from "@/lib/types";
import Link from "next/link";

export default function List({ itemList }: any) {
  return (
    <div className="w-full px-1">
      <ul>
        {itemList?.map((apt: ListData) => (
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
                      ? `${apt.treadAmount.toString().slice(0, 2)} 억`
                      : `${apt.treadAmount
                          .toString()
                          .slice(0, 2)
                          .replace(/(\d)(?=(?:\d{1})+(?!\d))/g, "$1.")} 억`
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
