import { NextResponse } from "next/server";
import { client } from "@/lib/server/client";

export async function GET(req: Request) {
  const res = NextResponse;

  const { searchParams } = new URL(req.url);

  const keyword = searchParams.get("keyword");
  if (keyword === "")
    return res.json({
      ok: true,
    });

  try {
    switch (searchParams.get("category")) {
      case "전체": {
        console.log(keyword);
        const apts = await client.apt.findMany({
          take: 10,
          where: {
            OR: [
              {
                name: {
                  contains: `${keyword}`,
                },
              },
              {
                dong: {
                  contains: `${keyword}`,
                },
              },
              {
                dedicatedArea: {
                  equals: +`${keyword}` | 0,
                },
              },
              {
                treadAmount: {
                  equals: +`${keyword}` | 0,
                },
              },
              {
                treadDate: {
                  equals: +`${keyword}` | 0,
                },
              },
              {
                buildYear: {
                  equals: +`${keyword}` | 0,
                },
              },
            ],
          },
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
      }
      case "아파트 명": {
        const apts = await client.apt.findMany({
          take: 10,
          where: {
            name: {
              contains: `${keyword}`,
            },
          },
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
      }
      case "법정동": {
        const apts = await client.apt.findMany({
          take: 10,
          where: {
            dong: {
              contains: `${keyword}`,
            },
          },
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
      }
      case "평 형": {
        const apts = await client.apt.findMany({
          take: 10,
          where: {
            dedicatedArea: {
              equals: +`${keyword}` | 0,
            },
          },
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
      }
      case "거래액": {
        const apts = await client.apt.findMany({
          take: 10,
          where: {
            treadAmount: {
              equals: +`${keyword}` | 0,
            },
          },
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
      }
      case "거래일자": {
        const apts = await client.apt.findMany({
          take: 10,
          where: {
            treadDate: {
              equals: +`${keyword}` | 0,
            },
          },
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
      }
      case "건축년도": {
        const apts = await client.apt.findMany({
          take: 10,
          where: {
            buildYear: {
              equals: +`${keyword}` | 0,
            },
          },
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
      }
    }
  } catch (error) {
    console.log(error);

    console.log("펑");
    return res.json({
      ok: false,
      error: "부동산 목록을 불러오지 못했습니다.\n 잠시 후 다시 시도해 주세요.",
    });
  }
}
