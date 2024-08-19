import Image from "next/image";
import Link from "next/link";
import ImageSlideshow from "@/component/image-slideshow";
import classes from "./page.module.css"


export default function Home() {
  return (
    <>
     <header className="flex flex-col md:flex-row mx-auto w-full max-w-[75rem] gap-12 my-12 items-center">
        <div className="w-full md:w-[40rem] h-[25rem]">
          <ImageSlideshow/>
        </div>
        <div className="flex flex-col p-4 w-full">
            <div className="mb-4">
                <h1 className="font-bold text-4xl md:text-6xl font-serif uppercase tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500">
                    Bob de Fif
                </h1>
                <p className="montserrat text-lg md:text-2xl">Des bobs 100% handmade pensés, imaginés et fabriqués en France.</p>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
                <Link href="/community" className="py-2 px-4 rounded-md text-fuchsia-950 font-bold hover:bg-gradient-to-r hover:text-white hover:from-violet-500 hover:to-fuchsia-500">
                    Join the community
                </Link>
                <Link href="/shop" className="py-2 px-4 rounded-md text-white font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-fuchsia-500 hover:to-violet-500">
                    Découvrir tous les bobs
                </Link>
            </div>
        </div>
    </header>


      <main className="text-center w-4/5 mx-auto">
      <section className="p-4 ">
        <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-950 to-violet-500 font-montserrat ">How it works</h2>
        <p className="text-2xl font-montserrat text-fuchsia-950 p-8">
          Bob de Fif offers a distinctive collection of handcrafted bobs, designed and created by Fif himself. Known for his iconic style, Fif wears his bobs during his DJ sets, which inspired him to create a line that allows everyone to express their unique style through these original pieces.
        </p>
        <p className="text-2xl font-montserrat text-fuchsia-950 p-8"> 
          Each bob is more than just a fashion statement; it is a piece of wearable art crafted with care and passion. Our bobs are designed to stand out, making sure that you always make an impression wherever you go.
        </p>
      </section>

      <section className="p-4">
        <h2 className="text-4xl font-bold text-center text-fuchsia-950 font-montserrat uppercase">Why choose Bobs by Fif?</h2>
        <p className="text-2xl font-montserrat text-fuchsia-950 p-8">
          Bob de Fif is not just a brand; it is a lifestyle. By choosing our bobs, you are not only getting a high-quality, handcrafted accessory, but you are also embracing a part of Fifs passion for music and style.
        </p>
        <p className="text-2xl font-montserrat text-fuchsia-950 p-8">
          Our bobs are made for those who dare to be different and are eager to express themselves. They are perfect for music lovers, fashion enthusiasts, and anyone who appreciates craftsmanship and originality.
        </p>
      </section>
    </main>
    </>
  );
}
