from .repository import ProductoRepository

repo = ProductoRepository()

class ProductoService:

    def listar_productos(self):
        return repo.get_all()

    def obtener_producto(self, id):
        producto = repo.get_by_id(id)
        if not producto:
            raise ValueError(f"Producto con id {id} no encontrado")
        return producto

    def crear_producto(self, data: dict):
        if data.get('precio', 0) <= 0:
            raise ValueError("El precio debe ser mayor a 0")
        if data.get('stock', 0) < 0:
            raise ValueError("El stock no puede ser negativo")
        return repo.create(data)

    def actualizar_producto(self, id, data: dict):
        producto = self.obtener_producto(id)
        return repo.update(producto, data)

    def eliminar_producto(self, id):
        producto = self.obtener_producto(id)
        repo.delete(producto)