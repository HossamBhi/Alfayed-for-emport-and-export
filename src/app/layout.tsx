import type { Metadata } from "next";
import { Inter } from "next/font/google";
import App from "./app";
import "./globals.css";
import Provider from "./Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "الفايد للاستيراد والتصدير",
  description: "الفايد للاستيراد والتصدير",
  icons: {apple: "/icon-512x512.png"},
  themeColor: "#fff"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme={"dark"}>
      <body className={inter.className}>
        <Provider>
          <App>{children}</App>
        </Provider>
      </body>
    </html>
  );
}
