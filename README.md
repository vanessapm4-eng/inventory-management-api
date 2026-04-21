# Inventario API

## Descripción
API desarrollada para la gestión de inventarios, permitiendo registrar, consultar, actualizar y eliminar productos de forma estructurada.

Una API permite que diferentes sistemas se comuniquen entre sí y compartan información de manera automática :contentReference[oaicite:0]{index=0}, lo que hace posible gestionar datos de inventario de forma eficiente.

## Tecnologías utilizadas
- Python  
-  Django 
- SQLite  

## Funcionalidades
- Crear productos en el inventario  
- Consultar productos registrados  
- Actualizar información de productos  
- Eliminar productos del sistema

## Se realizaron pruebas considerando:

- Validación de operaciones CRUD (crear, consultar, actualizar, eliminar)
- Pruebas con datos válidos e inválidos
- Verificación de códigos de estado HTTP (200, 201, 400, 404)
- Validación de la persistencia de datos en la base de datos
- Consistencia de resultados usando diferentes herramientas

### Herramientas utilizadas para las pruebas 
- Postman  
- SoapUI  

### Tipos de pruebas ejecutadas
- Pruebas funcionales  
- Pruebas de validación de datos  
- Pruebas de respuesta del servidor  
- Validación de estructura JSON  
- Pruebas básicas de rendimiento  
- Validaciones básicas de seguridad  

### Proceso de ejecución
1. Configuración del entorno (API + base de datos)
2. Ejecución de endpoints (GET, POST, PUT, DELETE)
3. Envío de datos en formato JSON
4. Validación de respuestas HTTP
5. Verificación de datos en base de datos
6. Registro de resultados

### Evidencia de pruebas
Se documentaron casos de prueba y resultados en archivos externos:

- Estrategia de pruebas  
- Casos de prueba (Excel)  


## Cómo ejecutar el proyecto
1. Clonar repositorio  
2. Crear entorno virtual:
   python -m venv venv  
   source venv/bin/activate (Linux/Mac)  
   venv\Scripts\activate (Windows)  

3. Instalar dependencias:
   pip install -r requirements.txt  

4. Ejecutar:
   python app.py 
