import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Navbar } from "@/components/navbar";
import { LocaleProvider } from "./LocaleContext";
import LocaleWrapper from "./LocaleWrapper";

export const metadata: Metadata = {
  title: "FairWork Contract",
  description: "Created with v0",
  generator: "v0.app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <LocaleProvider>
        <LocaleWrapper>
          <html lang="en">
            <body>
              <Navbar />
              <main>{children}</main>
            </body>
          </html>
        </LocaleWrapper>
      </LocaleProvider>
    </ClerkProvider>
  );
}
