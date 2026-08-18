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
    <div className="min-h-screen bg-[#fcf8f6] text-[#260f08]">
      <main className="mx-auto grid w-full max-w-[1216px] grid-cols-1 gap-8 px-6 pb-12 pt-10 sm:px-10 lg:grid-cols-[minmax(0,800px)_384px] lg:items-start lg:gap-8 lg:px-0 lg:pb-20 lg:pt-[88px]">
        <section aria-labelledby="desserts-title">
          <Header cartCount={0} onOpenCart={() => setIsCartOpen(true)} />

          <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddPreview={() => setIsCartOpen(true)}
              />
            ))}
          </div>
        </section>

        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          onOpenConfirmation={() => setIsConfirmModalOpen(true)}
        />
      </main>

      <ConfirmOrderModal
        isOpen={isConfirmModalOpen}
        items={products.slice(0, 1)}
        onClose={() => setIsConfirmModalOpen(false)}
      />
    </div>
  )
}

export default App
