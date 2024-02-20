import {  useContext, useEffect, useState } from "react";
import Productinfo from "./Productinfo.jsx";
import { Link } from "react-router-dom";
import { ProductsContext } from "./ProductsContextprovider.jsx";
function App() {
  const [productsdata, setproductsdata] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    fetch("http://localhost:4400/").then(async (res) => {
      const datafetched = await res.json();
      setproductsdata(datafetched);
    });
  }, []);
  //data of checkout products
const {selectedProducts}=useContext(ProductsContext)
const CheckoutProducts=selectedProducts


  const categoriesNames = [
    ...new Set(productsdata.map((Object) => Object.category)),
  ];
  let products;
  if (search) {
    products = productsdata.filter((p) =>
      p.name.toLowerCase().includes(search)
    );
  } else {
    products = productsdata;
  }
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
            className="w-6 h-6 rounded-sm mx-2 hover:cursor-pointer text-black fill-white"
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
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search for the products..."
            className="w-80 h-11 outline-none rounded-md px-4 bg-gray-100 mx-5"
          />
          <Link to={'/checkout'} state={CheckoutProducts}>
            <div className="px-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 rounded-sm mx-2 hover:cursor-pointer text-black fill-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
              <p className="text-sm text-white">
                Cart <span className="text-yellow-300 font-bold text-md">{selectedProducts.length} </span>
              </p>
            </div>
          </Link>
          <Link href={"/"}>
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

      <div className="">
        {categoriesNames.map((category) => (
          <div className=" px-4" key={category}>
            {products.find((p) => p.category === category) && (
              <div>
                <h2 className="capitalize text-4xl font-bold">{category}</h2>
                <div className="flex ">
                  {products
                    .filter((e) => e.category === category)
                    .map((product) => (
                      <div key={product._id}>
                        <Productinfo
                          name={product.name}
                          description={product.description}
                          price={product.price}
                          picture={product.picture}
                          _id={product._id}
                        />
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
