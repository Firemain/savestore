import AddCart from "@/component/shopping/addCart";
import BobDetails from "@/component/shopping/bob-details";
import { getBob, getSizesAndStockBySlug } from "@/lib/shopping";
import Image from "next/image";

export default function ShoppingDetailPage({params}) {

    const bob = getBob(params.slug);
    const bobSizes =  getSizesAndStockBySlug(params.slug);

    if (!bob) {
        return <p>No such item found.</p>;
    }

    return (
        <>
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">

        <BobDetails bob={bob} bobSizes={bobSizes} />
            
    </div>
</>

    )
}