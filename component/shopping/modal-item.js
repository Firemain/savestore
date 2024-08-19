import Image from 'next/image';

function Modal({ isOpen, onClose, title, image, description, price }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4">
          <h2 className="text-2xl font-bold">{title}</h2>
          <Image src={image} alt={title} width={300} height={200} className="object-cover"/>
          <p>{description}</p>
          <p>${price}</p>
        </div>
        <div className="bg-gray-100 p-4 flex justify-between">
          <button onClick={onClose} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Close
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
