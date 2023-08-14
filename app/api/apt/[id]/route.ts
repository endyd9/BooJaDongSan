import { NextResponse } from "next/server";
import { client } from "@/lib/server/client";
import { verify } from "@/lib/server/jwtUtil";
import axios from "axios";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const res = NextResponse;

  const { id } = params;

  const token: any = req.headers.get("cookie")?.replace("x-jwt=", "");
  let userId: any;
  if (token === undefined) {
    userId = {
      id: null,
    };
  } else {
    userId = verify(token);
  }

  try {
    const apt = await client.apt.update({
      where: {
        id: +id,
      },
      data: {
        view: {
          increment: 1,
        },
      },
    });

    const isLike = Boolean(
      await client.like.findFirst({
        where: {
          aptId: +id,
          userId: +userId.id,
        },
      })
    );

    const { data } = await axios.get(
      `https://dapi.kakao.com/v2/local/search/address?query=${apt.dong} ${
        apt.roadName
      } ${+apt.buildingNum} ${+apt.buildingMinorNum}`,
      {
        headers: {
          Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_KEY}`,
        },
      }
    );
    const coords = {
      x: data.documents[0].x,
      y: data.documents[0].y,
    };

    return res.json({
      ok: true,
      apt,
      coords,
      isLike,
    });
  } catch {
    return res.json({
      ok: false,
      error: "부동산 목록을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.",
    });
  }
}
