package cl.duoc.gourmet.repository;

import cl.duoc.gourmet.model.Producto;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RepositorioProductos extends MongoRepository<Producto, String> {
}
