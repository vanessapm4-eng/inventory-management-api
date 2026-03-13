from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import ProductoSerializer
from .services import ProductoService

service = ProductoService()

class ProductoListView(APIView):
    """GET /productos/  |  POST /productos/"""

    def get(self, request):
        productos  = service.listar_productos()
        serializer = ProductoSerializer(productos, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ProductoSerializer(data=request.data)
        if serializer.is_valid():
            try:
                producto = service.crear_producto(serializer.validated_data)
                return Response(ProductoSerializer(producto).data,
                                status=status.HTTP_201_CREATED)
            except ValueError as e:
                return Response({'error': str(e)},
                                status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProductoDetailView(APIView):
    """GET /productos/:id  |  PUT /productos/:id  |  DELETE /productos/:id"""

    def get(self, request, pk):
        try:
            producto   = service.obtener_producto(pk)
            serializer = ProductoSerializer(producto)
            return Response(serializer.data)
        except ValueError as e:
            return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        serializer = ProductoSerializer(data=request.data, partial=True)
        if serializer.is_valid():
            try:
                producto = service.actualizar_producto(pk, serializer.validated_data)
                return Response(ProductoSerializer(producto).data)
            except ValueError as e:
                return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            service.eliminar_producto(pk)
            return Response(status=status.HTTP_204_NO_CONTENT)
        except ValueError as e:
            return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)