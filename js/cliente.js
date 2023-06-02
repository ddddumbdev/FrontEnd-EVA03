//funcion para listar clientes
function listarClientes(){
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("http://159.223.103.211/api/cliente?size=60", requestOptions)
    .then(response => response.json())
    .then((json) => { json.forEach(completarFila);
      return json;
    })
    .then((json) => {
      $('#tbl_clientes').DataTable();
    })
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

//

function completarFila (element, index, arr){
  arr[index] = document.querySelector('#tbl_clientes tbody').innerHTML +=
  `<tr>
      <td>${element.id_cliente}-${element.dv}</td>
      <td>${element.nombres}</td>
      <td>${element.apellidos}</td>
      <td>${element.email}</td>
      <td>${element.celular}</td>
      <td>${element.fecha_registro}</td>
      <td>
<a href='eliminar-cliente.html?id=${element.id_cliente}&nombre= ${element.nombres}&apellido=${element.apellidos}'><img src='../img/trashcan_24x24.png'> </a> 
<a href='actualizar-cliente.html?id=${element.id_cliente}'><img src='../img/edit_24x24.png'> </a> 
</td>

  </tr>`
}


//funcion para crear cliente
function crearCliente(){
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

//creamos variables para almacenar datos

    let txt_rut =       document.getElementById("txt_rut").value;
    let txt_dv =        document.getElementById("txt_dv").value;
    let txt_nombres =   document.getElementById("txt_nombres").value;
    let txt_apellidos = document.getElementById("txt_apellidos").value;
    let txt_email =     document.getElementById("txt_email").value;
    let txt_celular =   document.getElementById("txt_celular").value;

var raw = JSON.stringify({
  "id_cliente": txt_rut,
  "dv": txt_dv,
  "nombres": txt_nombres,
  "apellidos": txt_apellidos,
  "email": txt_email,
  "celular": txt_celular,
  "fecha_registro": "2023-04-27"
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://159.223.103.211/api/cliente", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}

//Eliminar cliente

function eliminarCliente(){
  //obtenemos id a eliminar
  var id_cliente_eliminar = document.getElementById('hdn_id_cliente').value

  var requestOptions = {
      method: 'DELETE',
      redirect: 'follow'
    };
    
    fetch("http://159.223.103.211/api/cliente/"+id_cliente_eliminar, requestOptions)
      .then(response => {
        if (response.ok){
          alert("Cliente eliminado");
          window.location.href = "lista-cliente.html";
        }else{
          alert("Error al eliminar al cliente")
        }
      }
        )
}

//obtener id del cliente eliminar
function obtenerIDClienteEliminar(){
  //utilizamos search para acceder a las variables recibidas mediante URL
  var queryString = window.location.search;
  //Extraemos los parametros
  var urlParametros = new URLSearchParams(queryString);
  //Creamos variables con el id del cliente
  var id_cliente_url = urlParametros.get('id');
  var nombre_url = urlParametros.get('nombre');
  var apellido_url = urlParametros.get('apellido');
  //agregamos ID a campo oculto
  document.getElementById('hdn_id_cliente').value = id_cliente_url;
  //Mostramos mensaje de confirmacion
  var mensaje ="¿Desea eliminar al cliente " + nombre_url + " " + apellido_url +" ?";
  document.getElementById("alt_eliminacion").innerHTML = mensaje;
  }

//obtener id del cliente actualizar
function obtenerIDClienteActualizar(){
//utilizamos search para acceder a las variables recibidas mediante URL
var queryString = window.location.search;
//Extraemos los parametros
var urlParametros = new URLSearchParams(queryString);
//Creamos variables con el id del cliente
var id_cliente_url = urlParametros.get('id');

document.getElementById('txt_id_cliente').value = id_cliente_url;
//Invocamos API REST para obtener datos del cliente
consultarClienteActualizar(id_cliente_url);

}
//Consultamos los datos del cliente a actualizar
function consultarClienteActualizar(id_cliente_actualizar){
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("http://159.223.103.211/api/cliente/"+id_cliente_actualizar, requestOptions)
  .then(response => response.json())
  .then((json) => json.forEach(completarFormulario))
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}

//agregamos valores recibidos en formulario html de actualizacion

function completarFormulario(element, index, arr){
//creamos variables con los datos del cliente
var nombres = element.nombres;
var apellidos = element.apellidos;

//Agregamos los valres a los campos del formulario
document.getElementById('txt_nombres').value = nombres;
document.getElementById('txt_apellidos').value = apellidos;
}
