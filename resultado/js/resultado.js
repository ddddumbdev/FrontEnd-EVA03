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
    