package cl.duoc.gourmet.model;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

// Una línea de la venta: se guarda una copia del nombre y del precio al momento de comprar,
// para que el historial no cambie aunque después se modifique el catálogo.
@Getter
@Setter
public class LineaVenta {
    @Schema(description = "Id del producto vendido", example = "CT1")
    private String productId;

    @Schema(description = "Nombre del producto al momento de la venta", example = "Té de Matcha")
    private String name;

    @Schema(description = "Categoría del producto", example = "Cafés & Té")
    private String category;

    @Schema(description = "Unidades vendidas", example = "2")
    private int quantity;

    @Schema(description = "Precio unitario cobrado (CLP)", example = "14990")
    private int unitPrice;

    @Schema(description = "Precio del catálogo en la base de datos al momento de la venta (CLP)", example = "14990")
    private int catalogPrice;

    @Schema(description = "unitPrice x quantity (CLP)", example = "29980")
    private long subtotal;

    public LineaVenta() {
    }

    public LineaVenta(String productId, String name, String category, int quantity,
                      int unitPrice, int catalogPrice, long subtotal) {
        this.productId = productId;
        this.name = name;
        this.category = category;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.catalogPrice = catalogPrice;
        this.subtotal = subtotal;
    }
}
