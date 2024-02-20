import { createContext } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
export const ProductsContext=createContext([])

// eslint-disable-next-line react/prop-types
export function ProductsContextProvider({children}){
    const[selectedProducts,setSelectedProducts]=useLocalStorage('cart',[])
    return(
        <ProductsContext.Provider value={{selectedProducts,setSelectedProducts}}>{children}</ProductsContext.Provider>
    )
}