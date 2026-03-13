const API = 'http://localhost:8000/api/productos/';

// ── Cargar productos al iniciar ────────────────────────
async function cargarProductos() {
  try {
    const res  = await fetch(API);
    const data = await res.json();
    renderTabla(data);
  } catch (e) {
    document.getElementById('tabla-body').innerHTML =
      '<tr><td colspan="7">Error al conectar con la API. Verifica que el servidor esté corriendo.</td></tr>';
  }
}

// ── Mostrar productos en la tabla ──────────────────────
function renderTabla(productos) {
  const tbody = document.getElementById('tabla-body');

  if (productos.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7">No hay productos registrados.</td></tr>';
    return;
  }

  tbody.innerHTML = productos.map(p => `
    <tr>
      <td>${p.id}</td>
      <td>${p.nombre}</td>
      <td>${p.categoria}</td>
      <td>$${parseFloat(p.precio).toFixed(2)}</td>
      <td>${p.stock}</td>
      <td>${p.activo ? 'Sí' : 'No'}</td>
      <td>
        <button class="btn-editar" onclick="cargarEditar(${p.id})">Editar</button>
        <button class="btn-eliminar" onclick="eliminar(${p.id})">Eliminar</button>
      </td>
    </tr>
  `).join('');
}

// ── Guardar (crear o actualizar) ───────────────────────
async function submitForm() {
  const id = document.getElementById('edit-id').value;

  const body = {
    nombre:        document.getElementById('f-nombre').value,
    descripcion:   document.getElementById('f-descripcion').value,
    precio:        document.getElementById('f-precio').value,
    stock:         parseInt(document.getElementById('f-stock').value) || 0,
    categoria:     document.getElementById('f-categoria').value,
    fecha_ingreso: document.getElementById('f-fecha_ingreso').value,
    peso_kg:       parseFloat(document.getElementById('f-peso_kg').value) || null,
    imagen_url:    document.getElementById('f-imagen_url').value,
    activo:        document.getElementById('f-activo').checked,
  };

  if (!body.nombre || !body.precio || !body.categoria || !body.fecha_ingreso) {
    mostrarMensaje('Por favor completa los campos obligatorios.', 'red');
    return;
  }

  try {
    const url    = id ? `${API}${id}/` : API;
    const method = id ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (res.ok) {
      mostrarMensaje(id ? 'Producto actualizado.' : 'Producto creado.', 'green');
      resetForm();
      cargarProductos();
    } else {
      mostrarMensaje('Error al guardar el producto.', 'red');
    }
  } catch (e) {
    mostrarMensaje('Error de conexión con la API.', 'red');
  }
}

// ── Cargar datos en el formulario para editar ──────────
async function cargarEditar(id) {
  try {
    const res = await fetch(`${API}${id}/`);
    const p   = await res.json();

    document.getElementById('edit-id').value         = p.id;
    document.getElementById('f-nombre').value        = p.nombre;
    document.getElementById('f-descripcion').value   = p.descripcion;
    document.getElementById('f-precio').value        = p.precio;
    document.getElementById('f-stock').value         = p.stock;
    document.getElementById('f-categoria').value     = p.categoria;
    document.getElementById('f-fecha_ingreso').value = p.fecha_ingreso;
    document.getElementById('f-peso_kg').value       = p.peso_kg || '';
    document.getElementById('f-imagen_url').value    = p.imagen_url;
    document.getElementById('f-activo').checked      = p.activo;

    document.getElementById('form-titulo').textContent      = 'Editar Producto';
    document.getElementById('btn-cancelar').style.display   = 'inline-block';

    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (e) {
    mostrarMensaje('Error al cargar el producto.', 'red');
  }
}

// ── Eliminar producto ──────────────────────────────────
async function eliminar(id) {
  if (!confirm('¿Estás seguro de que deseas eliminar este producto?')) return;

  try {
    await fetch(`${API}${id}/`, { method: 'DELETE' });
    mostrarMensaje('Producto eliminado.', 'green');
    cargarProductos();
  } catch (e) {
    mostrarMensaje('Error al eliminar el producto.', 'red');
  }
}

// ── Limpiar formulario ─────────────────────────────────
function resetForm() {
  ['edit-id','f-nombre','f-descripcion','f-precio','f-stock',
   'f-fecha_ingreso','f-peso_kg','f-imagen_url'].forEach(id => {
    document.getElementById(id).value = '';
  });
  document.getElementById('f-categoria').value      = '';
  document.getElementById('f-activo').checked       = true;
  document.getElementById('form-titulo').textContent = 'Nuevo Producto';
  document.getElementById('btn-cancelar').style.display = 'none';
  mostrarMensaje('', '');
}

// ── Mostrar mensaje ────────────────────────────────────
function mostrarMensaje(texto, color) {
  const msg = document.getElementById('mensaje');
  msg.textContent = texto;
  msg.style.color = color;
}

// ── Iniciar ────────────────────────────────────────────
cargarProductos();
