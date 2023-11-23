import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryClientProvider } from "@/components/QueryClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Black Jack Game",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <QueryClientProvider>
        <body
          className={`${inter.className} flex flex-col bg-green-600 min-h-screen p-2 md:p-8`}
        >
          {children}
        </body>
      </QueryClientProvider>
    </html>
  );
}
