import type { NextApiRequest, NextApiResponse } from "next";
import PriceData from "@/types/PriceData";
import path from "path";
import { promises as fs } from "fs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PriceData | { message: string }>
) {
  const id = req.query.id;

  if (!id) {
    res.status(400).json({ message: "id param required" });
    return;
  }

  const dataDirectory = path.join(process.cwd(), "data");
  const data = JSON.parse(
    await fs.readFile(dataDirectory + "/pricedata.json", "utf8")
  ) as PriceData[];

  const priceData = data.find((priceData) => priceData.id === Number(id));

  if (!priceData) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  res.status(200).json(priceData);
}
