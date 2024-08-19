import { Inter } from "next/font/google";
import "./globals.css";
import MainHeader from "@/component/main-header/main-header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bob de Fif – Handmade Bobs Designed and Manufactured by Fif in France",
  description: "Explore a unique collection of handmade bobs, crafted with care and designed to offer both style and comfort. Discover our locally produced, sustainable hats and join our fashion revolution!",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-fuchsia-100	">
        <MainHeader className="z-30"/>
        {children}
        </body>
    </html>
  );
}
