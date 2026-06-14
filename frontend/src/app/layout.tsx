import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Web3Provider } from "../providers/Web3Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DYNA Protocol | Decentralized Staking",
  description: "Yield Staking and LP Staking for DYNA tokens. The future of decentralized value.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-zinc-950 text-white min-h-screen`}>
        <Web3Provider>
          {children}
        </Web3Provider>
      </body>
    </html>
  );
}
