package cl.duoc.gourmet.model;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

// Cuerpo JSON que envía el carrito al pulsar "Comprar".
// Solo se envían ids, cantidades y el precio que vio el cliente; el nombre, la categoría
// y los totales los calcula el servidor a partir de lo que hay en MongoDB.
public record VentaRequest(
        @Schema(description = "Líneas del carrito") List<LineaRequest> items) {

    public record LineaRequest(
            @Schema(description = "Id del producto", example = "CT1") String productId,
            @Schema(description = "Cantidad entera entre 1 y 999", example = "2") Integer quantity,
            @Schema(description = "Precio unitario que vio el cliente. Opcional: si falta se usa el precio del catálogo. "
                    + "Debe estar entre 0 y el precio del catálogo.", example = "14990") Integer unitPrice) {
    }
}
