import { NextResponse } from "next/server";
import { client } from "@/lib/server/client";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { verify } from "@/lib/server/jwtUtil";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const res = NextResponse;

  const tokken: string = cookies().get("x-jwt")!.value;
  const { id: userId }: any = verify(tokken);

  const { id } = params;
  try {
    const isLike = await client.like.findFirst({
      where: {
        aptId: +id,
        userId: +userId,
      },
    });

    if (!isLike) {
      await client.like.create({
        data: {
          aptId: +id,
          userId: +userId,
        },
      });
    } else {
      await client.like.delete({
        where: {
          id: isLike.id,
        },
      });
    }
    return res.json({
      ok: true,
    });
  } catch (error) {
    return res.json({
      ok: false,
      error,
    });
  }
}
