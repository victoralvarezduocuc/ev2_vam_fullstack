package cl.duoc.gourmet.service;

import cl.duoc.gourmet.model.LineaVenta;
import cl.duoc.gourmet.model.Producto;
import cl.duoc.gourmet.model.Venta;
import cl.duoc.gourmet.model.VentaRequest;
import cl.duoc.gourmet.repository.RepositorioProductos;
import cl.duoc.gourmet.repository.RepositorioVentas;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class VentasService {
    private static final int CANTIDAD_MAXIMA = 999;

    private final RepositorioVentas ventas;
    private final RepositorioProductos productos;

    public VentasService(RepositorioVentas ventas, RepositorioProductos productos) {
        this.ventas = ventas;
        this.productos = productos;
    }

    /**
     * Valida el carrito contra el catálogo guardado en MongoDB y registra la venta.
     * El nombre, la categoría y los totales los calcula el servidor; nunca se confía en los del cliente.
     */
    public Venta registrar(VentaRequest solicitud) {
        if (solicitud == null || solicitud.items() == null || solicitud.items().isEmpty()) {
            throw rechazo("La venta debe incluir al menos un producto.");
        }

        List<LineaVenta> lineas = new ArrayList<>();
        long total = 0;

        for (VentaRequest.LineaRequest linea : solicitud.items()) {
            if (linea == null || linea.productId() == null || linea.productId().isBlank()) {
                throw rechazo("Cada línea debe indicar el id del producto.");
            }
            Integer cantidad = linea.quantity();
            if (cantidad == null || cantidad < 1 || cantidad > CANTIDAD_MAXIMA) {
                throw rechazo("La cantidad debe ser un número entero entre 1 y " + CANTIDAD_MAXIMA + ".");
            }

            Producto producto = productos.findById(linea.productId())
                    .orElseThrow(() -> rechazo("El producto no existe: " + linea.productId()));

            // El cliente puede haber visto un precio rebajado (por ejemplo, $0 puesto por el administrador),
            // pero nunca uno mayor al del catálogo ni uno negativo.
            int precioCatalogo = producto.getPrice();
            int precioUnitario = linea.unitPrice() == null ? precioCatalogo : linea.unitPrice();
            if (precioUnitario < 0 || precioUnitario > precioCatalogo) {
                throw rechazo("Precio no válido para el producto " + producto.getName() + ".");
            }

            long subtotal = (long) precioUnitario * cantidad;
            lineas.add(new LineaVenta(producto.getId(), producto.getName(), producto.getCategory(),
                    cantidad, precioUnitario, precioCatalogo, subtotal));
            total += subtotal;
        }

        Venta venta = new Venta();
        venta.setFecha(Instant.now());
        venta.setItems(lineas);
        venta.setTotal(total);
        return ventas.save(venta);
    }

    public List<Venta> listar() {
        return ventas.findAll(Sort.by(Sort.Direction.DESC, "fecha"));
    }

    private static ResponseStatusException rechazo(String mensaje) {
        return new ResponseStatusException(HttpStatus.BAD_REQUEST, mensaje);
    }
}
