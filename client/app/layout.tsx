import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { MainLayout } from "@/components-server/MainLayout/MainLayout";
import { AuthProvider } from "@/context/auth-provider/AuthProvider";
import { headers } from "next/headers";
import { Routes } from "@/constants/routes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Profectus Library",
  description: "Generated by Ramin Yavari",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const headersList = headers();
  const currentUrl = headersList.get("x-current-path") || "";

  const isLoginPage = currentUrl.toLowerCase() === Routes.login.fullPath;

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {isLoginPage && <>{children}</>}
          {!isLoginPage && <MainLayout>{children}</MainLayout>}
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
