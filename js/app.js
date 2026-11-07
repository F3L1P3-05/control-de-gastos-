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