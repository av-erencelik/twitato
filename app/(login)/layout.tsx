import { Open_Sans } from "@next/font/google";

import Provider from "@/components/Provider";
const openSans = Open_Sans({ subsets: ["latin"] });
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className={`max-w-7xl mx-auto ${openSans.className}`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
