import type { NextApiResponse } from "next";
import { serialize } from "cookie";

/**
 * This sets `cookie` on `res` object
 */
export const cookie = (
  res: NextApiResponse,
  name: string,
  value: string,
  options: { expires?: Date; maxAge?: number } = {},
) => {
  const stringValue =
    typeof value === "object" ? "j:" + JSON.stringify(value) : String(value);

  const cookieOption = { ...options };
  if ("maxAge" in cookieOption) {
    cookieOption.expires = new Date(Date.now() + (cookieOption?.maxAge || 0));
  }

  res.setHeader(
    "Set-Cookie",
    serialize(name, String(stringValue), cookieOption),
  );
};
