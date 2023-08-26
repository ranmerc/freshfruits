import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs/promises";
import { UserData, SuccessResponse, ErrorResponse } from "@/types/LoginTypes";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    const data = await fs.readFile(
      path.join(process.cwd(), "/data/userdata.json"),
      "utf8"
    );

    const userData = JSON.parse(data) as UserData[];

    const user = userData.find(
      (ud) => ud.email === email && ud.password === password
    );
    if (user) {
      return res.status(200).json({ username: user.username });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
