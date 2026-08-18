import baklavaImage from '../assets/products/baklava.svg'
import brownieImage from '../assets/products/brownie.svg'
import cakeImage from '../assets/products/red-velvet.svg'
import cremeBruleeImage from '../assets/products/creme-brulee.svg'
import macaronImage from '../assets/products/macaron.svg'
import meringueImage from '../assets/products/meringue-pie.svg'
import pannaCottaImage from '../assets/products/panna-cotta.svg'
import tiramisuImage from '../assets/products/tiramisu.svg'
import waffleImage from '../assets/products/waffle.svg'
import type { Product } from '../interfaces/product'

export const products: Product[] = [
  {
    id: 1,
    name: 'Waffle with Berries',
    category: 'Waffle',
    price: 6.5,
    image: waffleImage,
  },
  {
    id: 2,
    name: 'Vanilla Bean Cr\u00e8me Br\u00fbl\u00e9e',
    category: 'Cr\u00e8me Br\u00fbl\u00e9e',
    price: 7,
    image: cremeBruleeImage,
  },
  {
    id: 3,
    name: 'Macaron Mix of Five',
    category: 'Macaron',
    price: 8,
    image: macaronImage,
  },
  {
    id: 4,
    name: 'Classic Tiramisu',
    category: 'Tiramisu',
    price: 5.5,
    image: tiramisuImage,
  },
  {
    id: 5,
    name: 'Pistachio Baklava',
    category: 'Baklava',
    price: 4,
    image: baklavaImage,
  },
  {
    id: 6,
    name: 'Lemon Meringue Pie',
    category: 'Pie',
    price: 5,
    image: meringueImage,
  },
  {
    id: 7,
    name: 'Red Velvet Cake',
    category: 'Cake',
    price: 4.5,
    image: cakeImage,
  },
  {
    id: 8,
    name: 'Salted Caramel Brownie',
    category: 'Brownie',
    price: 4.5,
    image: brownieImage,
  },
  {
    id: 9,
    name: 'Vanilla Panna Cotta',
    category: 'Panna Cotta',
    price: 6.5,
    image: pannaCottaImage,
  },
]
