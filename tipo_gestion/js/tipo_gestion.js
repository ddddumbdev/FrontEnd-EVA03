//funcion para crear cliente
function crearTipoGestion(){
var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  //creamos variables para almacenar datos
  let txt_id_tipo_gestion =       document.getElementById("txt_id_tipo_gestion").value;
  let txt_nombre_tipo_gestion =   document.getElementById("txt_nombre_tipo_gestion").value;

var raw = JSON.stringify({
  "txt_id_tipo_gestion": txt_id_tipo_gestion,
  "nombre_tipo_gestion": txt_nombre_tipo_gestion,
  "fecha_registro": "2023-06-06"
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://159.223.103.211/api/tipo_gestion/", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}

//funcion para listar clientes
function listarTipoGestion(){
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};
fetch("http://159.223.103.211/api/tipo_gestion/",requestOptions)
  .then(response => response.json())
  .then((json) => { json.forEach(completarFila);
    return json;
})
  .then((json) => {
    $(`#tbl_tipoGestion`).DataTable();
})
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}

function completarFila(element, index, arr){
arr[index] = document.querySelector('#tbl_tipoGestion tbody').innerHTML +=
`<tr>
  <td>${element.id_tipo_gestion}</td>
  <td>${element.nombre_tipo_gestion}</td>
  <td>${element.fecha_registro}</td>
  <td>
    <a href='../tipo_gestion/eliminar-tipo-gestion.html?id=${element.id_tipo_gestion}'><img src='../img/trashcan_24x24.png'> </a> 
    <a href='../tipo_gestion/actualizar-tipo-gestion.html?id=${element.id_tpo_gestion}'><img src='../img/edit_24x24.png'> </a> 
  </td>
  </tr>`
}
    