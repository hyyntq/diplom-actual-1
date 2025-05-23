import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/header";
import SubNav from "@/components/layout/subnav";
import Footer from "@/components/layout/footer";
import { CartProvider } from "@/lib/context/cart-context";
import { getMe } from "@/services/get.me";
import { Toaster } from "@/components/ui/sonner";
import { UserProvider } from "@/lib/context/user-context";
import { FavoriteProvider } from "@/lib/context/favorite-context";
// import { FavoriteProvider } from "@/lib/context/favorite-context";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const result = await getMe();

  let initialUser: {
    ok: boolean;
    id: number;
    username: string;
    email: string;
    jwt: string | null;
  } | null = null;

  if (result.ok && result.data) {
    initialUser = {
      ok: result.ok,
      id: result.data.id,
      username: result.data.username,
      email: result.data.email,
      jwt: result.data.jwt || null
    };
  } else if (result.error) {
    console.warn("User initialization error:", result.error);
  }

  return (
    <html
      lang="en"
      style={{
        scrollbarColor: "#78716C #F3F4F6",
      }}
    >
      <body>
        <div className="min-h-screen bg-gray-200 flex flex-col ">
          <UserProvider initialUser={initialUser}>
            <CartProvider>
              <FavoriteProvider>
                <div className="sticky top-0 z-50 ">
                  <Header />
                  <SubNav />
                </div>
                <main className="flex flex-col grow max-w-screen min-w-0 w-full min-h-[calc(100vh-144px)] ">
                  {children}
                </main>

                <Footer />
                <Toaster
                  closeButton
                  toastOptions={{
                    classNames: {
                      toast: "flex items-center", // по центру по вертикали
                      title:
                        "text-center w-full text-xl font-semibold px-1 py-3",
                      actionButton: "bg-red-800 text-2xl",
                      closeButton: "text-xl p-4",
                    },
                    duration: 3000,
                  }}
                />
              </FavoriteProvider>
            </CartProvider>
          </UserProvider>
        </div>
      </body>
    </html>
  );
}
