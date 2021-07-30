const formInput = document.querySelector('#nueva-cita'),
      mascotaInput = document.querySelector('#mascota'),
      propietarioInput = document.querySelector('#propietario'),
      telefonoInput = document.querySelector('#telefono'),
      fechaInput = document.querySelector('#fecha'),
      horaInput = document.querySelector('#hora'),
      sintomasInput = document.querySelector('#sintomas'),
      lista = document.querySelector('#citas');

let editando;

const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: '',
}

class Citas{

    constructor() {
        this.citas = [];
    }

    setCita(cita) {
        this.citas = [...this.citas, cita];

    }

    eliminarCita(id){
        this.citas = this.citas.filter( cita => cita.id !== id);
    }

    editarCita(citaActualizada){
        this.citas = this.citas.map( cita => cita.id === citaActualizada.id ? citaActualizada : cita );   
    }

}

class UI{

    mostrarMensaje(mensaje, tipo = 'exito'){
        const mensajeDiv = document.createElement('DIV');
        mensajeDiv.classList.add('alert', 'text-center', 'd-block', 'col-12');
        if(tipo === 'error'){
            mensajeDiv.classList.add('alert-danger');
        } else {
            mensajeDiv.classList.add('alert-success');
        }
        mensajeDiv.innerHTML = `<p>${mensaje}</p>`;
        
        document.querySelector('#contenido').insertBefore( mensajeDiv, document.querySelector('.agregar-cita') );

        setTimeout(() =>{
            mensajeDiv.remove();
        }, 4000);
    }

    impirmirCitas({citas}){

        this.limparListas();

        citas.forEach(cita => {
            const { id, mascota, propietario, telefono, fecha, hora, sintomas } = cita;

            const divCita = document.createElement('DIV');
            divCita.classList.add('cita', 'col-12');
            divCita.id = id;

            const mascotaParrafo = document.createElement('H2');
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
            mascotaParrafo.textContent = mascota;
            
            const propietarioParrafo = document.createElement('P');
            propietarioParrafo.innerHTML = `<span class="font-bolder">Propietario: </span>${propietario}`;
            
            const telefonoParrafo = document.createElement('P');
            telefonoParrafo.innerHTML = `<span class="font-bolder">Teléfono</span>${telefono}`;
            
            const fechaParrafo = document.createElement('P');
            fechaParrafo.innerHTML = `<span class="font-bolder">Fecha: </span>${fecha}`;
            
            const horaParrafo = document.createElement('P');
            horaParrafo.innerHTML = `<span class="font-bolder">Hora: </span>${hora}`;
            
            const sintomasParrafo = document.createElement('P');
            sintomasParrafo.innerHTML = `<span class="font-bolder">Sintomas: </span>${sintomas}`;
            
            const btnEliminar = document.createElement('BUTTON');
            btnEliminar.classList.add('btn','btn-danger', 'mr-2');
            btnEliminar.innerHTML = `Eliminar <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>`;
            btnEliminar.onclick = () => eliminarCita(id);

            const btnEditar = document.createElement('BUTTON');
            btnEditar.classList.add('btn', 'btn-info');
            btnEditar.innerHTML = `Editar <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>`;
            btnEditar.onclick = () => editarCita(cita);

            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar);
            divCita.appendChild(btnEditar);

           lista.appendChild(divCita);
        });
    }

    limparListas(){
        while(lista.firstChild) lista.removeChild(lista.firstChild);
    }
}

const ui = new UI();
const listaCitas = new Citas;

eventsListener();
function eventsListener(){
    mascotaInput.addEventListener('input', datoCita);
    propietarioInput.addEventListener('input', datoCita);
    telefonoInput.addEventListener('input', datoCita);
    fechaInput.addEventListener('input', datoCita);
    horaInput.addEventListener('input', datoCita);
    sintomasInput.addEventListener('input', datoCita);

    formInput.addEventListener('submit', crearCita);
}

function datoCita(e){
    citaObj[e.target.name] = e.target.value;
}


function crearCita(e){
    e.preventDefault();
    const {mascota, propietario, telefono, fecha, hora, sintomas} = citaObj;
    
    if( mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === ''){
        ui.mostrarMensaje('Todos los campos olbigatorios', 'error');
        return;
    }

    if(editando) {
        ui.mostrarMensaje('Cita Editada correctamente');
        formInput.querySelector('button[type="submit"]').textContent = "Agregar Cita";

        listaCitas.editarCita({...citaObj});

        editando = false;
    } else {
        citaObj.id = Date.now();
        listaCitas.setCita({...citaObj});
        ui.mostrarMensaje('Creando citas');
    }    

    reiniciarCampos();
    ui.impirmirCitas(listaCitas);    
}

function reiniciarCampos(){
    formInput.reset();

    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';

}

function eliminarCita(id){
    listaCitas.eliminarCita(id);
    
    ui.impirmirCitas(listaCitas);

    ui.mostrarMensaje('Cita Eliminada');
}

function editarCita(cita){

    llenarFormulario(cita);
    llenarObjeto(cita);

    formInput.querySelector('button[type="submit"]').textContent = "Actualizar Cita";

    editando = true;
}

function llenarFormulario(cita){
    const { id, mascota, propietario, telefono, fecha, hora, sintomas } = cita;
    mascotaInput.value = mascota;
    propietarioInput.value =propietario;
    telefonoInput.value =telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;
}

function llenarObjeto(cita){
    const { id, mascota, propietario, telefono, fecha, hora, sintomas } = cita;
    citaObj.id = id;
    citaObj.mascota = mascota;
    citaObj.propietario =propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
}