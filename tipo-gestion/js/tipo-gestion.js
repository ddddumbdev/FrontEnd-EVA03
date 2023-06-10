//funcion para crear cliente
function crearTipoGestion(){
var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  //creamos variables para almacenar datos
  let txt_id_tipo_gestion =       document.getElementById("txt_id_tipo_gestion").value;
  let txt_nombre_tipo_gestion =   document.getElementById("txt_nombre_tipo_gestion").value;
var raw = JSON.stringify({
  "id_tipo_gestion": txt_id_tipo_gestion,
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
//funcion para listar tipo gestion
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
    <a href='../tipo-gestion/eliminar-tipo-gestion.html?id=${element.id_tipo_gestion}'><img src='../img/trashcan_24x24.png'> </a> 
    <a href='../tipo-gestion/actualizar-tipo-gestion.html?id=${element.id_tpo_gestion}'><img src='../img/edit_24x24.png'> </a> 
  </td>
  </tr>`
}
//Eliminar tipo gestion
function eliminarTipoGestion(){
  //obtenemos id a eliminar
  var id_tipoGestion_eliminar = document.getElementById('hdn_id_tipoGestion').value

  var requestOptions = {
      method: 'DELETE',
      redirect: 'follow'
    };
    
    fetch("http://159.223.103.211/api/tipo_gestion/"+id_tipoGestion_eliminar, requestOptions)
      .then(response => {
        if (response.ok){
          alert("Cliente eliminado");
          window.location.href = "lista-tipo-gestion.html";
        }else{
          alert("Error al eliminar el tipo gestion")
        }
      }
        )
}

//obtener id del tipo_gestion eliminar
function obtenerIDTipoGestionEliminar(){
  //utilizamos search para acceder a las variables recibidas mediante URL
  var queryString = window.location.search;
  //Extraemos los parametros
  var urlParametros = new URLSearchParams(queryString);
  //Creamos variables con el id de tipo gestion
  var id_tipoGestion_url = urlParametros.get('id');
  //agregamos ID a campo oculto
  document.getElementById('hdn_id_tipoGestion').value = id_tipoGestion_url;
  //Mostramos mensaje de confirmacion
  var mensaje ="¿Desea eliminar la gestion " + id_tipoGestion_url +" ?";
  document.getElementById("alt_eliminacion").innerHTML = mensaje;
}
    