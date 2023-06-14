//funcion para crear gestion
function crearGestion(){
var myHeaders = new Headers();
  myHeaders.append("Content-Type","application/json");
//creacion variables
  let txt_id_gestion=       document.getElementById("txt_id_gestion").value;
  let txt_id_usuario=       document.getElementById("txt_id_usuario").value;
  let txt_id_cliente=       document.getElementById("txt_id_cliente").value;
  let txt_id_tipo_gestion=  document.getElementById("txt_id_tipo_gestion").value;
  let txt_id_resultado=     document.getElementById("txt_id_resultado").value;
  let txt_comentarios=      document.getElementById("txt_comentarios").value;
var raw=JSON.stringify({
  "id_gestion": txt_id_gestion,
  "id_usuario": txt_id_usuario,
  "id_cliente": txt_id_cliente,
  "id_tipo_gestion": txt_id_tipo_gestion,
  "id_resultado": txt_id_resultado,
  "comentarios": txt_comentarios,
  "fecha_registro": "2023-06-06"
});
var requestOptions ={
  method:'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};
fetch("http://159.223.103.211/api/gestion/",requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}

//funcion para listar gestion
function listarGestion(){
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};
fetch("http://159.223.103.211/api/gestion/", requestOptions)
  .then(response => response.json())
  .then((json) => { json.forEach(completarFila);
    return json;
  })
  .then((json) => {
    $(`#tbl_gestion`).DataTable();
  })
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}
  
function completarFila (element, index, arr){
arr[index] = document.querySelector('#tbl_gestion tbody').innerHTML +=
`<tr>
    <td>${element.id_gestion}</td>
    <td>${element.id_usuario}</td>
    <td>${element.id_cliente}</td>
    <td>${element.id_tipo_gestion}</td>
    <td>${element.id_resultado}</td>
    <td>${element.comentarios}</td>
    <td>${element.fecha_registro}</td>
    <td>
      <a href='../gestion/eliminar-gestion.html?id=${element.id_gestion}'><img src='../img/trashcan_24x24.png'></a> 
      <a href='../gestion/actualizar-gestion.html?id=${element.id_gestion}'><img src='../img/edit_24x24.png'> </a> 
    </td>
  </tr>`
}
//Eliminar gestion
function eliminarGestion(){
  //obtenemos id a eliminar
  var id_gestion_eliminar = document.getElementById('hdn_id_gestion').value

  var requestOptions = {
      method: 'DELETE',
      redirect: 'follow'
    };
    
    fetch("http://159.223.103.211/api/gestion/"+ id_gestion_eliminar, requestOptions)
      .then(response => {
        if (response.ok){
          alert("Gestion eliminada");
          window.location.href = "lista-gestion.html";
        }else{
          alert("Error al eliminar la gestion, los id en cuestion deben estar en uso por ahora.")
        }
      }
        )
}

//obtener id de gestion a eliminar
function obtenerIDGestionEliminar(){
  //utilizamos search para acceder a las variables recibidas mediante URL
  var queryString = window.location.search;
  //Extraemos los parametros
  var urlParametros = new URLSearchParams(queryString);
  //Creamos variables con el id de la gestion
  var id_gestion_url = urlParametros.get('id_gestion');
  
  //agregamos ID a campo oculto
  document.getElementById('hdn_id_gestion').value = id_gestion_url;
  //Mostramos mensaje de confirmacion
  var mensaje ="¿Desea eliminar la gestion " + id_gestion_url + " ?";
  document.getElementById("alt_eliminacion").innerHTML = mensaje;
}
//actualizar gestion
function actualizarGestion(){
  var myHeaders=new Headers();
  myHeaders.append("Content-Type","application/json");
  //datos formulario
  let id_gestion=document.getElementById("txt_id_gestion").value;
  let comentarios=document.getElementById("txt_comentarios").value;

  var raw=JSON.stringify({
    "ID Gestion":id_gestion,
    "comentarios":comentarios,
  })
  var requestOptions={
    method:'PATCH',
    headers: myHeaders,
    body: raw,
    redirect:'follow'
  }
  fetch("http://159.223.103.211/api/gestion/" + id_gestion, requestOptions)
  .then(response=>{
    if(response.ok){
      alert("gestion actualizada correctamente");
      window.location.href="../gestion/lista-gestion.html";
    }})
  .then(result =>console.log(result))
  .catch(error=>console.log('error',error));
}
function obtenerIDGestionActualizar(){
  //recibimos variables con search desde el url  y los pasamos a variable
  var queryString=window.location.search;
  var urlParametros= new URLSearchParams(queryString);
  var id_gestion=urlParametros.get('id');
  document.getElementById('txt_id_gestion'),value=id_gestion_url;
  consultarGestionActualizar(id_gestion_url);
}
//consultamos datos a la API
function consultarGestionActualizar(id_gestion_actualizar){
  var requestOptions={
    method:'GET',
    redirect:'follow'
  };
  fetch("http://159.223.103.211/api/gestion" + id_gestion_actualizar, requestOptions)
    .then(response => response.json())
    .then((json) => json.forEach(completarFormulario))
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}
function completarFormulario(element){
  var comentarios=element.comentarios;
  document.getElementById('txt_comentarios').value=comentarios;
}