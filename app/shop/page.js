import classes from "./page.module.css";
import ShoppingGrid from "@/component/shopping/shopping-grid";
import { Suspense } from "react";
import { getBobs, getSizesForBob } from "@/lib/shopping";
import Loading from "./loading";

async function Bobs() {
    const bobs = await getBobs();
    const sizes = await getSizesForBob(bobs[0].id);


    return <ShoppingGrid items={bobs} sizes={sizes}></ShoppingGrid>
}

export default function ShoppingPage() {


    return (
        <>
            <header className="mx-auto my-12 w-9/10 max-w-[75rem] text-[#ddd6cb] font-playfair-display gap-12 text-center">
                <h1 className="text-6xl text-fuchsia-950">Express <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-950 to-fuchsia-500"> yourslelf ! </span></h1>
                <p className="m-0 pt-6 text-4xl text-fuchsia-950">Choose you favorite bobs and share it to the world !</p>
                
            </header>
            <main>
            <Suspense fallback={<Loading></Loading>}>
                <Bobs/>
            </Suspense>
            
        </main>
        </>
    
    )
}