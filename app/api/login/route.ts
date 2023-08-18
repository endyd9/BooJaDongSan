import { NextResponse } from "next/server";
import { client } from "@/lib/server/client";
import { compare } from "@/lib/server/hashPassword";
import { decode, sign } from "@/lib/server/jwtUtil";

export interface GoogleUser {
  email: string;
  name: string;
}

export async function POST(req: Request) {
  const res = NextResponse;
  const { email, pass, isGoogle, data } = await req.json();

  try {
    if (isGoogle) {
      const userData: any = decode(data);

      const user = await client.user.findUnique({
        where: {
          email: userData.email,
        },
      });

      if (!user) {
        const user = await client.user.create({
          data: {
            email: userData.email,
            nickName: userData.name,
            isGoogel: true,
          },
        });
        const { token } = sign(user.id + "");
        return res.json({
          ok: true,
          token,
        });
      }
      const { token } = sign(user.id + "");

      return res.json({
        ok: true,
        token,
      });
    }
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

    if (!(await compare(pass, user.password!))) {
      return res.json({
        ok: false,
        error: "비밀번호가 일치하지 않습니다.",
      });
    }

    const { token } = sign(user.id + "");

    return res.json({ ok: true, token });
  } catch (error) {
    console.log(error);

    return res.json({
      ok: false,
      error: "로그인에 실패했습니다.\n잠시 후 다시 시도해 주세요.",
    });
  }
}
