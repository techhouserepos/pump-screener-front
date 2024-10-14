import type { NextApiRequest } from 'next';
import { AES, enc } from "crypto-js";

export type ApiToken = {
  location: string;
  created: number;
}

export default function apiTokenMiddleware(
  req: NextApiRequest,
) {
  try {
    const { authorization } = req.headers;
    if (typeof authorization === "string" && authorization) {
      const decrypt = AES.decrypt(authorization, process.env.API_KEY || "secret").toString(enc.Utf8);
      if (decrypt) {
        const parsed: ApiToken = JSON.parse(decrypt);
        return Date.now() < parsed.created + 5000 && parsed.location.startsWith(process.env.ORIGIN || "http://localhost:3000/");
      }
    }
  } catch (error) {
    console.log("API TOKEN ERROR", error);
  }
  return false;
}
