import { NextResponse } from "next/server";
import { client } from "@/lib/server/client";
import { hashing } from "@/lib/server/hashPassword";

export async function POST(req: Request) {
  const { email, pass, nick, addr } = await req.json();

  try {
    const exists = await client.user.findUnique({
      where: {
        email,
      },
    });
    if (exists) {
      return NextResponse.json({
        ok: false,
        error: "이미 가입된 이메일 입니다.",
      });
    }

    const password = await hashing(pass);

    await client.user.create({
      data: {
        email,
        password,
        nickName: nick,
        address: addr === "" ? null : addr,
      },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({
      ok: false,
      error: "가입에 실패했습니다. 잠시 후 다시 시도해 주세요.",
    });
  }
}
