import { NextResponse } from "next/server";
import { client } from "@/lib/server/client";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const res = NextResponse;
  const page = new URL(req.url).searchParams.get("page");

  try {
    const user = await client.user.findUnique({
      where: {
        id: +params.id,
      },
      select: {
        id: true,
        email: true,
        nickName: true,
      },
    });

    if (!user) throw new Error();

    if (!page)
      return res.json({
        ok: true,
        user,
      });
    const like = await client.like.findMany({
      skip: (+page - 1) * 5,
      take: 5,
      where: {
        userId: +params.id,
      },
      select: {
        apt: {
          select: {
            id: true,
            name: true,
            dong: true,
            treadAmount: true,
          },
        },
      },
    });

    const count = await client.like.count({
      where: {
        userId: +params.id,
      },
    });

    return res.json({
      ok: true,
      user,
      like,
      totalPage: Array.from({ length: Math.ceil(count / 5) }, () => 0),
    });
  } catch {
    return res.json({
      ok: false,
      error: "유저 정보를 찾을 수 없습니다.",
    });
  }
}
