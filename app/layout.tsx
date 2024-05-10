import { Inter } from "next/font/google";
import "./globals.css";
import StepStatusBar from "./components/StepStatusBar";

import { LocalStorageProvider } from "./context/LocalStorage";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen">
        <LocalStorageProvider>
          <StepStatusBar />
          <div className="md:px-56">{children}</div>
        </LocalStorageProvider>
      </body>
    </html>
  );
}
