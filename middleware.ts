import { MOBILE_ROUTES, ROUTES } from "@/constants/routes";
import { isEmpty } from "lodash";
import { NextRequest, NextResponse, userAgent } from "next/server";

export default function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  let isLogin = !isEmpty(request.cookies.get("access_token"));

  const { device } = userAgent(request);

  if (device.type === "mobile") {
    return NextResponse.redirect(new URL(MOBILE_ROUTES.HOME, request.url));
  }

  if (!isLogin) {
    return NextResponse.rewrite(new URL(ROUTES.SIGN_IN, request.url));
  } else {
    if (url.pathname === ROUTES.SIGN_IN) {
      url.pathname = ROUTES.HOME;
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  runtime: "experimental-edge",
  unstable_allowDynamic: [
    "**/node_modules/lodash/_root.js", // use a glob to allow anything in the function-bind 3rd party module
  ],

  matcher: ["/((?!account|_next/static|_next/image|favicon.ico).*)"],
};
