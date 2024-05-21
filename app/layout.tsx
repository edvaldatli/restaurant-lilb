import { Inter } from "next/font/google";
import "./globals.css";
import StepStatusBar from "./components/StepStatusBar";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { LocalStorageProvider } from "./context/LocalStorage";
import OrderProvider from "./context/OrderContext";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lil Bits",
  description:
    "Lil Bits is a restaurant that serves small portions of food and drinks.",
};

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
        <OrderProvider>
          <LocalStorageProvider>
            <StepStatusBar />
            <div className="px-4 lg:px-2 2xl:px-72 pt-6 pb-8 lg:pt-32 h-screen max-h-screen overflow-hidden">
              {children}
            </div>
          </LocalStorageProvider>
        </OrderProvider>
      </body>
    </html>
  );
}
