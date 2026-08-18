# Desserts Frontend

SPA de tienda de postres creada con React, Vite, TypeScript y Tailwind CSS.

## Rama nivel-1

Esta rama implementa solo la interfaz visual del reto `Product List with Cart`.

- Productos desde un array local.
- Componentes: `Header`, `ProductCard`, `QuantityStepper`, `CartDrawer` y `ConfirmOrderModal`.
- Layout responsive: una columna en mobile y tres columnas en desktop.
- Drawer de carrito vacio.
- Modal visual de confirmacion de orden.
- Sin consumo de API, sin Axios, sin TanStack Query y sin React Router en el codigo de `src`.

## Rama nivel-2

Esta rama reemplaza los datos estaticos por una API local con `json-server`.

- `GET /products` consumido con Axios.
- TanStack Query con query key base `['products']`.
- Skeletons con delay artificial aproximado de 1.2 segundos.
- Busqueda por nombre contra la API usando `name:contains`.
- Filtro por categoria contra la API.
- Estados de loading, error y resultados vacios.
- Navegacion con React Router:
  - `/`
  - `/producto/:id`
- Vista de detalle de producto.
- Mensaje 404 para productos inexistentes.

## Scripts

```bash
npm install
npm run api
npm run dev
npm run build
npm run lint
```

El frontend corre por defecto en:

```txt
http://localhost:5173
```

La API local corre en:

```txt
http://localhost:3000
```
