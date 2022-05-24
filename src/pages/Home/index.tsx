import React, { useState, useEffect } from 'react'
import { MdAddShoppingCart } from 'react-icons/md'
import { ProductList } from './styles'
import { api } from '../../services/api'
import { formatPrice } from '../../util/format'
import { useCart } from '../../hooks/useCart'
import axios from 'axios'
import { isExternalModule } from 'typescript'

interface Product {
  id: number
  title: string
  price: number
  image: string
}

interface ProductFormatted extends Product {
  priceFormatted: string
}

interface CartItemsAmount {
  [key: number]: number
}

const Home = (): JSX.Element => {
  const [products, setProducts] = useState<ProductFormatted[]>([])
  const { addProduct, cart } = useCart()

  const cartItemsAmount = cart.reduce((sumAmount, product) => {
    const sumAmountIndex = { ...sumAmount }
    sumAmountIndex[product.id] = product.amount

    return sumAmountIndex
  }, {} as CartItemsAmount)

  useEffect(() => {
    async function loadProducts() {
      const products = await api.get('/products')
      const formattedPriceProducts = products.data.map((product: Product) => {
        return { ...product, priceFormatted: formatPrice(product.price) }
      })
      setProducts(formattedPriceProducts)
    }

    loadProducts()
  }, [])

  function handleAddProduct(id: number) {
    addProduct(id)
  }

  return (
    <ProductList>
      {products.map((item, index) => {
        return (
          <li key={index}>
            <img src={item.image} alt={item.title} />
            <strong>{item.title}</strong>
            <span>{item.price}</span>
            <button
              type="button"
              data-testid="add-product-button"
              onClick={() => handleAddProduct(item.id)}
            >
              <div data-testid="cart-product-quantity">
                <MdAddShoppingCart size={16} color="#FFF" />
                {cartItemsAmount[item.id] || 0}
              </div>

              <span>ADICIONAR AO CARRINHO</span>
            </button>
          </li>
        )
      })}
    </ProductList>
  )
}

export default Home
