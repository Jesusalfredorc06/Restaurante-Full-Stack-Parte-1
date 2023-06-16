const btnGuardarCliente = document.querySelector('#guardar-cliente');

let cliente ={

    mesa: ' ',
    hora: ' ',
    pedido: []
}

const categorias={

    1: 'Pizzas',
    2: 'Postres',
    3: 'Jugos',
    4: 'Comida',
    5: 'Cafe'

}

btnGuardarCliente.addEventListener('click',guardarCliente);

function guardarCliente(){

const mesa = document.querySelector('#mesa').value;
const hora = document.querySelector('#hora').value;

console.log(mesa,hora)

const camposVacios= [mesa,hora].some(campo=>campo==='');

if(camposVacios){

//console.log('hay campos vacios')
//mostrar el mensaje de error en el 
const existeAlerta = document.querySelector('.invalid-feedback');

if(!existeAlerta){

    const alerta = document.createElement('div');
    alerta.classList.add('invalid-feedback','d-block','text-center');
    alerta.textContent = 'Todos los campos son obligatorios';
    document.querySelector('.modal-body form').appendChild(alerta);
    setTimeout(()=>{

        alerta.remove();

    },3000);
}


}else{

    console.log('campos llenos');
    cliente = {...cliente,mesa,hora};

    var modalFormulario = document.querySelector('#formulario');
    var modal = bootstrap.Modal.getInstance(modalFormulario);
    modal.hide();

    mostrarSeccion();
    obtenerMenu();
}

}

function mostrarSeccion(){
    const secciones = document.querySelectorAll('.d-none');
    secciones.forEach(seccion=>seccion.classList.remove('d-none'));
}

function obtenerMenu(){
    const url = 'http://localhost:3000/menu';

    fetch(url)
        .then(respuesta=>respuesta.json())
        .then(resultado => mostrarMenu(resultado))
        .catch(error=>console.log(error))
}

function mostrarMenu(menu){
    console.log('ingresando a mostrar menu')
    console.log(menu)

    const contenido = document.querySelector('#menu .contenido');

    menu.forEach(menu=>{
        const fila = document.createElement('div');
        fila.classList.add('row', 'border.top');

        const nombre = document.createElement('div');
        nombre.classList.add('col-md-4','py-3');
        nombre.textContent = menu.nombre;

        const precio = document.createElement('div');
        precio.classList.add('col-md-4','py-3');
        precio.textContent = `$${menu.precio}`;

        const categoria = document.createElement('div');
        categoria.classList.add('col-md-4','py-3');
        categoria.textContent = categorias[menu.categoria];

        const inputCantidad = document.createElement('input');
        inputCantidad.type = 'number';
        inputCantidad.min = 0;
        inputCantidad.value = 0;
        inputCantidad.id = `producto - ${menu.id}`;
        inputCantidad.classList.add('form-control');
        inputCantidad.onchange = function(){
            const cantidad = parseInt(inputCantidad.value);
            //llamar a funcion agregar orden
        }

        const agregar = document.createElement('div');
        agregar.classList.add('col-md-2', 'py-3');
        agregar.appendChild(inputCantidad);

        fila.appendChild(nombre)
        fila.appendChild(precio)
        fila.appendChild(categoria)
        fila.appendChild(agregar)

        contenido.appendChild(fila);
    })
}