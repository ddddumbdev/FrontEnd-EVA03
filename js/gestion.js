function obtenerTipoGestio(){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("http://159.223.103.211/api/tipo_gestion", requestOptions)
    .then()
    .then()
    .then()
    .catch()
}
function completarOption(element, index, arr){
    arr[index] = document.querySelector('#sel_tipo_gestion').innerHTML +=
    `<option value="${element.id_tipo_gestion}">${element.nombre_tipo_gestion}</option>`
}