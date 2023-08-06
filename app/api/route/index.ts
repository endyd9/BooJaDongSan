import { NextApiRequest, NextApiResponse } from "next";

export default async function test(req: NextApiRequest, res: NextApiResponse) {
  console.log("야호");

  res.json({ 야호: "야호!" });
}
