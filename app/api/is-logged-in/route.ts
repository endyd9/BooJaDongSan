import { verify } from "@/lib/server/jwtUtil";
import { cookies } from "next/dist/client/components/headers";
import { NextResponse } from "next/server";
import client from "@/lib/server/client";

export async function GET(req: Request) {
  const res = NextResponse;

  try {
    const token: any = cookies().get("x-jwt")?.value;

    const userId: any = verify(token);

    const user = await client.user.findUnique({
      where: {
        id: +userId.id,
      },
      select: {
        id: true,
      },
    });

    return res.json({ ok: true, user });
  } catch {
    return res.json({ ok: false });
  }
}
