/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
const Checkout = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  let CheckoutProducts = location.state;
  const [selectedProducts, setSelectedProducts] = useState(CheckoutProducts);
  const [length, setLength] = useState([]);

  const increaseThisProduct = (id) => {
    setLength((prev) => [...prev, id]);
  };
  const decreaseThisProduct = (id) => {
    const pos = CheckoutProducts.indexOf(id);
    if (pos != -1) {
      setSelectedProducts((prev) => {
        return prev.filter((value, index) => index !== pos);
      });
    }
  };

  const DeleteTheproduct = (id) => {
    setData((prev) => {
      return prev.filter((prod) => prod._id != id);
    });
  };
  useEffect(() => {
    const Cproducts = [...new Set(selectedProducts)];
    const fetchData = async () => {
      try {
        const responses = await Promise.all(
          Cproducts.map(async (id) => {
            const response = await fetch(
              `http://localhost:4400/api/product/${id}`
            );
            return response.json();
          })
        );
        setData(responses);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [selectedProducts]);

  return (
    <>
      <nav className="h-20 bg-blue-600 rounded-sm items-center flex justify-between">
        <div className="px-3 flex flex-col items-center text-center justify-center rounded-full bg-yellow-300 py-3 ">
          {/* logo */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 fill-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
          <p className=" text-xl">Accounts</p>
        </div>
        {/* search */}
        <div className="flex flex-row mx-2 px-2 justify-center items-center">
          <Link to={"/"}>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6  rounded-sm mx-2 hover:cursor-pointer text-black fill-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
              <p className="text-sm text-white">Home</p>
            </div>
          </Link>
        </div>
      </nav>
      <h1 className="text-center text-4xl font-serif font-bold my-4">
        Welcome to CART Check your Favouirate List Here !!!!!
      </h1>

      <div className="grid grid-cols-4">
        {data.map((product) => (
          <div
            key={product._id}
            className="px-4 m-4 border-2 border-black rounded-lg py-2 flex flex-col items-center text-center"
          >
            <div className="  rounded-lg">
              <img
                src={product.picture}
                alt="image not found"
                className="w-80 h-80"
              />
            </div>
            <div>
              <h2 className="font-bold text-xl py-2">{product.name}</h2>
              <p className="text-xl py-1">{product.description}</p>
              <div className="flex justify-between bg-blue-500 py-2 px-2 rounded-md">
                <div className="text-3xl font-bold">{product.price}</div>
                <div className="flex justify-between items-center">
                  <span
                    className="w-8 h-8 flex items-center justify-center bg-blue-900 text-3xl text-white rounded-xl hover:cursor-pointer mx-1"
                    onClick={() => decreaseThisProduct(product._id)}
                  >
                    -
                  </span>
                  {/* here the length of the given ids */}
                  <span className="font-bold text-lg">
                    {length.filter((id) => id === product._id).length + 1}
                  </span>
                  <span
                    className="w-8 h-8 flex items-center justify-center bg-blue-900 text-3xl text-white rounded-xl hover:cursor-pointer mx-1"
                    onClick={() => {
                      increaseThisProduct(product._id);
                    }}
                  >
                    +
                  </span>
                </div>
                <button
                  className="w-10 h-10 bg-blue-900 rounded-md text-3xl flex justify-center items-center"
                  onClick={() => {
                    DeleteTheproduct(product._id);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className=" bg-gray-200 flex flex-col items-center justify-center py-8">
        <h1 className="text-5xl font-serif py-4">ENTER YOUR DETAILS</h1>
        <input
          type="text"
          placeholder="H.No, Street-No, City"
          className="bg-gray-100 w-1/2 h-10 mx-4 outline-none my-2 px-2 rounded-md font-serif border-2 border-black"
        />
        <input
          type="text"
          placeholder="PinCode,State"
          className="bg-gray-100 w-1/2 h-10 mx-4 outline-none my-2 px-2 rounded-md font-serif border-2 border-black"
        />
        <input
          type="text"
          placeholder="Your name"
          className="bg-gray-100 w-1/2 h-10 mx-4 outline-none my-2 px-2 rounded-md font-serif border-2 border-black"
        />
        <input
          type="text"
          placeholder="Email address"
          className="bg-gray-100 w-1/2 h-10 mx-4 outline-none my-2 px-2 rounded-md font-serif border-2 border-black"
        />
        <div className="flex flex-col font-serif font-bold w-1/2">
          <div className="flex justify-around">
            <h3>SubTotal:</h3>
            <h3>$2699</h3>
          </div>
          <div className="flex justify-around border-b-2 border-black my-2">
            <h3>Delivery:</h3>
            <h3>$10</h3>
          </div>
          <div className="flex justify-around">
            <h3>Total:</h3>
            <h3>$2709</h3>
          </div>
          <div className=" text-center flex items-center justify-center my-6">
          <button className="h-10 w-56 bg-blue-700 text-white rounded-xl cursor-pointer">
            Pay $2709
          </button>

          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
