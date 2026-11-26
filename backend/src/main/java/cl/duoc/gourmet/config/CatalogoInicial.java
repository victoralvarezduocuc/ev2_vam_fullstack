package cl.duoc.gourmet.config;

import cl.duoc.gourmet.model.Producto;
import cl.duoc.gourmet.repository.RepositorioProductos;
import java.util.List;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

// Al iniciar la API, si la colección "productos" está vacía se cargan los seis productos del sitio.
// Si la colección ya tiene datos no se toca nada, así que reiniciar el backend es seguro.
@Configuration
public class CatalogoInicial {

    @Bean
    CommandLineRunner cargarCatalogo(RepositorioProductos repositorio) {
        return args -> {
            if (repositorio.count() > 0) {
                return;
            }
            repositorio.saveAll(List.of(
                new Producto("QC1", "Charqui", "Quesos & Charcuteria", 54990,
                        "https://media.istockphoto.com/id/848611684/es/foto/cecina-de-carne.webp?a=1&b=1&s=612x612&w=0&k=20&c=zCuIsvwuQkra_fXiDlOF-pXbld3qqHD-CMi3c59ga38=",
                        "Carne deshidratada y salada de excelente calidad, concentrando todo su sabor y nutrientes en cada bocado. Listo para consumir como aperitivo o para enriquecer guisos y preparaciones típicas."),
                new Producto("CT1", "Té de Matcha", "Cafés & Té", 14990,
                        "https://plus.unsplash.com/premium_photo-1694825173868-ed003c071068?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGUlMjBtYXRjaGF8ZW58MHx8MHx8fDA%3D",
                        "Los tés matcha de alta gama y grado ceremonial más costosos del mundo destacan por su producción limitada en Japón, el cultivo a la sombra de hojas tiernas y su molienda artesanal en piedra."),
                new Producto("CD1", "Chocolate Dubai", "Chocolates & Dulces", 19990,
                        "https://media.istockphoto.com/id/2241215554/es/foto/trozos-de-barras-de-chocolate-dubai-con-pistachos-granos-de-cacao-y-knafeh-en-la-mesa-cacao-en.webp?a=1&b=1&s=612x612&w=0&k=20&c=seFI9lTvfoIaip4gFT5vYnYFPrdwREeys-dB5hxZCbo=",
                        "Las famosas tabletas de chocolate estilo Dubái combinan una cobertura de chocolate de alta calidad con un característico relleno cremoso de pistacho y el toque crujiente del kataifi."),
                new Producto("QC2", "Queso Marzolino", "Quesos & Charcuteria", 0,
                        "https://media.istockphoto.com/id/623291618/es/foto/queso-marzolino.webp?a=1&b=1&s=612x612&w=0&k=20&c=SfIWdsi55syTLJDyJlr1EDNaK08O1KmrqgUx7XnAJmo=",
                        "Fino queso italiano de leche de oveja originario de la región de la Toscana, elaborado tradicionalmente con la leche de las primeras pastorías de primavera (marzo). Presenta una textura suave y densa, con un sabor profundo, aromático y sutilmente herbáceo que refleja la calidad de los pastos estacionales."),
                new Producto("QC3", "Queso Manchego Curado", "Quesos & Charcuteria", 69990,
                        "https://media.istockphoto.com/id/1136653744/es/foto/queso-manchego-curado.webp?a=1&b=1&s=612x612&w=0&k=20&c=i-tnCG_vITDT6KTvP56js9kJfeNXs3n0CQPNaxZHhvc=",
                        "Emblema de la tradición española, elaborado exclusivamente con leche de oveja de raza manchega. Su proceso de maduración prolongada le otorga una textura firme, quebradiza y un sabor intenso, profundo, con notas sutiles a frutos secos y un carácter mantecoso muy equilibrado al paladar."),
                new Producto("VL1", "Don Melchor Cabernet Sauvignon", "Vinos & Licores", 49990,
                        "https://media.istockphoto.com/id/2291587375/photo/bottles-of-red-wine-with-grapes-and-dried-vine-on-an-old-wooden-table.jpg?s=612x612&w=0&k=20&c=GhBkBK8TECNuef0om0BA3qxD-CTHhOhHGA3lo4imTuY=",
                        "Es considerado uno de los mejores vinos ícono de Chile y del mundo. Elaborado por Concha y Toro con uvas del terroir de Puente Alto en el Valle del Maipo, destaca por su elegancia, complejidad aromática a frutos negros, cassis y notas de tabaco, con una guarda excepcional en barricas de roble francés.")));
        };
    }
}
