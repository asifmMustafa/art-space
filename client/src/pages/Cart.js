import React, { useEffect } from "react";
import Header from "../components/Header";
import ArtworkCard from "../components/ArtworkCard";
import { useUserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();

  const { id, cart } = useUserContext();

  useEffect(() => {
    if (!id) {
      navigate("/");
    }
  }, []);

  const totalItems = cart.length;
  const totalPrice = cart.reduce((acc, artwork) => {
    const priceNumber = Number(artwork.price.replace(/[\$,]/g, ""));
    return acc + priceNumber;
  }, 0);

  const handleCheckout = () => {
    // handle checkout logic here
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <div className="py-12 px-4 flex-grow">
        <div className="flex flex-row flex-wrap">
          {cart.map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} isCart={true} />
          ))}
        </div>
      </div>
      <div className="mt-6 px-4 pb-4 flex justify-between items-center border-t-2 border-gray-200 pt-6">
        <div>
          <p className="text-lg font-semibold">Total Items: {totalItems}</p>
          <p className="text-lg font-semibold">Total Price: ${totalPrice}</p>
        </div>
        <button
          onClick={handleCheckout}
          className="px-6 py-2 border border-gray-300 rounded-md text-lg font-semibold bg-blue-500 text-white hover:bg-blue-600"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
