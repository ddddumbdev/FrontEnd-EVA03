//funcion para crear resultado
function crearResultado(){
var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
//creamos variables para almacenar datos
    let txt_id_resultado =       document.getElementById("txt_id_resultado").value;
    let txt_nombre_resultado =   document.getElementById("txt_nombre_resultado").value;
    
var raw = JSON.stringify({
    "id_resultado": txt_id_resultado,
    "nombre_resultado": txt_nombre_resultado,
    "fecha_registro": "2023-06-06"
});
    
var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
};
    
fetch("http://159.223.103.211/api/resultado", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

//funcion para listar resultado
function listarResultado(){
var requestOptions = {
    method: 'GET',
    redirect: 'follow'
}; 
fetch("http://159.223.103.211/api/resultado", requestOptions)
    .then(response => response.json())
    .then((json) => { json.forEach(completarFila);
     return json;
    })
    .then((json) => {
        $(`#tbl_resultado`).DataTable();
    })
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}
function completarFila (element, index, arr){
  arr[index] = document.querySelector('#tbl_resultado tbody').innerHTML +=
  `<tr>
      <td>${element.id_resultado}</td>
      <td>${element.nombre_resultado}</td>
      <td>${element.fecha_registro}</td>
      <td>
<a href='../resultado/eliminar-resultado.html?id=${element.id_resultado}&nombre= ${element.nombre_resultado}'><img src='../img/trashcan_24x24.png'> </a> 
<a href='../resultado/actualizar-resultado.html?id=${element.id_resultado}'><img src='../img/edit_24x24.png'> </a> 
</td>
    
  </tr>`
}
//Eliminar resultado
function eliminarResultado(){
    //obtenemos id a eliminar
    var id_resultado_eliminar = document.getElementById('hdn_id_resultado').value
  
    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
      };
      
      fetch("http://159.223.103.211/api/resultado/"+id_resultado_eliminar, requestOptions)
        .then(response => {
          if (response.ok){
            alert("Resultado eliminado");
            window.location.href = "lista-resultado.html";
          }else{
            alert("Error al eliminar el resultado")
          }
        }
          )
  }
  
  //obtener id del resultado eliminar
  function obtenerIDResultadoEliminar(){
    //utilizamos search para acceder a las variables recibidas mediante URL
    var queryString = window.location.search;
    //Extraemos los parametros
    var urlParametros = new URLSearchParams(queryString);
    //Creamos variables con el id del resultado
    var id_resultado_url = urlParametros.get('id');
    var nombre_url = urlParametros.get('nombre');
    //agregamos ID a campo oculto
    document.getElementById('hdn_id_resultado').value = id_resultado_url;
    //Mostramos mensaje de confirmacion
    var mensaje ="¿Desea eliminar el resultado " + nombre_url +" ?";
    document.getElementById("alt_eliminacion").innerHTML = mensaje;
  }   

  //Actualizar Resultado
  function actualizarResultado(){
    var myHeaders=new Headers();
    myHeaders.append("Content-Type","application/json");

    let id_resultado=document.getElementById("txt_id_resultado").value;
    let nombre_resultado=document.getElementById("txt_nombre_resultado").value
    
    var raw=JSON.stringify({
      "nombre_resultado":nombre_resultado
    })
    var requestOptions={
      method:'PATCH',
      headers:myHeaders,
      body:raw,
      redirect:'follow'
    }
    fetch("http://159.223.103.211/api/resultado/" + id_resultado, requestOptions)
    .then(response=>{
      if(response.ok){
        alert("resultado actualizado correctamente");
        windows.location.href="../resultado/lista-resultado.html";
      }})
    .then(result=>console.log(result))
    .catch(error=>console.log('error',error));
  }

  //obtener id resultado actualizar
  function obtenerIDResultadoActualizar(){
    var queryString = window.location.search;
    var urlParametros= new URLSearchParams(queryString);
    var id_resultado_url=urlParametros.get('id');
    document.getElementById('txt_id_resultado').value=id_resultado_url;
    //consultamos datos en API con la funcion
    consultarResultadoActualizar(id_resultado_url);
  }
  function consultarResultadoActualizar(id_resultado_actualizar){
    var requestOptions={
      method: 'GET',
      redirect:'follow'
    };
    fetch("http://159.223.103.211/api/resultado/"+id_resultado_actualizar, requestOptions)
      .then(response=>response.json())
      .then((json)=>json.forEach(completarFormulario))
      .then(result=>console.log(result))
      .catch(error=>console.log('error',error));
  }
  function completarFormulario(element){
    var nombre_resultado=element.nombre_resultado;
    document.getElementById('txt_nombre_resultado').value= nombre_resultado;
  }
