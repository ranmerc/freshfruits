import path from "path";
import type { NextApiRequest, NextApiResponse } from "next";
import { promises as fs } from "fs";
import FruitData from "@/types/FruitData";
import FruitAPIResponse from "@/types/FruitAPIResponse";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FruitAPIResponse>
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed", data: null });
  }

  let { id } = req.query;

  if (!id) {
    return res
      .status(400)
      .json({ message: "Missing id parameter", data: null });
  }

  let numId: number;

  if (Array.isArray(id)) {
    id = id.join("");
  }

  numId = parseInt(id);

  try {
    const fileContents = await fs.readFile(
      path.join(process.cwd(), "data") + "/fruitdata.json",
      "utf8"
    );
    const jsonData = JSON.parse(fileContents) as FruitData[];

    const fruit = jsonData.find((item) => item.id === numId);

    if (!fruit) {
      return res.status(404).json({ message: "Fruit not found", data: null });
    }

    return res.status(200).json({
      message: "Fruit found",
      data: fruit,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", data: null });
  }
}
