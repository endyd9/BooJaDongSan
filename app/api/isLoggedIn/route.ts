import { verify } from "@/lib/server/jwtUtil";
import { cookies } from "next/dist/client/components/headers";
import { NextResponse } from "next/server";
import client from "../../../lib/server/client";

export async function GET(req: Request) {
  const res = NextResponse;

  const user = Boolean(
    await client.user.findUnique({
      where: {
        id: +verify(cookies().get("x-jwt").value).id,
      },
    })
  );

  return res.json({ ok: user });
}
