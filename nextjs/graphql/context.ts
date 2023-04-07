import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken"

const APP_SECRET = "GraphQL-is-aw3some";

function getTokenPayload(token: string)  {
  return jwt.verify(token, APP_SECRET);
}

function isAuthenticated(req) {
  // I use a cookie called 'session'
  const { session } = req?.cookies

  // Cryptr requires a minimum length of 32 for any signing
  if (!session || session.length < 32) {
    return false
  }

  return true
}

export default async function createContext({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) {
  console.log(res);
  return {
    // expose the cookie helper in the GraphQL context object
   
    cookie: res.cookie,
    // allow queries and mutations to look for an `isMe` boolean in the context object
    isMe: isAuthenticated(req),
  }
}
