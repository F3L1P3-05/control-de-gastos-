// ---------- Selección de elementos ----------
const form = document.getElementById("form-gasto");
const inputDescripcion = document.getElementById("descripcion");
const inputValor = document.getElementById("valor");
const selectCategoria = document.getElementById("categoria");
const errorDescripcion = document.getElementById("error-descripcion");
const errorValor = document.getElementById("error-valor");
const errorCategoria = document.getElementById("error-categoria");
const selectFiltro = document.getElementById("filtro");
const tablaGastos = document.getElementById("tabla-gastos");
const parrafoTotal = document.getElementById("total");

// ---------- Datos ----------
let gastos = [];
const PRESUPUESTO = 500000;
const formatoPesos = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0
});

// ---------- Render ----------
function render() {
  tablaGastos.innerHTML = "";

  gastos.forEach(gasto => {
    const fila = document.createElement("tr");

    const tdDescripcion = document.createElement("td");
    tdDescripcion.textContent = gasto.descripcion;

    const tdCategoria = document.createElement("td");
    tdCategoria.textContent = gasto.categoria;

    const tdValor = document.createElement("td");
    tdValor.textContent = formatoPesos.format(gasto.valor);

    const tdAccion = document.createElement("td");
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.className = "btn-eliminar";
    btnEliminar.dataset.id = gasto.id;
    tdAccion.appendChild(btnEliminar);

    fila.append(tdDescripcion, tdCategoria, tdValor, tdAccion);
    tablaGastos.appendChild(fila);
  });

  // total y alerta de presupuesto
  const total = gastos.reduce((suma, gasto) => suma + gasto.valor, 0);
  parrafoTotal.textContent = "Total: " + formatoPesos.format(total);
  parrafoTotal.classList.toggle("excedido", total > PRESUPUESTO);
}

// ---------- Agregar gasto ----------
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const descripcion = inputDescripcion.value.trim();
  const valor = Number(inputValor.value);
  const categoria = selectCategoria.value;

  // Limpiar errores anteriores
  errorDescripcion.textContent = "";
  errorValor.textContent = "";
  errorCategoria.textContent = "";
  let valido = true;

  // Validaciones
  if (descripcion === "") {
    errorDescripcion.textContent = "La descripción es obligatoria.";
    valido = false;
  }

  if (inputValor.value === "") {
    errorValor.textContent = "El valor es obligatorio.";
    valido = false;
  } else if (valor <= 0) {
    errorValor.textContent = "El valor debe ser mayor que cero.";
    valido = false;
  }

  if (categoria === "") {
    errorCategoria.textContent = "Selecciona una categoría.";
    valido = false;
  }

  if (!valido) return;

  // Registrar el gasto
  gastos.push({ id: Date.now(), descripcion, valor, categoria });
  render();
  form.reset();
});

// ---------- Eliminar (delegación de eventos) ----------
tablaGastos.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-eliminar")) {
    const id = Number(e.target.dataset.id);
    gastos = gastos.filter(gasto => gasto.id !== id);
    render();
  }
});

render();