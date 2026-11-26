# Guía: cómo ejecutar Gourmet & Co. con backend y base de datos

Con esta guía tu sitio guarda cada compra en MongoDB. Son tres piezas que deben estar encendidas a la vez:

```
Navegador (React, puerto 5173)  ──/api──▶  Backend (Spring Boot, puerto 8081)  ──▶  MongoDB (Docker, puerto 27017)
```

## 1. Qué se agregó o cambió

| Archivo | Qué hace |
|---|---|
| `docker-compose.yml` y `docker/mongo-init.js` | Levantan MongoDB en tu computador y crean la base `gourmet` con su usuario. |
| `backend/` | API en Java (Spring Boot). Entrega el catálogo y registra las ventas. |
| `vite.config.js` | Reenvía las llamadas `/api/...` del front al backend. |
| `src/App.jsx` | Al abrir el sitio, pide el catálogo al backend (si está apagado usa la lista local). |
| `src/pages/Cart.jsx` | El botón **Comprar** envía la venta al backend. |

La API tiene estas rutas:

- `GET /api/productos`: lista el catálogo.
- `POST /api/ventas`: registra una venta.
- `GET /api/ventas`: lista las ventas guardadas (sirve para comprobar).

## 2. Requisitos (instálalos una sola vez)

| Programa | Versión | Cómo comprobar |
|---|---|---|
| Node.js | 18 o superior | `node -v` |
| Java JDK | 17 o superior (JDK, no solo JRE) | `java -version` |
| Docker Desktop | cualquiera reciente, **abierto y en ejecución** | `docker --version` |

No necesitas instalar Maven: el proyecto trae `mvnw`, que lo descarga solo la primera vez (necesita internet).

## 3. Copiar los archivos a tu proyecto

1. Descomprime `gourmet-backend.zip` **en la carpeta raíz de tu proyecto** (donde está `package.json`).
2. Si tu sistema pregunta si reemplazar archivos, acepta. Se reemplazan solo `vite.config.js`, `src/App.jsx` y `src/pages/Cart.jsx`.
3. Deberías ver las carpetas `backend/` y `docker/` junto a `src/`.

## 4. Encender MongoDB

En la carpeta raíz del proyecto:

```bash
docker compose up -d
```

La primera vez descarga la imagen de MongoDB y puede tardar unos minutos. Para comprobar que quedó encendido:

```bash
docker ps
```

Debe aparecer un contenedor llamado `gourmet-mongo`.

## 5. Encender el backend

Abre una **segunda terminal**:

```bash
cd backend
./mvnw spring-boot:run
```

En Windows (PowerShell o CMD) usa `mvnw.cmd spring-boot:run`.

La primera vez descarga las dependencias y tarda varios minutos. Espera a ver una línea como `Started GourmetApplication`. Si el catálogo estaba vacío, el backend carga solo los 6 productos.

Comprueba que funciona abriendo estas direcciones en el navegador:

- http://localhost:8081/api/productos: debe mostrar los 6 productos en JSON.
- http://localhost:8081/swagger-ui.html: documentación interactiva de la API.

## 6. Encender el sitio web

Abre una **tercera terminal** en la raíz del proyecto:

```bash
npm install
npm run dev
```

Abre http://localhost:5173. Usa `npm run dev` y no `npm start`, porque `npm start` expone el servidor a toda tu red local.

## 7. Probar una venta

1. Agrega uno o más productos al carrito.
2. Ve a **Carrito** y pulsa **Comprar**.
3. Debe aparecer un mensaje con el **N° de venta**. Ese número es el id del documento en MongoDB.

## 8. Ver la venta guardada en la base de datos

Tienes tres formas:

**A. Desde el navegador:** http://localhost:8081/api/ventas

**B. Desde la terminal:**

```bash
docker exec -it gourmet-mongo mongosh -u root -p root123 --authenticationDatabase admin gourmet --eval "db.ventas.find().pretty()"
```

**C. Con MongoDB Compass** (programa gráfico gratuito). Conéctate con:

```
mongodb://gourmet_user:gourmet123@localhost:27017/gourmet?authSource=gourmet
```

Una venta guardada se ve así:

```json
{
  "id": "6743a1f2c9d3e4b5a6f70812",
  "fecha": "2026-11-24T22:30:00Z",
  "items": [
    { "productId": "CT1", "name": "Té de Matcha", "category": "Cafés & Té",
      "quantity": 2, "unitPrice": 14990, "catalogPrice": 14990, "subtotal": 29980 }
  ],
  "total": 29980
}
```

El nombre, la categoría y los totales los calcula el servidor con los datos de MongoDB. El navegador solo envía ids, cantidades y el precio que mostró.

## 9. Apagar todo

- En las terminales del backend y del sitio: `Ctrl + C`.
- MongoDB: `docker compose stop`. Los datos se conservan. Para encenderlo otra vez: `docker compose up -d`.

**Orden de encendido cada día:** Docker Desktop, luego `docker compose up -d`, luego el backend y por último el sitio.

## 10. Problemas frecuentes

| Síntoma | Causa y solución |
|---|---|
| Al comprar dice "No se pudo conectar con el servidor" | El backend está apagado. Revisa la terminal del paso 5. |
| `Authentication failed` en el backend | MongoDB se creó antes con otras credenciales. Borra los datos y vuelve a crear: `docker compose down -v` y luego `docker compose up -d`. **Esto borra las ventas guardadas.** |
| `Port 8081 was already in use` | Otro programa usa el puerto. Ciérralo o cambia `server.port` en `backend/src/main/resources/application.properties` (y el puerto en `vite.config.js`). |
| `Cannot connect to the Docker daemon` | Docker Desktop no está abierto. Ábrelo y espera a que diga que está en ejecución. |
| El backend falla con `release version 17 not supported` | Tienes un Java más antiguo. Instala JDK 17 o superior. |
| Al comprar dice "Precio no válido" | En `/admin` subiste un precio por encima del que hay en la base de datos. El servidor rechaza precios mayores al catálogo, a propósito. Los precios cambiados en `/admin` solo viven en el navegador, no se guardan en MongoDB. |

## 11. Cosas que debes saber

- El producto **Queso Marzolino** tiene precio 0 en tu catálogo, así que se registra como una venta de $0.
- `GET /api/ventas` no tiene autenticación. Sirve para el curso; en un sitio real debería estar protegida.
- Las claves de `docker-compose.yml` y de `application.properties` son de desarrollo. No las uses en un servidor real.
- Para usar **MongoDB Atlas** en lugar de Docker, define la variable de entorno `MONGODB_URI` con la URL de Atlas antes de iniciar el backend. No hace falta editar ningún archivo.

## 12. Subir los cambios a tu GitHub

```bash
git add .
git commit -m "Agrega backend Spring Boot con MongoDB y registro de ventas"
git push
```
