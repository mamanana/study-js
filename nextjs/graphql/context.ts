import type { NextApiRequest } from "next";
import { verifyJwtToken } from "@/untils/auth";

async function isAuthenticated(req: NextApiRequest) {
  // I use a cookie called 'session'
  const { token } = req?.cookies;

  // Cryptr requires a minimum length of 32 for any signing
  if (token) {
    const userId = await verifyJwtToken(token);

    if (userId) {
      return {
        isLogin: true,
        userId,
      };
    }
  }

  return {
    isLogin: false,
    userId: null,
  };
}

export default async function createContext({
  req
}: {
  req: NextApiRequest;
}) {
  const authorization = await isAuthenticated(req);
  return {
    ...authorization,
  };
}
