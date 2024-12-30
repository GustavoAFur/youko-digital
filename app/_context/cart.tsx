"use client"
import React from "react"

interface CartProducts {
  id: string
  nome: string
  img: string
  preco: string
  categoria: string
  quantidade: number
}
interface ICartContext {
  products: CartProducts[]
  addProduct: (product: CartProducts) => void
}

export const CartContext = React.createContext<ICartContext>({
  products: [],
  addProduct: () => {},
})

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = React.useState<CartProducts[]>([])

  const addProduct = (product: CartProducts) => {
    setProducts(prev => [...prev, {...product, quantidade: 1}]);
  }
  return (
    <CartContext.Provider
      value={{
        products, 
        addProduct
      }}
    > 
      {children}
    </CartContext.Provider> 
  )
}