import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AUTH_BASE_URL, JSON_CONTENT_TYPE } from "../../config";

export async function GET(request) {
    const token = request.cookies.get('token');
    const refresh = request.cookies.get('refresh');

    const response = await fetch(AUTH_BASE_URL+'/logout',{
        method:"GET",
        headers:{
            "Content-Type": JSON_CONTENT_TYPE 
        },
        credentials:"include",
    })
    const resultData = await response.json();
    
    const nextResponse = NextResponse.json(resultData, {
        status: response.status,
    });

    cookies().delete('token');
    cookies().delete('refresh');

    const setCookieHeader = response.headers.get('set-cookie');
    if (setCookieHeader) {
        nextResponse.headers.set('Set-Cookie', setCookieHeader);
    }

    return nextResponse;
}
