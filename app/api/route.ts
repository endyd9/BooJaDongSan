import { NextResponse } from "next/server";
import { client } from "@/lib/server/client";

export async function GET(req: Request) {
  const res = NextResponse;

  const { searchParams } = new URL(req.url);
  const selector = searchParams.get("selector");

  try {
    if (selector === "view") {
      const apts = await client.apt.findMany({
        orderBy: {
          view: "desc",
        },
        take: 20,
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
    } else if (selector === "like") {
      const apts = await client.apt.findMany({
        orderBy: {
          Like: {
            _count: "desc",
          },
        },
        take: 20,
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
      error: "부동산 목록을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.",
    });
  }
}
