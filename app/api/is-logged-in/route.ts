import { NextResponse } from "next/server";
import { verify } from "@/lib/server/jwtUtil";
import { client } from "@/lib/server/client";
import { cookies } from "next/headers";

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
        id: true,
      },
    });

    if (!user) throw new Error();

    return res.json({ ok: true, user });
  } catch {
    return res.json({ ok: false });
  }
}
