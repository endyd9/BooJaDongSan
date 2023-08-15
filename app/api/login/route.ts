import { NextResponse } from "next/server";
import { client } from "@/lib/server/client";
import { compare } from "@/lib/server/hashPassword";
import { sign } from "@/lib/server/jwtUtil";

export async function POST(req: Request) {
  const res = NextResponse;
  const { email, pass } = await req.json();

  try {
    const user = await client.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.json({
        ok: false,
        error: "유저정보를 찾을 수 없습니다.",
      });
    }

    if (!(await compare(pass, user.password))) {
      return res.json({
        ok: false,
        error: "비밀번호가 일치하지 않습니다.",
      });
    }

    const { token } = sign(user.id + "");

    return res.json({ ok: true, token });
  } catch {
    return res.json({
      ok: false,
      error: "로그인에 실패했습니다.\n잠시 후 다시 시도해 주세요.",
    });
  }
}
