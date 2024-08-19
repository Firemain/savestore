import Image from "next/image";
import Link from "next/link";
import classes from "./shopping-item.module.css";

export default function ShoppingItem({ title, slug, image, description, price }) {
  return (
    <article className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-fuchsia-950 transition-all duration-300">
      <div className="relative h-60">
        <Image src={image} alt={title} layout="fill" objectFit="contain" className="w-full h-full" />
      </div>
      <div className="flex flex-col justify-between p-4">
        <header>
          <h2 className="text-3xl font-sans text-[#ddd6cb]">{title}</h2>
          <p className="text-sm italic text-[#ddd6cb]">{description}</p>
        </header>
        <footer>
          <div className="flex justify-between items-center mt-4">
            <p className="text-left text-2xl text-fuchsia-300">{price}€</p>
            <Link className="py-2 px-4 rounded-md bg-gradient-to-r from-fuchsia-950 to-[#fe7ad2] text-white font-bold no-underline hover:bg-gradient-to-r hover:from-[#fd4715] hover:to-[#f9b241] hover:shadow-lg" href={`/shop/${slug}`}>
              Choose a size
            </Link>
          </div>
        </footer>
      </div>
    </article>
  );
}