import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = [
  "/cart",
  "/checkout",
  "/profile",
  "/orders",
  "/favorites",
];
const guestOnlyRoutes = ["/login", "/register"];

export async function middleware(req: NextRequest) {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt")?.value;
  const { pathname } = req.nextUrl;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isGuestOnly = guestOnlyRoutes.includes(pathname);

  if (isProtected && !jwt) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isGuestOnly && jwt) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // ✅ Иначе пропускаем
  return NextResponse.next();
}

// 🧠 Указываем, какие маршруты обрабатывать middleware
export const config = {
  matcher: ["/cart", "/checkout", "/login", "/register", "/favorites"],
};
