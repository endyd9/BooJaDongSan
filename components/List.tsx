"use client";

import { ListData } from "@/lib/types";
import Link from "next/link";

export default function List({ itemList }: any) {
  return (
    <div className="w-full px-1">
      <ul className="">
        {itemList?.map((e: ListData, i: number) => (
          <Link key={i} href={"/"}>
            <li className="w-full mb-3 flex items-center justify-between px-10 h-20 border-gray-500 border shadow-xl">
              <span>{e.아파트}</span>
              <span>거래액: {e.거래금액}</span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
