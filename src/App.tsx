import { useState } from 'react'
import { CartDrawer } from './components/CartDrawer'
import { ConfirmOrderModal } from './components/ConfirmOrderModal'
import { Header } from './components/Header'
import { ProductCard } from './components/ProductCard'
import { products } from './data/products'

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#fcf8f6]">
      <Header
        cartCount={0}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenConfirmation={() => setIsConfirmModalOpen(true)}
      />

      <main className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-5 pb-12 pt-8 sm:px-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-9 lg:px-10 lg:pt-12">
        <section aria-labelledby="desserts-title">
          <div className="mb-7 flex flex-col gap-2">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#c73b0f]">
              Fresh bakery
            </p>
            <h1
              id="desserts-title"
              className="text-4xl font-black leading-none text-[#260f08] sm:text-5xl"
            >
              Desserts
            </h1>
          </div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
        />
      </main>

      <ConfirmOrderModal
        isOpen={isConfirmModalOpen}
        items={products.slice(0, 2)}
        onClose={() => setIsConfirmModalOpen(false)}
      />
    </div>
  )
}

export default App
