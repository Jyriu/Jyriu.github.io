import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <div className="fixed inset-0 z-0 bg-[#F5F5F5]"></div>
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}