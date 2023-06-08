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
  body:raw,
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
      <a href='../gestion/eliminar-gestion.html?id=${element.id_gestion}'><img src='../img/trashcan_24x24.png'> </a> 
      <a href='../gestion/actualizar-gestion.html?id=${element.id_gestion}'><img src='../img/edit_24x24.png'> </a> 
    </td>
  </tr>`
}