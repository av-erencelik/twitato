import Header from "@/components/header/Header";
import "../globals.css";
import { Open_Sans } from "@next/font/google";
import Sidebar from "@/components/leftSidebar/Sidebar";
import Provider from "@/components/Provider";
import MobileMenu from "@/components/mobile/MobileMenu";
import SidebarRight from "@/components/rightSidebar/SidebarRight";
const openSans = Open_Sans({ subsets: ["latin"] });
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className={`max-w-7xl mx-auto ${openSans.className} min-h-[100vh]`}>
        <Provider>
          <Header />
          <div className="flex justify-between">
            <Sidebar />
            {children}
            <SidebarRight />
          </div>
          <MobileMenu />
        </Provider>
      </body>
    </html>
  );
}
