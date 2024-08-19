export default function AddCart({ price, selectedSize }) {

    const handleAddToCart = () => {
        console.log(`Added ${bob.title} size ${selectedSize} to cart`);
    };

    return(
        <div className="px-6 py-4 flex justify-center items-center bg-white">
                <button className="text-xl font-semibold text-white bg-fuchsia-950 hover:bg-fuchsia-800 px-6 py-2 rounded-md" onClick={handleAddToCart}
                        disabled={!selectedSize}>
                    Add to Cart for {price} €
                </button>
        </div>
    )
}
