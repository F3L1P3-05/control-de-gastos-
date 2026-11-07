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
}

render();
