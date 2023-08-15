import { verify } from "@/lib/server/jwtUtil";
import { cookies } from "next/dist/client/components/headers";
import { NextResponse } from "next/server";
import { client } from "@/lib/server/client";
import { hashing } from "@/lib/server/hashPassword";

export async function GET(req: Request) {
  const res = NextResponse;
  const token: any = cookies().get("x-jwt")?.value;
  try {
    const userId: any = verify(token);
    const user = await client.user.findUnique({
      where: {
        id: +userId.id,
      },
      select: {
        email: true,
        nickName: true,
        address: true,
      },
    });

    return res.json({ ok: true, user });
  } catch {
    return res.json({ ok: false });
  }
}

export async function POST(req: Request) {
  const res = NextResponse;

  try {
    const { email, pass, nickName, address } = await req.json();
    const token: any = cookies().get("x-jwt")?.value;

    const userId: any = verify(token);

    const password = pass !== undefined ? await hashing(pass) : pass;
    await client.user.update({
      where: {
        id: +userId!.id,
      },
      data: {
        email,
        password,
        nickName,
        address,
      },
    });

    return res.json({ ok: true, id: userId.id });
  } catch {
    return res.json({ ok: false });
  }
}
