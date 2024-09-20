import { NextResponse } from "next/server";
import { BLOG_BASE_URL } from "../../config";

export async function GET(request) {
  const token = request.cookies.get("token");
  const cookieHeader = request.headers.get("cookie");

  const url = request.nextUrl;
  const pathname = url.pathname; 
  const blogId = pathname.split("/").pop(); 

  const response = await fetch(BLOG_BASE_URL+`/${blogId}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token?.value || null}`,
      Cookie: cookieHeader,
    },
    credentials: "include",
  });
  const resultData = await response.json();

  const nextResponse = NextResponse.json(resultData, {
    status: response.status,
  });

  const setCookieHeader = response.headers.get("set-cookie");
  if (setCookieHeader) {
    nextResponse.headers.set("Set-Cookie", setCookieHeader);
  }

  return nextResponse;
}

export async function DELETE(request) {
  const token = request.cookies.get("token");
  const cookieHeader = request.headers.get("cookie");
  const url = request.nextUrl;
  const pathname = url.pathname; 
  const blogId = pathname.split("/").pop(); 

  const response = await fetch(BLOG_BASE_URL+`/${blogId}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token?.value || null}`,
      Cookie: cookieHeader,
    },
    credentials: "include",
  });
  const resultData = await response.json();

  const nextResponse = NextResponse.json(resultData, {
    status: response.status,
  });

  const setCookieHeader = response.headers.get("set-cookie");
  if (setCookieHeader) {
    nextResponse.headers.set("Set-Cookie", setCookieHeader);
  }

  return nextResponse;
}