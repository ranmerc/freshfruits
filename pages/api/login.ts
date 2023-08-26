import type { NextApiRequest, NextApiResponse } from "next";

type Response = {
  username?: string;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    if (email === "a@b.com" && password === "password") {
      return res.status(200).json({ username: "Joe" });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
