package cl.duoc.gourmet.controller;

import cl.duoc.gourmet.model.Venta;
import cl.duoc.gourmet.model.VentaRequest;
import cl.duoc.gourmet.service.VentasService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ventas")
@Tag(name = "Ventas", description = "Registro y consulta de ventas")
public class VentasController {
    private final VentasService servicio;

    public VentasController(VentasService servicio) {
        this.servicio = servicio;
    }

    @Operation(
            summary = "Registrar una venta",
            description = "Valida el carrito contra el catálogo y guarda la venta en MongoDB (colección ventas).")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Venta registrada. Devuelve la venta con su id y el total."),
            @ApiResponse(responseCode = "400", description = "Carrito vacío, cantidad inválida, producto inexistente o precio no válido.")
    })
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Venta registrar(@RequestBody VentaRequest solicitud) {
        return servicio.registrar(solicitud);
    }

    @Operation(
            summary = "Listar las ventas",
            description = "Devuelve todas las ventas registradas, de la más reciente a la más antigua. "
                    + "Es una herramienta de comprobación para el curso: en un sitio real esta ruta debe requerir autenticación.")
    @GetMapping
    public List<Venta> listar() {
        return servicio.listar();
    }
}
