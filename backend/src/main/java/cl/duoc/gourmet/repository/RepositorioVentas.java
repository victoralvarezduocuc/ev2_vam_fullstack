package cl.duoc.gourmet.repository;

import cl.duoc.gourmet.model.Venta;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RepositorioVentas extends MongoRepository<Venta, String> {
}
