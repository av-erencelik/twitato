import Header from "@/components/header/Header";
import "./globals.css";
import { Open_Sans } from "@next/font/google";
import Sidebar from "@/components/leftSidebar/Sidebar";
const openSans = Open_Sans({ subsets: ["latin"] });
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className={`max-w-7xl mx-auto ${openSans.className}`}>
        <Header />
        <Sidebar />
        {children}
      </body>
    </html>
  );
}
