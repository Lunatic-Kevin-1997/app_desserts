# Desserts

SPA de una tienda de postres desarrollada con React, Vite, TypeScript y Tailwind CSS. El proyecto conserva la interfaz del reto Product List with Cart y agrega consumo de API, navegacion, carrito persistente y administracion completa de productos.

## Tecnologias

- React 19, Vite y TypeScript.
- Tailwind CSS.
- React Router.
- Axios y TanStack Query.
- React Hook Form y Zod.
- Zustand con persistencia en `localStorage`.
- json-server.
- Sonner para notificaciones.

## Instalacion

Requisitos previos:

- Node.js 20 o superior.
- npm.

Instala las dependencias:

```bash
npm install
```

Opcionalmente, crea un archivo `.env` para cambiar la URL de la API:

```env
VITE_API_URL=http://localhost:3000
```

Si no se define esta variable, la aplicacion utiliza `http://localhost:3000`.

## Ejecucion

Inicia la API local en una terminal:

```bash
npm run api
```

Inicia el frontend en otra terminal:

```bash
npm run dev
```

- Frontend: `http://localhost:5173`
- API: `http://localhost:3000`

## Scripts disponibles

- `npm run dev`: inicia Vite en modo desarrollo.
- `npm run api`: inicia json-server en el puerto 3000.
- `npm run build`: valida TypeScript y genera la compilacion de produccion.
- `npm run lint`: ejecuta Oxlint sobre el proyecto.
- `npm run preview`: sirve localmente la compilacion de produccion.

## Funcionalidades

### Catalogo

- Productos obtenidos desde `GET /products` con Axios y TanStack Query.
- Skeletons y delay artificial de 1.2 segundos.
- Busqueda por nombre y filtro por categoria ejecutados contra la API.
- Paginacion con `_page` y `_per_page=8`.
- Estados de carga, error, reintento y resultados vacios.
- Vista de detalle y mensajes 404.

### Carrito

- Agregar, quitar, aumentar y disminuir productos.
- Cantidades y total calculados desde un store de Zustand.
- Persistencia automatica en `localStorage` con la clave `desserts-cart`.
- Drawer responsive con resumen de compra.
- Modal con la orden confirmada.
- Vaciado del carrito al confirmar la orden.

### Administracion

- Listado paginado de productos.
- Creacion con `POST /products`.
- Edicion con `PUT /products/:id`.
- Eliminacion con `DELETE /products/:id` y modal de confirmacion.
- Formulario reutilizable para crear y editar.
- Validacion con React Hook Form y Zod.
- Invalidacion de cache despues de cada mutacion.
- Toasts de exito y error.

## Rutas

- `/`: catalogo y carrito.
- `/producto/:id`: detalle del producto.
- `/admin/productos`: administracion de productos.
- `/admin/productos/nuevo`: creacion de producto.
- `/admin/productos/:id/editar`: edicion de producto.
- Cualquier ruta inexistente muestra una pagina 404.

## API local

Los datos viven en `db.json` y json-server persiste automaticamente los cambios de las operaciones CRUD.

Recursos:

- `GET /products?_page=1&_per_page=8`
- `GET /products?name:contains=waffle`
- `GET /products?categoryId=macaron`
- `GET /products/:id`
- `POST /products`
- `PUT /products/:id`
- `DELETE /products/:id`
- `GET /categories`

Cada producto contiene `categoryId`, relacionado con el `id` de un registro de `/categories`. La interfaz resuelve y muestra el nombre de esa categoria mediante un badge.

## Arquitectura

```text
src/
|-- components/   Componentes visuales reutilizables
|-- hooks/        Queries, mutaciones y hooks de interfaz
|-- interfaces/   Contratos TypeScript
|-- pages/        Pantallas asociadas a las rutas
|-- routes/       Configuracion de React Router
|-- schemas/      Esquemas de validacion Zod
|-- services/     Cliente Axios y acceso a recursos HTTP
|-- stores/       Estado global persistente de Zustand
`-- assets/       Fuentes, iconos e imagenes originales
```

## Decisiones tecnicas

- La query key base de productos es `['products']`; filtros y pagina se agregan a la clave para mantener caches independientes.
- La busqueda, el filtro y la paginacion se envian como query params. No se filtran los resultados en memoria.
- `keepPreviousData` mantiene estable el listado mientras se cambia de pagina.
- Las categorias son un recurso independiente y los productos guardan solo `categoryId`.
- El formulario recibe `defaultValues`; la pagina de edicion entrega los datos obtenidos de la API y la pagina de creacion entrega valores vacios.
- El modal de confirmacion recibe una copia de la orden y el store se vacia al confirmar, por lo que la compra desaparece tambien de `localStorage` sin perder el resumen mostrado.
- La URL de Axios se configura con `VITE_API_URL` para facilitar distintos entornos.

## Deploy

La compilacion del frontend se genera con `npm run build` y publica el directorio `dist`. Para que un deploy sea funcional, `VITE_API_URL` debe apuntar a una instancia accesible de la API; el desarrollo y la evaluacion local usan exclusivamente json-server en `http://localhost:3000`.
