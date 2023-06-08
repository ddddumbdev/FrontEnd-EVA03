//funcion para crear usuario
function crearUsuario(){
var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
//creacion variables para la tabla
    let txt_id_usuario=document.getElementById("txt_id_usuario").value;
    let txt_dv=document.getElementById("txt_dv").value;
    let txt_nombres=document.getElementById("txt_nombres").value;
    let txt_apellidos=document.getElementById("txt_apellidos").value;
    let txt_email=document.getElementById("txt_email").value;
    let txt_celular=document.getElementById("txt_celular").value;
    let txt_username=document.getElementById("txt_username").value;
    let txt_password=document.getElementById("txt_password").value;
    
var raw=JSON.stringify({
    "id_usuario":txt_id_usuario,
    "dv": txt_dv,
    "nombres": txt_nombres,
    "apellidos": txt_apellidos,
    "email": txt_email,
    "celular": txt_celular,
    "username":txt_username,
    "password":txt_password,
    "fecha_registro":"2023-06-06"
});
var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
};
fetch("http://159.223.103.211/api/usuario",requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

}

//funcion para listar usuarios
function listarUsuarios(){
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch("http://159.223.103.211/api/usuario", requestOptions)
      .then(response => response.json())
      .then((json) => { json.forEach(completarFila);
        return json;
      })
      .then((json) => {
        $(`#tbl_usuario`).DataTable();
      })
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
  
  function completarFila (element, index, arr){
    arr[index] = document.querySelector('#tbl_usuario tbody').innerHTML +=
    `<tr>
        <td>${element.id_usuario}-${element.dv}</td>
        <td>${element.nombres}</td>
        <td>${element.apellidos}</td>
        <td>${element.email}</td>
        <td>${element.celular}</td>
        <td>${element.username}</td>
        <td>${element.password}</td>
        <td>${element.fecha_registro}</td>
        <td>
  <a href='../usuario/eliminar-usuario.html?id=${element.id_usuario}&nombre= ${element.nombres}&apellido=${element.apellidos}'><img src='../img/trashcan_24x24.png'> </a> 
  <a href='../usuario/actualizar-usuario.html?id=${element.id_usuario}'><img src='../img/edit_24x24.png'> </a> 
  </td>
  
    </tr>`
  }