import Link from "next/link";
import logoImg from "@/assets/logo.png";
import Image from "next/image";
import NavLink from "./nav-link";
import Cart from "./cart";
import Navbar from "./navbar";
import LogoutButton from "./logout-button";


export default function MainHeader() {
    return (
        <header className="sticky top-0 z-50 bg-white shadow-md flex items-center justify-between px-8 py-2">
            <div className="flex-1">
                <Link href="/">
                    <Image src={logoImg} alt="Site Logo" width={50} height={50} className="cursor-pointer"/>

                </Link>
            </div>

            <div className="flex-1 flex justify-center">
                <div className="space-x-4">
                    
                        <Link href="/" className="text-lg font-semibold text-fuchsia-950 hover:text-fuchsia-800 duration-200 hover:underline">
                            Home
                    </Link>
                        <Link href="/shop" className="text-lg font-semibold text-fuchsia-950 hover:text-fuchsia-800 duration-200 hover:underline">
                            Catalog
                    </Link>
                </div>
            </div>


            <div className="flex-1 flex justify-end">
                    <Link href="/shop/cart" className="p-1 text-fuchsia-950 hover:text-fuchsia-800 duration-200">
                        <Cart />
                </Link>
            </div>
        </header>
    );

}