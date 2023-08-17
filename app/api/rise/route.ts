import { NextResponse } from "next/server";
import { client } from "@/lib/server/client";

export interface AptRise {
  name: string;
  dong: string;
  dedicatedArea: number;
  min: number;
  max: number;
  rise: number;
}

export async function GET(req: Request) {
  const res = NextResponse;

  const { searchParams } = new URL(req.url);
  const selector = searchParams.get("selector");

  try {
    if (selector === "rise") {
      const apts: AptRise[] = [];
      const compareApts = await client.apt.groupBy({
        by: ["name", "dedicatedArea", "dong", "buildYear", "buildingNum"],
        _min: {
          treadAmount: true,
        },
        _max: {
          treadAmount: true,
        },
      });

      compareApts.forEach((apt) => {
        apts.push({
          name: apt.name,
          dong: apt.dong,
          dedicatedArea: apt.dedicatedArea,
          min: apt._min.treadAmount!,
          max: apt._max.treadAmount!,
          rise: Math.floor(
            ((apt._max.treadAmount! - apt._min.treadAmount!) /
              apt._min.treadAmount!) *
              100
          ),
        });
      });

      return res.json({
        ok: true,
        apts: apts
          .sort((a, b) => a.rise - b.rise)
          .reverse()
          .slice(0, 10),
        isRise: true,
      });
    } else if (selector === "price") {
      const apts = await client.apt.findMany({
        distinct: ["name"],
        orderBy: {
          treadAmount: "desc",
        },
        take: 10,
        select: {
          id: true,
          name: true,
          treadAmount: true,
          dong: true,
        },
      });
      return res.json({
        ok: true,
        apts,
      });
    } else {
      throw new Error();
    }
  } catch {
    return res.json({
      ok: false,
      error: "부동산 목록을 불러오지 못했습니다.\n 잠시 후 다시 시도해 주세요.",
    });
  }
}
