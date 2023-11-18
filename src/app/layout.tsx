import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Box } from "@mui/material";
import Sidebar from "./component/Sidebar";
import { getServerSession } from 'next-auth/next'
import { authOptions } from './api/auth/[...nextauth]/route'
import NextAuthProvider from "./providers/NextAuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Final Project",
  description: "Sw-dev-prac2 final proj",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const nextAuthSession = await getServerSession(authOptions)
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider session={nextAuthSession}>
        <Box sx={{ display: "flex" }}>
          <Sidebar />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
            }}>
            {children}
          </Box>
        </Box>
        </NextAuthProvider>
      </body>
    </html>
  );
}
