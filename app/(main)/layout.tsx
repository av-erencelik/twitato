import Header from "@/components/header/Header";
import "../globals.css";
import { Open_Sans } from "@next/font/google";
import Sidebar from "@/components/leftSidebar/Sidebar";
import Provider from "@/components/Provider";
const openSans = Open_Sans({ subsets: ["latin"] });
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className={`max-w-7xl mx-auto ${openSans.className}`}>
        <Provider>
          <Header />
          <div className="flex">
            <Sidebar />
          </div>
          {children}
        </Provider>
      </body>
    </html>
  );
}
