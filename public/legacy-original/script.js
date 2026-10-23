function agregarAlCarrito(nombre, precio, cantidadInput) {
    let cantidad = parseInt(cantidadInput);

    if (isNaN(cantidad) || cantidad <= 0) {
        alert("Selecciona una cantidad válida mayor a 0.");
        return;
    }

    
    let carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];

    let productoExistente = carrito.find(p => p.nombre === nombre);

    if (productoExistente) {
        productoExistente.cantidad += cantidad;
    } else {
        carrito.push({
            nombre: nombre,
            precio: precio,
            cantidad: cantidad
        });
    }

    sessionStorage.setItem("carrito", JSON.stringify(carrito));

    alert("¡Producto agregado al carrito con éxito!");
}

function mostrarCarrito() {
    const contenedor = document.getElementById("carrito");

    if (!contenedor) return;

    let carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];
    contenedor.innerHTML = "";
    let total = 0;

    if (carrito.length === 0) {
        contenedor.innerHTML = `
            <div class="text-center py-5">
                <h5>Tu carrito está vacío</h5>
                <p class="text-body-secondary">
                    Agrega productos para comenzar tu compra.
                </p>
                <a href="index.html" class="btn btn-outline-secondary">
                    Ver productos
                </a>
            </div>
        `;

        document.getElementById("subtotal").textContent = "$0";
        document.getElementById("total").textContent = "$0";
        return;
    }

    carrito.forEach((producto, index) => {
        const subtotal = producto.precio * producto.cantidad;
        total += subtotal;

        contenedor.innerHTML += `
            <div class="d-flex justify-content-between align-items-center border-bottom py-3">
                <div>
                    <h5 class="mb-1">${producto.nombre}</h5>
                    <small class="text-body-secondary">
                        $${producto.precio.toLocaleString("es-CL")} c/u
                    </small>
                </div>

                <div class="d-flex align-items-center gap-3">
                    <div class="input-group" style="width: 130px;">
                        <button type="button" class="btn btn-outline-secondary" onclick="disminuir(${index})">−</button>
                        <input type="number" class="form-control text-center" value="${producto.cantidad}" min="1" onchange="cambiarCantidad(${index}, this.value)">
                        <button type="button" class="btn btn-outline-secondary" onclick="aumentar(${index})">+</button>
                    </div>

                    <strong style="min-width: 100px; text-align: right;">
                        $${subtotal.toLocaleString("es-CL")}
                    </strong>

                    <button type="button" class="btn btn-outline-danger btn-sm" onclick="eliminar(${index})">×</button>
                </div>
            </div>
        `;
    });

    document.getElementById("subtotal").textContent = "$" + total.toLocaleString("es-CL");
    document.getElementById("total").textContent = "$" + total.toLocaleString("es-CL");
}

function aumentar(index) {
    let carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];
    carrito[index].cantidad++;
    sessionStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

function disminuir(index) {
    let carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];
    if (carrito[index].cantidad > 1) {
        carrito[index].cantidad--;
    } else {
        carrito.splice(index, 1);
    }
    sessionStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

function cambiarCantidad(index, cantidad) {
    let carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];
    let cant = parseInt(cantidad);

    if (isNaN(cant) || cant <= 0) {
        carrito.splice(index, 1);
    } else {
        carrito[index].cantidad = cant;
    }

    sessionStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

function eliminar(index) {
    let carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];
    carrito.splice(index, 1);
    sessionStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

function vaciarCarrito() {
    sessionStorage.removeItem("carrito");
    mostrarCarrito();
}

function comprar() {
    let carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];
    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }
    alert("¡Compra realizada con éxito!");
    sessionStorage.removeItem("carrito");
    mostrarCarrito();
}

document.addEventListener("DOMContentLoaded", mostrarCarrito);