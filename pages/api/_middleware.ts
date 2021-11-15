import { NextRequest, NextResponse } from 'next/server'
import { unsealData } from 'iron-session';
import { sessionOptions } from 'lib/session';

const handler = async (req: NextRequest) => {
	// Let's get the cookie from the request
	const ironSessionCookie = req.cookies['iron-session/examples/next.js'];

	// We unseal the cookie to access its data
	const sessionData = await unsealData(ironSessionCookie, sessionOptions);
	// The rest is unreachable, see errors below:

	// wait  - compiling /api/user (server only)...
	// warn  - ./node_modules/events/events.js
	// `eval` not allowed in Middleware pages/api/_middleware
	// ./node_modules/readable-stream/lib/_stream_writable.js

	// Try to print the unsealed cookie data.
	console.log(sessionData);

	return NextResponse.next()
};

export default handler;
