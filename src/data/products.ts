import baklavaDesktop from '../assets/images/image-baklava-desktop.jpg'
import baklavaMobile from '../assets/images/image-baklava-mobile.jpg'
import baklavaTablet from '../assets/images/image-baklava-tablet.jpg'
import baklavaThumbnail from '../assets/images/image-baklava-thumbnail.jpg'
import brownieDesktop from '../assets/images/image-brownie-desktop.jpg'
import brownieMobile from '../assets/images/image-brownie-mobile.jpg'
import brownieTablet from '../assets/images/image-brownie-tablet.jpg'
import brownieThumbnail from '../assets/images/image-brownie-thumbnail.jpg'
import cakeDesktop from '../assets/images/image-cake-desktop.jpg'
import cakeMobile from '../assets/images/image-cake-mobile.jpg'
import cakeTablet from '../assets/images/image-cake-tablet.jpg'
import cakeThumbnail from '../assets/images/image-cake-thumbnail.jpg'
import cremeBruleeDesktop from '../assets/images/image-creme-brulee-desktop.jpg'
import cremeBruleeMobile from '../assets/images/image-creme-brulee-mobile.jpg'
import cremeBruleeTablet from '../assets/images/image-creme-brulee-tablet.jpg'
import cremeBruleeThumbnail from '../assets/images/image-creme-brulee-thumbnail.jpg'
import macaronDesktop from '../assets/images/image-macaron-desktop.jpg'
import macaronMobile from '../assets/images/image-macaron-mobile.jpg'
import macaronTablet from '../assets/images/image-macaron-tablet.jpg'
import macaronThumbnail from '../assets/images/image-macaron-thumbnail.jpg'
import meringueDesktop from '../assets/images/image-meringue-desktop.jpg'
import meringueMobile from '../assets/images/image-meringue-mobile.jpg'
import meringueTablet from '../assets/images/image-meringue-tablet.jpg'
import meringueThumbnail from '../assets/images/image-meringue-thumbnail.jpg'
import pannaCottaDesktop from '../assets/images/image-panna-cotta-desktop.jpg'
import pannaCottaMobile from '../assets/images/image-panna-cotta-mobile.jpg'
import pannaCottaTablet from '../assets/images/image-panna-cotta-tablet.jpg'
import pannaCottaThumbnail from '../assets/images/image-panna-cotta-thumbnail.jpg'
import tiramisuDesktop from '../assets/images/image-tiramisu-desktop.jpg'
import tiramisuMobile from '../assets/images/image-tiramisu-mobile.jpg'
import tiramisuTablet from '../assets/images/image-tiramisu-tablet.jpg'
import tiramisuThumbnail from '../assets/images/image-tiramisu-thumbnail.jpg'
import waffleDesktop from '../assets/images/image-waffle-desktop.jpg'
import waffleMobile from '../assets/images/image-waffle-mobile.jpg'
import waffleTablet from '../assets/images/image-waffle-tablet.jpg'
import waffleThumbnail from '../assets/images/image-waffle-thumbnail.jpg'
import type { Product } from '../interfaces/product'

export const products: Product[] = [
  {
    id: 1,
    name: 'Waffle with Berries',
    category: 'Waffle',
    price: 6.5,
    image: {
      thumbnail: waffleThumbnail,
      mobile: waffleMobile,
      tablet: waffleTablet,
      desktop: waffleDesktop,
    },
  },
  {
    id: 2,
    name: 'Vanilla Bean Cr\u00e8me Br\u00fbl\u00e9e',
    category: 'Cr\u00e8me Br\u00fbl\u00e9e',
    price: 7,
    image: {
      thumbnail: cremeBruleeThumbnail,
      mobile: cremeBruleeMobile,
      tablet: cremeBruleeTablet,
      desktop: cremeBruleeDesktop,
    },
  },
  {
    id: 3,
    name: 'Macaron Mix of Five',
    category: 'Macaron',
    price: 8,
    image: {
      thumbnail: macaronThumbnail,
      mobile: macaronMobile,
      tablet: macaronTablet,
      desktop: macaronDesktop,
    },
  },
  {
    id: 4,
    name: 'Classic Tiramisu',
    category: 'Tiramisu',
    price: 5.5,
    image: {
      thumbnail: tiramisuThumbnail,
      mobile: tiramisuMobile,
      tablet: tiramisuTablet,
      desktop: tiramisuDesktop,
    },
  },
  {
    id: 5,
    name: 'Pistachio Baklava',
    category: 'Baklava',
    price: 4,
    image: {
      thumbnail: baklavaThumbnail,
      mobile: baklavaMobile,
      tablet: baklavaTablet,
      desktop: baklavaDesktop,
    },
  },
  {
    id: 6,
    name: 'Lemon Meringue Pie',
    category: 'Pie',
    price: 5,
    image: {
      thumbnail: meringueThumbnail,
      mobile: meringueMobile,
      tablet: meringueTablet,
      desktop: meringueDesktop,
    },
  },
  {
    id: 7,
    name: 'Red Velvet Cake',
    category: 'Cake',
    price: 4.5,
    image: {
      thumbnail: cakeThumbnail,
      mobile: cakeMobile,
      tablet: cakeTablet,
      desktop: cakeDesktop,
    },
  },
  {
    id: 8,
    name: 'Salted Caramel Brownie',
    category: 'Brownie',
    price: 4.5,
    image: {
      thumbnail: brownieThumbnail,
      mobile: brownieMobile,
      tablet: brownieTablet,
      desktop: brownieDesktop,
    },
  },
  {
    id: 9,
    name: 'Vanilla Panna Cotta',
    category: 'Panna Cotta',
    price: 6.5,
    image: {
      thumbnail: pannaCottaThumbnail,
      mobile: pannaCottaMobile,
      tablet: pannaCottaTablet,
      desktop: pannaCottaDesktop,
    },
  },
]
