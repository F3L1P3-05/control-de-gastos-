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
const inputPresupuesto = document.getElementById("presupuesto");

// ---------- Datos ----------
let gastos = JSON.parse(localStorage.getItem("gastos")) || [];
let presupuesto = Number(localStorage.getItem("presupuesto")) || 500000;
inputPresupuesto.value = presupuesto;

const formatoPesos = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0
});

function guardar() {
  localStorage.setItem("gastos", JSON.stringify(gastos));
}

// ---------- Render ----------
function render() {
  // gastos que se van a mostrar según el filtro
  const categoria = selectFiltro.value;
  const visibles = categoria === "Todas"
    ? gastos
    : gastos.filter(gasto => gasto.categoria === categoria);

  tablaGastos.innerHTML = "";

  visibles.forEach(gasto => {
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

  // total de lo que se ve en pantalla
  const totalVisible = visibles.reduce((suma, gasto) => suma + gasto.valor, 0);
  parrafoTotal.textContent = "Total: " + formatoPesos.format(totalVisible);

  // alerta de presupuesto con el total general
  const totalGeneral = gastos.reduce((suma, gasto) => suma + gasto.valor, 0);
  parrafoTotal.classList.toggle("excedido", totalGeneral > presupuesto);
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
  guardar();
  render();
  form.reset();
});

// ---------- Eliminar (delegación de eventos) ----------
tablaGastos.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-eliminar")) {
    const id = Number(e.target.dataset.id);
    gastos = gastos.filter(gasto => gasto.id !== id);
    guardar();
    render();
  }
});

// ---------- Filtro ----------
selectFiltro.addEventListener("change", render);

// ---------- Presupuesto ajustable ----------
inputPresupuesto.addEventListener("input", () => {
  const nuevo = Number(inputPresupuesto.value);
  if (nuevo > 0) {
    presupuesto = nuevo;
    localStorage.setItem("presupuesto", presupuesto);
    render();
  }
});

render();
