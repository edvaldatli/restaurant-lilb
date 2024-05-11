import { Inter } from "next/font/google";
import "./globals.css";
import StepStatusBar from "./components/StepStatusBar";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { LocalStorageProvider } from "./context/LocalStorage";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Analytics />
        <SpeedInsights />
      </head>
      <body className="">
        <LocalStorageProvider>
          <StepStatusBar />
          <div className="px-4 lg:px-2 2xl:px-96 pt-6 pb-8 lg:pt-32 h-screen">
            {children}
          </div>
        </LocalStorageProvider>
      </body>
    </html>
  );
}
