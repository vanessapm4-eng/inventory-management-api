from django.db import models

class Producto(models.Model):

    CATEGORIAS = [
        ('electronica',  'Electrónica'),
        ('ropa',         'Ropa'),
        ('alimentos',    'Alimentos'),
        ('herramientas', 'Herramientas'),
        ('otros',        'Otros'),
    ]

    nombre        = models.CharField(max_length=200)
    descripcion   = models.TextField(blank=True)
    precio        = models.DecimalField(max_digits=10, decimal_places=2)
    stock         = models.IntegerField(default=0)
    activo        = models.BooleanField(default=True)
    categoria     = models.CharField(max_length=50, choices=CATEGORIAS)
    fecha_ingreso = models.DateField()
    peso_kg       = models.FloatField(null=True, blank=True)
    imagen_url    = models.URLField(blank=True)

    class Meta:
        ordering = ['-fecha_ingreso']

    def __str__(self):
        return self.nombre