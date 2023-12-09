import type { Metadata } from "next";
import { Inter } from "next/font/google";
import App from "./app";
import "./globals.css";
import Provider from "./Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "الفايد للاستيراد والتصدير",
  description: "الفايد للاستيراد والتصدير",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <App>{children}</App>
        </Provider>
      </body>
    </html>
  );
}
