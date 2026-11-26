package cl.duoc.gourmet.model;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.Instant;
import java.util.List;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

// Cada compra confirmada en el carrito se guarda como un documento en la colección "ventas".
@Getter
@Setter
@Document(collection = "ventas")
public class Venta {
    @Id
    @Schema(description = "Número de la venta, generado por MongoDB", example = "6743a1f2c9d3e4b5a6f70812")
    private String id;

    @Schema(description = "Fecha y hora en que se registró la venta (UTC)")
    private Instant fecha;

    @Schema(description = "Productos vendidos")
    private List<LineaVenta> items;

    @Schema(description = "Total de la venta en pesos chilenos (CLP)", example = "29980")
    private long total;

    public Venta() {
    }
}
