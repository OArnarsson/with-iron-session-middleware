// lib/session.ts or in _middleware.ts
import Crypto from "crypto";
import { unsealData } from "iron-session";
import { sessionOptions } from "lib/session";
import { NextRequest, NextResponse } from "next/server";

Crypto.timingSafeEqual = function timingSafeEqual(a, b) {
  if (!Buffer.isBuffer(a)) {
    throw new TypeError("First argument must be a buffer");
  }
  if (!Buffer.isBuffer(b)) {
    throw new TypeError("Second argument must be a buffer");
  }
  if (a.length !== b.length) {
    throw new TypeError("Input buffers must have the same length");
  }
  var len = a.length;
  var out = 0;
  var i = -1;
  while (++i < len) {
    out |= a[i] ^ b[i];
  }
  return out === 0;
};

const handler = async (req: NextRequest) => {
  // Let's get the cookie from the request
  const ironSessionCookie = req.cookies["iron-session/examples/next.js"];
  if (!ironSessionCookie) {
    console.log("No cookie found!");
    return NextResponse.next();
  }

  // We unseal the cookie to access its data
  const sessionData = await unsealData(ironSessionCookie, sessionOptions);
  // The rest is unreachable, see errors below:

  // wait  - compiling /api/user (server only)...
  // warn  - ./node_modules/events/events.js
  // `eval` not allowed in Middleware pages/api/_middleware
  // ./node_modules/readable-stream/lib/_stream_writable.js

  // Try to print the unsealed cookie data.
  console.log(sessionData);

  return NextResponse.next();
};

export default handler;
