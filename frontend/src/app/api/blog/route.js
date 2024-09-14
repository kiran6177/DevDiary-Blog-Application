import { NextResponse } from "next/server";
import { BLOG_BASE_URL } from "../config";

export async function  POST(request) {
    const formdata = await request.formData();
    const token = request.cookies.get("token")
    const cookieHeader = request.headers.get("cookie");
    
    const response = await fetch(BLOG_BASE_URL,{
        method:"POST",
        headers:{
            "authorization":`Bearer ${token?.value || null}`,
            "Cookie":cookieHeader
        },
        credentials:"include",
        body:formdata
    })
    const resultData = await response.json();
    console.log("RESDATA",resultData);
    
    const nextResponse = NextResponse.json(resultData, {
        status: response.status,
    });


    const setCookieHeader = response.headers.get('set-cookie');
    if (setCookieHeader) {
        nextResponse.headers.set('Set-Cookie', setCookieHeader);
    }

    return nextResponse;
}