import { NextRequest, NextResponse } from "next/server";
import client from "../../../lib/server/client";

export async function GET(req: Request) {
  const res = NextResponse;

  // 요청한 URL에서 id값 추출

  const params: any = req.headers
    .get("referer")
    ?.replace("http://localhost:3000/profile/", "");

  try {
    const user = await client.user.findUnique({
      where: {
        id: +params,
      },
      select: {
        id: true,
        email: true,
        nickName: true,
      },
    });

    if (!user) throw new Error();

    return res.json({ ok: true, user });
  } catch {
    return res.json({
      ok: false,
      error: "유저 정보를 찾을 수 없습니다.",
    });
  }
}
