# Gourmet & Co. — migración a React

Proyecto académico de migración de la tienda Gourmet & Co. a React + Vite, conservando las páginas originales como referencia en `public/legacy-original/` y reutilizando su CSS, logotipo, textos, imágenes y categorías.

## Requisitos

- Node.js 20 o superior recomendado.
- npm.
- Google Chrome/Chromium instalado para ejecutar Karma con `ChromeHeadless`.

## Instalación y ejecución

```bash
npm install
npm start
```

Vite indicará la dirección local. Para generar una compilación:

```bash
npm run build
```

## Rutas

- `/` — inicio.
- `/Cafes-Te.html` — Cafés y Tés.
- `/Chocolates-Dulces.html` — Chocolates y Dulces.
- `/Quesos-Charcuteria.html` — Quesos y Charcuteria.
- `/Vinos-Licores.html` — Vinos y Licores.
- `/Carrito.html` — carrito.
- `/admin` — acceso al administrador.

La navegación de la aplicación React mantiene los cambios temporales de precios entre vistas mientras no se recargue la página. Las páginas originales se conservan sin modificar en `public/legacy-original/` para comparación y consulta; se ejecuta la nueva versión React desde la raíz.

## Panel de administración

Para uso académico local, las credenciales predeterminadas son:

- Usuario: `admin`
- Contraseña: `cambiar-esta-clave`

Puedes configurar otras credenciales mediante variables de entorno `VITE_ADMIN_USER` y `VITE_ADMIN_PASSWORD` antes de iniciar Vite. No subas contraseñas reales a GitHub.

**Advertencia de seguridad:** no existe backend en esta entrega. La validación se ejecuta en el frontend y las variables `VITE_*` se incorporan al bundle público. Por tanto, este login es solamente una demostración académica y no protege operaciones en producción. Para producción, valida credenciales y autoriza cada operación en un servidor.

El token se genera aleatoriamente y se conserva en el estado React del componente de administración; no se escribe en `localStorage`, `sessionStorage`, cookies ni URL. Cerrar sesión desmonta la sesión. Al recargar se reinician tanto la sesión como los precios a sus valores iniciales.

## Precios y carrito

El administrador permite buscar productos, filtrar por estado, poner temporalmente un precio a `$0` y restaurar el precio original. El valor original se mantiene en `originalPrice`, independiente del precio actual. Esto permite restaurar correctamente productos cuyo precio original ya era `$0` (Queso Marzolino).

Los cambios de precios solo viven en el estado React; no se guardan en almacenamiento persistente. El carrito conserva su comportamiento original de almacenamiento en `sessionStorage`, que es independiente de la sesión de administración y de los cambios de precios. Los precios que se muestran en el carrito se resuelven contra el catálogo React actual.

## Jasmine, Karma y cobertura

```bash
npm test
npm run test:coverage
```

Karma ejecuta las pruebas con Chrome en modo headless. El informe HTML de cobertura se genera en `coverage/` y también se imprime un resumen en consola. Si tu equipo no tiene Chrome instalado, instala Chrome/Chromium o ajusta `browsers` y el launcher en `karma.conf.cjs` al navegador disponible.

Las pruebas de `tests/priceLogic.spec.js` verifican el catálogo, props/renderizado de la tarjeta, formato de precios, búsqueda, filtro de productos a cero, actualización de precios, restauración exacta, credenciales, token volátil y comportamiento del carrito.

## Estructura principal

- `src/App.jsx`: navegación y vistas de tienda/carrito.
- `src/components/Header.jsx`: navegación compartida.
- `src/components/ProductCard.jsx`: tarjeta y detalle de producto.
- `src/data/products.js`: catálogo inicial derivado de los productos del proyecto original.
- `src/admin/Admin.jsx`: login y panel de administración.
- `src/admin/priceLogic.js`: lógica testeable de precios, sesión y carrito.
- `src/styles/admin.css`: estilos añadidos para panel y modal; `style.css` se conserva.
- `public/legacy-original/`: HTML, CSS y JavaScript originales archivados.
- `tests/priceLogic.spec.js`: pruebas unitarias Jasmine.
- `karma.conf.cjs`: configuración Karma y cobertura.

## Notas de fidelidad y limitaciones

- Se conservan las cinco páginas originales de tienda/carrito, sus seis productos con precios, descripciones e imágenes principales, el logotipo y las reglas de `style.css`.
- La versión React reutiliza Bootstrap y las clases originales. La composición de la tienda se implementó con componentes React; por ello, aunque se conservan recursos, textos y categorías, conviene realizar una comparación visual manual en escritorio y móvil antes de afirmar equivalencia pixel a pixel.
- En el HTML original de `Chocolates-Dulces.html`, el encabezado del modal de Chocolate Dubai decía accidentalmente “Té de Matcha”; en React se usa “Chocolate Dubai”, que coincide con el producto, la imagen y la función de agregar al carrito. El archivo original permanece archivado sin cambios.
- No se inventaron páginas individuales de productos, porque no aparecen como páginas independientes en el ZIP recibido.
- La prueba real de build/tests debe ejecutarse localmente después de instalar dependencias. No se debe afirmar que pasan hasta ver el resultado de `npm run build` y `npm test`.

## Guía breve para la presentación individual

1. Explica que la aplicación se separó en componentes: `Header`, `ProductCard`, `Home`, `CategoryPage`, `Cart` y `Admin`.
2. Muestra `src/data/products.js`: el catálogo es la fuente de datos compartida y cada producto tiene `id`, `name`, `category`, `price` y `originalPrice`.
3. En la tienda, abre una categoría, selecciona una imagen y agrega una cantidad al carrito.
4. Abre `/admin`. Con las credenciales académicas de arriba, inicia sesión y busca un producto.
5. Pulsa “Poner en $0” y confirma. Vuelve a la tienda sin recargar para mostrar el cambio en el precio; en el carrito el precio se obtiene del catálogo actual.
6. Pulsa “Restaurar” para recuperar exactamente `originalPrice`.
7. Recarga la página y muestra que la sesión y los cambios de precio se han perdido. El carrito puede seguir en `sessionStorage`, como en el sitio original.
8. Ejecuta `npm test`, comenta qué comprueba cada grupo de pruebas y enseña el informe `coverage/index.html` después de `npm run test:coverage`.
9. Aclara que el login sin backend es una demostración, no una medida de seguridad de producción.


## Organización de páginas React

La lógica de navegación y el estado compartido se coordinan desde `src/App.jsx`, pero el contenido de cada página está separado en `src/pages/`: `Home.jsx`, `Cart.jsx`, `CafesTe.jsx`, `ChocolatesDulces.jsx`, `QuesosCharcuteria.jsx` y `VinosLicores.jsx`. Las cuatro categorías reutilizan `CategoryPage.jsx` y su configuración está en `categoryRoutes.js`. Así cada página tiene su propio archivo y recibe desde `App.jsx` las propiedades y acciones compartidas.
