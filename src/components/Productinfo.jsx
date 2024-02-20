import { useContext } from "react";
import { ProductsContext } from "./ProductsContextprovider";

// eslint-disable-next-line react/prop-types
const Productinfo = ({_id,name,description,price,picture}) => {

  const {setSelectedProducts}=useContext(ProductsContext)
  const addToCart=()=>{
    setSelectedProducts(prev=>[...prev,_id])
  }
  return (<>
    <div className="px-4 m-4 border-2 border-black rounded-lg py-2 flex flex-col items-center text-center">
      <div className="  rounded-lg">
        <img src={picture} className="w-80 h-80"/>
      </div>
      <div>
        <h1 className="font-bold text-xl py-2">{name}</h1>
        <p className="text-xl py-1">
            {description}
        </p>
        <div className="flex justify-between bg-blue-500 py-2 px-2 rounded-md">
          <div className="text-3xl font-bold">{price}</div>
          <button onClick={addToCart} className="w-10 h-10 bg-blue-400 border-2 border-white rounded-md text-3xl flex justify-center">
            +
          </button>
        </div>
      </div>
    </div>
  </>

  );
};

export default Productinfo;
