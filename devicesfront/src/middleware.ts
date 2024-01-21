import appConfig from "@/config";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

async function auth(token: string | undefined) {
  if (!token) {
    return false;
  }

  const response = await fetch(`${appConfig.api.back}/api/v1/auth/check`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })

  return response.status === 204;
}

export async function middleware(req: NextRequest) {
  const cookies = req.cookies;
  const { pathname } = req.nextUrl;

  const token = cookies.get("token")?.value;
  const isAuth = await auth(token);

  if (pathname === "/") {
    if (isAuth) {
      return NextResponse.redirect(appConfig.app.dashboardUrl);
    }
    return NextResponse.next();
  } else {
    if (!isAuth) {
      return NextResponse.redirect(appConfig.app.url);
    }
    return NextResponse.next();
  }
}

export const config = {
    matcher: ["/", "/dashboard/:path*"]
}
