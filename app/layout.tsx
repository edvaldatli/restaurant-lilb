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
      <body className="md:h-screen">
        <LocalStorageProvider>
          <StepStatusBar />
          <div className="lg:px-56">{children}</div>
        </LocalStorageProvider>
      </body>
    </html>
  );
}
