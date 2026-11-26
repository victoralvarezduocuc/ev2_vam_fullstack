package cl.duoc.gourmet.model;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

// Lombok genera los métodos de acceso durante la compilación.
// Los nombres de los campos coinciden con los que ya usa el front React (src/data/products.js).
@Getter
@Setter
@Document(collection = "productos")
public class Producto {
    // El id de negocio (QC1, CT1...) se usa como _id en MongoDB.
    @Id
    @Schema(description = "Identificador del producto", example = "QC1")
    private String id;

    @Schema(description = "Nombre que se muestra en el catálogo", example = "Charqui")
    private String name;

    @Schema(description = "Categoría a la que pertenece", example = "Quesos & Charcuteria")
    private String category;

    @Schema(description = "Precio entero en pesos chilenos (CLP)", example = "54990")
    private int price;

    @Schema(description = "URL de la imagen del producto")
    private String image;

    @Schema(description = "Descripción del producto")
    private String description;

    public Producto() {
    }

    public Producto(String id, String name, String category, int price, String image, String description) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.image = image;
        this.description = description;
    }
}
