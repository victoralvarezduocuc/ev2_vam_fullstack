package cl.duoc.gourmet;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@OpenAPIDefinition(info = @Info(
        title = "API de Gourmet & Co.",
        description = "API del catálogo de productos y del registro de ventas.",
        version = "1.0"))
public class GourmetApplication {
    public static void main(String[] args) {
        // Spring inicia el servidor HTTP y detecta los componentes del paquete.
        SpringApplication.run(GourmetApplication.class, args);
    }
}
