import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import "@uploadthing/react/styles.css";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { EdgeStoreProvider } from "../lib/edgestore";

import { ourFileRouter } from "@/app/api/uploadthing/core";

export const metadata: Metadata = {
  title: "MediAssist",
  description: "MediAssist is a personal health record app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className="no-scrollbar">
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
            <EdgeStoreProvider>{children}</EdgeStoreProvider>
          </ThemeProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}
