import { authMiddleware } from "better-auth/next-js";
import { NextResponse } from "next/server";
// import { auth } from "@/lib/auth";

export default authMiddleware({
    customRedirect: async (session, request) => {
        const baseURL = request.nextUrl.origin;
        if (request.nextUrl.pathname === "/login" && session) {
            return NextResponse.redirect(new URL("/", baseURL));
        }
        if (request.nextUrl.pathname === "/dashboard" || request.nextUrl.pathname === "/" && !session) {
            return NextResponse.redirect(new URL("/login", baseURL));
        }
        return NextResponse.next();
    },
});

export const config = {
    matcher: ["/", "/dashboard", "/login"],
};