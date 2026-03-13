from .models import Producto

class ProductoRepository:

    def get_all(self):
        return Producto.objects.all()

    def get_by_id(self, id):
        return Producto.objects.filter(pk=id).first()

    def create(self, data: dict):
        return Producto.objects.create(**data)

    def update(self, instance, data: dict):
        for campo, valor in data.items():
            setattr(instance, campo, valor)
        instance.save()
        return instance

    def delete(self, instance):
        instance.delete()