import { NextResponse } from "next/server";
import { client } from "@/lib/server/client";
import { Prisma } from "@prisma/client";

export async function GET(req: Request) {
  const res = NextResponse;

  const { searchParams } = new URL(req.url);

  const keyword = searchParams.get("keyword");
  if (keyword === "")
    return res.json({
      ok: true,
    });

  try {
    let apts;
    let query: Prisma.AptFindManyArgs;
    let count = 1;

    switch (searchParams.get("category")) {
      case "전체": {
        query = {
          skip: (+searchParams.get("page")! - 1) * 10,
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
                  equals: +`${keyword}` || 0,
                },
              },
              {
                treadAmount: {
                  equals: +`${keyword}` || 0,
                },
              },
              {
                treadDate: {
                  contains: `${keyword}`,
                },
              },
              {
                buildYear: {
                  equals: +`${keyword}` || 0,
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
        };
        apts = await client.apt.findMany(query);
        count = await client.apt.count({
          where: query.where,
        });
        break;
      }
      case "아파트 명": {
        query = {
          skip: (+searchParams.get("page")! - 1) * 10,
          take: 10,
          where: {
            name: keyword || "",
          },
          select: {
            id: true,
            name: true,
            treadAmount: true,
            dong: true,
          },
        };
        apts = await client.apt.findMany(query);
        count = await client.apt.count({
          where: query.where,
        });
        break;
      }
      case "법정동": {
        query = {
          skip: (+searchParams.get("page")! - 1) * 10,
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
        };
        apts = await client.apt.findMany(query);
        count = await client.apt.count({
          where: query.where,
        });
        break;
      }
      case "평 형": {
        query = {
          skip: (+searchParams.get("page")! - 1) * 10,
          take: 10,
          where: {
            dedicatedArea: {
              equals: +`${keyword}`,
            },
          },
          select: {
            id: true,
            name: true,
            treadAmount: true,
            dong: true,
          },
        };
        apts = await client.apt.findMany(query);
        count = await client.apt.count({
          where: query.where,
        });
        break;
      }
      case "거래액": {
        query = {
          skip: (+searchParams.get("page")! - 1) * 10,
          take: 10,
          where: {
            treadAmount: {
              equals: +`${keyword}`,
            },
          },
          select: {
            id: true,
            name: true,
            treadAmount: true,
            dong: true,
          },
        };
        apts = await client.apt.findMany(query);
        count = await client.apt.count({
          where: query.where,
        });
        break;
      }
      case "거래일자": {
        query = {
          skip: (+searchParams.get("page")! - 1) * 10,
          take: 10,
          where: {
            treadDate: {
              contains: `${keyword}`,
            },
          },
          select: {
            id: true,
            name: true,
            treadAmount: true,
            dong: true,
          },
        };
        apts = await client.apt.findMany(query);
        count = await client.apt.count({
          where: query.where,
        });
        break;
      }
      case "건축년도": {
        query = {
          skip: (+searchParams.get("page")! - 1) * 10,
          take: 10,
          where: {
            buildYear: {
              equals: +`${keyword}`,
            },
          },
          select: {
            id: true,
            name: true,
            treadAmount: true,
            dong: true,
          },
        };
        apts = await client.apt.findMany(query);
        count = await client.apt.count({
          where: query.where,
        });
        break;
      }
    }

    return res.json({
      ok: true,
      apts,
      totalPage: Math.ceil(count / 10),
    });
  } catch {
    return res.json({
      ok: false,
      error: "부동산 목록을 불러오지 못했습니다.\n 잠시 후 다시 시도해 주세요.",
    });
  }
}
