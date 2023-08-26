import path from "path";
import fs from "fs/promises";
import { APIResponse } from "@/types/LoginTypes";
import { UserData } from "@/types/LoginTypes";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponse>
) {
  if (req.method === "POST") {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(422).json({ message: "Invalid input" });
    }

    const data = await fs.readFile(
      path.join(process.cwd(), "/data/userdata.json"),
      "utf8"
    );

    const userData = JSON.parse(data) as UserData[];

    const existingUser = userData.find(
      (user) => user.username === username || user.email === email
    );

    if (existingUser) {
      return res.status(422).json({ message: "User already exists" });
    }

    userData.push({ username, email, password });

    await fs.writeFile(
      path.join(process.cwd(), "/data/userdata.json"),
      JSON.stringify(userData)
    );

    return res.status(200).json({ message: "Success" });
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
