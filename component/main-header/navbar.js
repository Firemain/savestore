import Link from 'next/link';
export default function Navbar () {
    return (
        <nav className="font-semibold text-lg">
            <ul className="flex items-center gap-1.5">
                <li className="p-4 border-b-2 border-transparent text-fuchsia-950  hover:border-y-fuchsia-800	 hover:text-fuchsia-800 duration-200 cursor-pointer">
                    <Link href="/">Home</Link>
                </li>
                <li className="p-4 border-b-2 border-transparent text-fuchsia-950  hover:border-y-fuchsia-800	 hover:text-fuchsia-800 duration-200 cursor-pointer">
                    <Link href="/products">Products</Link>
                </li>
                <li className="p-4 border-b-2 border-transparent text-fuchsia-950  hover:border-y-fuchsia-800	 hover:text-fuchsia-800 duration-200 cursor-pointer">
                    <Link href="/collections">Collections</Link>
                </li>
                <li className="p-4 border-b-2 border-transparent text-fuchsia-950  hover:border-y-fuchsia-800	 hover:text-fuchsia-800 duration-200 cursor-pointer">
                    <Link href="/contact">Contact</Link>
                </li>
            </ul>
        </nav>
    )
}