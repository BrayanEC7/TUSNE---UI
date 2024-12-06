<template>
    <div>
      <div class="surface-section pb-5">
        <div class="px-4 py-5 md:px-6 lg:px-7">
          <ul class="list-none p-0 m-0 flex align-items-center font-medium mb-3">
            <li><span class="text-700 font-light">Reportes de las reservas</span></li>
          </ul>
  
          <div class="font-medium text-3xl text-900 mb-3">Reservas</div>
          <div class="grid">
            <div class="col-12 lg:col-6">
              <label for="fechaInicio" class="font-bold block mb-2">Fecha Inicio:</label>
              <Calendar v-model="fechaInicio" dateFormat="dd-mm-yy" class="w-full" />
            </div>
            <div class="col-12 lg:col-6">
              <label for="fechaFin" class="font-bold block mb-2">Fecha Fin:</label>
              <Calendar v-model="fechaFin" dateFormat="dd-mm-yy" class="w-full" />
            </div>
            <div class="col-12 lg:col-12 flex justify-content-end">
              <Button label="Generar Reportes" icon="pi pi-file-pdf" severity="danger" @click="generarReporte" />
            </div>
          </div>
          <hr />
        </div>
        <div class="px-4 md:px-6 lg:px-7">
          <div class="flex justify-content-center" v-if="estaIterando">
            <ProgressSpinner />
          </div>
          <div v-else>
            <div v-if="validacion" class="py-3">
              <div class="shadow-2 border-round p-4 mb-5">
                <div class="flex flex-column lg:flex-row align-items-center justify-content-between">
                  <div class="text-center lg:text-left lg:pr-8">
                    <div class="text-800   
   font-bold mb-2 text-xl">REGISTRO ACTUAL DE LA BASE DE DATOS</div>
                  </div>
                </div>
                <ul class="mt-4 list-none p-0 mx-0 border-1 surface-border">
                  <li class="flex align-items-center pb-2 bg-gray-300 px-3">
                    <span class="text-xl font-bold text-gray-800 p-2">Campos</span>
                    <span class="text-gray-800 text-xl font-bold ml-auto p-2">N° Registro</span>
                  </li>
                  <li class="flex align-items-center py-3 px-4">
                    <span class="border-round bg-purple-500 mr-3 flex-shrink-0" style="width: 1rem; height: 1rem"></span>
                    <span class="text-xl font-medium text-90">   
     
                    Id</span>
                    <span class="text-600 text-xl font-medium ml-auto">0</span>
                  </li>
                  <li class="flex align-items-center py-3 px-4">
                    <span class="border-round bg-indigo-500 mr-3 flex-shrink-0" style="width: 1rem; height: 1rem"></span>
                    <span class="text-xl font-medium text-90">Título</span>   
     
  
                    <span class="text-600 text-xl font-medium ml-auto">0</span>
                  </li>
                  <li class="flex align-items-center py-3 px-4">
                    <span class="border-round bg-blue-500 mr-3 flex-shrink-0" style="width: 1rem; height: 1rem"></span>
                    <span class="text-xl font-medium text-90">Subtítulo</span>   
     
  
                    <span class="text-600 text-xl font-medium ml-auto">0</span>
                  </li>
                  <li class="flex align-items-center py-3 px-4">
                    <span class="border-round bg-orange-500 mr-3 flex-shrink-0" style="width: 1rem; height: 1rem"></span>
                    <span class="text-xl font-medium text-90">Descripción</span>   
     
  
                    <span class="text-600 text-xl font-medium ml-auto">0</span>
                  </li>
                </ul>
              </div>
            </div>
            <div v-else>
              <DataTable :value="listaNosotros" tableStyle="min-width: 50rem" scrollable scrollHeight="400px">
                <Column field="fechaSolicitud" header="Fecha de Solicitud" sortable style="width: 10%"></Column>
                <Column field="fechaReserva" header="Fecha de Reserva" sortable style="width: 10%"></Column>
                <Column field="horaInicio" header="Hora Inicio" sortable style="width: 10%"></Column>
                <Column field="horaFin" header="Hora Fin" sortable style="width: 10%"></Column>
                <Column field="totalRese" header="Total" sortable style="width: 10%"></Column>
                <Column field="pago_estadoRese" header="Estado Reserva" sortable style="width: 10%"></Column>
                <Column field="denominacion_ambi" header="Ambiente" sortable style="width: 30%"></Column>
                <Column field="dniPers" header="DNI" sortable style="width: 10%"></Column>
              </DataTable>
            </div>
          </div>
        </div>
      </div>
  
      <Dialog v-model:visible="visible" modal :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" class="m-0 p-0">
        <template #header>
          <p class="bg-gray-100 text-800 font-bold block border-bottom-1 surface-border p-3 text-2xl w-full">
            <i class="pi pi-user text-green-400 text-2xl mr-2"></i> Editar Reserva
          </p>
        </template>
        <a class="font-bold block mb-2">Consulta DNI</a>
        <div class="grid py-4">
          <InputText type="text" v-model="id" class="w-full" hidden />
          <div class="col-12 lg:col-12 flex align-items-center gap-2">
            <div class="flex-grow-1">
              <label for="dni" class="font-bold block mb-2">Persona (por DNI)</label>
              <AutoComplete v-model="personaId" :suggestions="filteredPersonas" field="nombrePersona" placeholder="Buscar persona" @complete="onPersonaComplete" @select="seleccionarPersona" />
            </div>
            <Button icon="pi pi-check" class="p-button-rounded p-button-success" @click="completarCampos" tooltip="Cargar información" />
          </div>
          <div class="col-12 lg:col-4">
            <label for="nombre" class="font-bold block mb-2">Nombre(s)</label>
            <InputText v-model="nombrePers" class="w-full" disabled />
          </div>
          <div class="col-12 lg:col-4">
            <label for="apellidoPat" class="font-bold block mb-2">Apellido Paterno</label>
            <InputText v-model="apellido_patPers" class="w-full" disabled />
          </div>
          <div class="col-12 lg:col-4">
            <label for="apellidoMat" class="font-bold block mb-2">Apellido Materno</label>
            <InputText v-model="apellido_matPers" class="w-full" disabled />
          </div>
          <div class="col-12 lg:col-4">
            <label for="telefono" class="font-bold block mb-2">Teléfono</label>
            <InputText v-model="telefonoPers" class="w-full" disabled />
          </div>
          <div class="col-12 lg:col-4">
            <label for="email" class="font-bold block mb-2">Email</label>
            <InputText v-model="correoPers" class="w-full" disabled />
          </div>
          <div class="col-12 lg:col-4">
            <label for="denominacion" class="font-bold block mb-2">Denominación</label>
            <InputText v-model="denominacion_ambi" class="w-full" disabled />
          </div>
        </div>
        <a class="font-bold block mb-2">Datos para Reserva</a>
        <div class="grid py-4">
          <InputText type="text" v-model="id" class="w-full" hidden />
          <div class="col-12 lg:col-12">
            <label for="dni" class="font-bold block mb-2">Documento de Identidad</label>
            <Dropdown v-model="personaId2" :options="opcionesPersonas" optionLabel="nombrePersona" optionValue="idPersona" placeholder="Seleccionar una opción" checkmark class="w-full" />
          </div>
          <div class="col-12 lg:col-6">
            <label for="horaFin" class="font-bold block mb-2">Hora Inicio</label>
            <Calendar v-model="horaInicio" class="w-full" timeOnly @change="calcularTotal" />
          </div>
          <div class="col-12 lg:col-6">
            <label for="horaFin" class="font-bold block mb-2">Hora Fin</label>
            <Calendar v-model="horaFin" class="w-full" timeOnly @change="calcularTotal" />
          </div>
          <div class="col-12 lg:col-4">
            <label for="Rol" class="font-bold block mb-2">Ambiente</label>
            <Dropdown v-model="ambienteId" :options="opcionesAmbiente" optionLabel="nombreAmbiente" optionValue="idAmbiente" placeholder="Seleccionar una opción" checkmark class="w-full" @change="() => { actualizarPrecioPorHora(); calcularTotal(); }" />
          </div>
          <div class="col-12 lg:col-2">
            <label for="precioPorHora" class="font-bold block mb-2">Precio x H</label>
            <InputText v-model="precioPorHora" class="w-full" disabled />
          </div>
          <div class="col-12 lg:col-3">
            <label for="Fecha Registro" class="font-bold block mb-2"> Fecha Solicitud </label>
            <Calendar v-model="fechaSolicitud" class="w-full" dateFormat="dd-mm-yy" />
          </div>
          <div class="col-12 lg:col-3">
            <label for="Fecha Registro" class="font-bold block mb-2"> Fecha Reserva </label>
            <Calendar v-model="fechaReserva" class="w-full" dateFormat="dd-mm-yy" />
          </div>
          <div class="col-12 lg:col-3">
            <label for="total" class="font-bold block mb-2">Total</label>
            <InputText v-model="totalRese" type="number" class="w-full" disabled />
          </div>
          <div class="col-12 lg:col-3">
            <label for="total" class="font-bold block mb-2">Estado Reserva</label>
            <Dropdown v-model="pago_estadoRese" :options="estadosReservas" optionLabel="label" optionValue="value" class="w-full"></Dropdown>
          </div>
          <div class="col-12 lg:col-6" v-if="totalRese === 0">
            <label for="adjunto" class="font-bold block mb-2">Adjuntar Archivo</label>
            <input type="file" @change="manejarArchivo" class="w-full" />
          </div>
        </div>
        <div class="flex pt-2 justify-content-end gap-1">
          <Button label="Cancelar" icon="pi pi-times" severity="danger" raised @click="cancelar()" />
          <Button label="Limpiar" icon="pi pi-refresh" severity="secondary" @click="limpiarcampos()" />
          <Button label="Guardar" icon="pi pi-save" raised @click="guardarDatos()" />
        </div>
      </Dialog>
  
      <Toast />
      <ConfirmDialog group="headless">
        <template #container="{ message, rejectCallback, acceptCallback }">
          <div class="flex flex-column align-items-center p-5 surface-overlay border-round">
            <div class="border-circle bg-red-600 inline-flex justify-content-center align-items-center h-4rem w-4rem -mt-2">
              <i class="pi pi-exclamation-triangle text-5xl text-100 pb-1"></i>
            </div>
            <span class="font-bold text-3xl block mb-2 mt-4">{{ message.header }}</span>
            <p class="mb-0 text-2xl font-light">{{ message.message }}</p>
            <div class="flex align-items-center gap-3 mt-4">
              <Button label="Cancelar" @click="rejectCallback" outlined class="text-800"></Button>
              <Button label="Borrar" severity="danger" @click="acceptCallback"></Button>
            </div>
          </div>
        </template>
      </ConfirmDialog>
    </div>
  </template>
  
  <script>
  import FloatLabel from 'primevue/floatlabel';
  import IconField from 'primevue/iconfield';
  import InputIcon from 'primevue/inputicon';
  import { useConfirm } from 'primevue/useconfirm';
  import { useToast } from 'primevue/usetoast';
  import { API_CONFIG } from '../../service/config'; // Asegúrate de que esta ruta sea correcta
  import AutoComplete from 'primevue/autocomplete';
  import jsPDF from 'jspdf';
  import 'jspdf-autotable';
  
  export default {
    setup() {
      const confirm = useConfirm();
      const toast = useToast();
      return { confirm, toast };
    },
    components: {
      FloatLabel,
      IconField,
      InputIcon,
      AutoComplete
    },
    data() {
      return {
        pago_estadoRese: "Pendiente",
        filteredPersonas: null,
        nombrePers: '',
        apellido_patPers: '',
        apellido_matPers: '',
        telefonoPers: '',
        correoPers: '',
        denominacion_ambi: '',
        id: '',
        personaId: null,
        personaId2: null,
        ambienteId: null,
        precioPorHora: 0,
        fechaReserva: '',
        fechaSolicitud: '',
        fechaActualizacion: '',
        totalRese: 0,
        horaInicio: '',
        horaFin: '',
        listaNosotros: [],
        visible: false, // Asegúrate de que visible esté en false para que el diálogo esté oculto al inicio
        validacion: true,
        estaIterando: true,
        setRuta: '',
        estadosReservas: [
          { label: 'Pendiente', value: 'Pendiente' },
          { label: 'Reservado', value: 'Reservado' },
          { label: 'Reprogramado', value: 'Reprogramado' },
          { label: 'Cancelado', value: 'Cancelado' }
        ],
        listaPersona: [],
        dniPers: '',
        listaAmbiente: [],
        denominacion_ambi: '',
        // Nuevas variables para el filtro por fechas
        fechaInicio: null,
        fechaFin: null,
      };
    },
    methods: {
        manejarArchivo(event) {
            const archivo = event.target.files[0];
            if (archivo) {
                console.log("Archivo seleccionado:", archivo.name);
                // Puedes realizar la lógica de envío del archivo aquí
            } else {
                console.warn("No se seleccionó ningún archivo.");
            }
        },
        calcularTotal() {
            if (!this.horaInicio || !this.horaFin) {
                this.totalRese = 0;
                console.warn("Hora de inicio o fin no definida");
                return;
            }

            const inicio = new Date(this.horaInicio);
            const fin = new Date(this.horaFin);

            if (isNaN(inicio.getTime()) || isNaN(fin.getTime())) {
                console.error("Las horas de inicio o fin no son válidas.");
                this.totalRese = 0;
                return;
            }

            if (fin <= inicio) {
                this.$toast.add({
                    severity: "warn",
                    summary: "Advertencia",
                    detail: "La hora de inicio debe ser menor que la hora de fin.",
                    life: 3000,
                });
                console.error("Hora de fin es menor o igual a la hora de inicio.");
                this.totalRese = 0;
                return;
            }

            const diferenciaEnHoras = Math.floor((fin - inicio) / (1000 * 60 * 60));
            this.totalRese = diferenciaEnHoras * this.precioPorHora;
            console.log(`Horas: ${diferenciaEnHoras}, Precio por Hora: ${this.precioPorHora}, Total: ${this.totalRese}`);
        },

        actualizarPrecioPorHora() {
            const ambienteSeleccionado = this.listaAmbiente.find(
                (ambiente) => ambiente.id === this.ambienteId
            );
            if (ambienteSeleccionado) {
                this.precioPorHora = ambienteSeleccionado.precioporhora_ambi;
            } else {
                this.precioPorHora = 0;
            }
        },
        seleccionarPersona(event) {
            this.personaId = event;
            console.log('Persona seleccionada:', this.personaId);
        },
        completarCampos() {
            console.log('personaId:', this.personaId);

            if (!this.personaId || !this.personaId.nombrePersona) {
                this.$toast.add({
                    severity: 'warn',
                    summary: 'Advertencia',
                    detail: 'Seleccione un nombre válido',
                    life: 3000,
                });
                return;
            }

            if (!Array.isArray(this.listaPersona) || this.listaPersona.length === 0) {
                console.error('La lista de personas no está disponible o está vacía.');
                this.$toast.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'No hay datos de personas disponibles.',
                    life: 3000,
                });
                return;
            }

            const persona = this.listaPersona.find(
                (p) => p.dniPers === this.personaId.nombrePersona
            );

            if (persona) {
                this.nombrePers = persona.nombrePers || '';
                this.apellido_patPers = persona.apellido_patPers || '';
                this.apellido_matPers = persona.apellido_matPers || '';
                this.telefonoPers = persona.telefonoPers || '';
                this.correoPers = persona.correoPers || '';
                this.denominacion_ambi = persona.denominacionPers || '';

                console.log('Datos encontrados:', {
                    nombre: this.nombrePers,
                    apellidoPat: this.apellido_patPers,
                    apellidoMat: this.apellido_matPers,
                    telefono: this.telefonoPers,
                    correo: this.correoPers,
                    denominacion: this.denominacion_ambi,
                });
            } else {
                this.$toast.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'No se encontró información para este nombre',
                    life: 3000,
                });
                console.error('No se encontró la persona con nombrePersona:', this.personaId.nombrePersona);
            }
        },
        onPersonaComplete(event) {
            this.filteredPersonas = this.opcionesPersonas.filter((option) => {
                return option.nombrePersona.toLowerCase().includes(event.query.toLowerCase());
            });
        },
        obtenerRuta() {
            const ruta = window.location.href;
            const partes = ruta.split('/');
            const getUrl = partes[partes.length - 1];
            this.setRuta = getUrl.toUpperCase();
        },
        async iniciarCarga() {
            try {
                this.obtenerRuta();
                const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.RESERVASCONPERS_AMB}`);
                const data = await response.json();
                this.listaNosotros = data;
                this.listaOriginal = [...this.listaNosotros];
                this.validacion = this.listaNosotros.length <= 0;
            } catch (error) {
                console.error('Error al cargar las reservas:', error);
            } finally {
                this.estaIterando = false;
            }
        },
        async iniciarPersona() {
            try {
                const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.CLIENTES}`);
                const data = await response.json();
                this.listaPersona = data;
            } catch (error) {
                console.error('Ocurrió un error al cargar las personas:', error);
            }
        },
        async iniciarAmbiente() {
            try {
                const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.AMBIENTES}`);
                const data = await response.json();
                this.listaAmbiente = data;
            } catch (error) {
                console.error('Ocurrió un error al cargar los ambientes:', error);
            }
        },
        formatoFecha(date) {
            if (date instanceof Date && !isNaN(date)) {
                const dia = String(date.getDate()).padStart(2, '0');
                const mes = String(date.getMonth() + 1).padStart(2, '0');
                const anio = String(date.getFullYear()).slice(-4);
                const horas = String(date.getHours()).padStart(2, '0');
                const minutos = String(date.getMinutes()).padStart(2, '0');
                const segundos = String(date.getSeconds()).padStart(2, '0');
                return segundos === '00' ? `${dia}-${mes}-${anio} ${horas}:${minutos}` : `${dia}-${mes}-${anio} ${horas}:${minutos}:${segundos}`;
            } else if (typeof date === 'string') {
                const [day, month, year] = date.split('-');
                const parsedDate = new Date(year, month - 1, day);
                if (!isNaN(parsedDate)) {
                    return this.getFormattedDate(parsedDate);
                }
            }
            return 'Fecha no válida';
        },
        getFormattedDate(date) {
            const dia = String(date.getDate()).padStart(2, '0');
            const mes = String(date.getMonth() + 1).padStart(2, '0');
            const anio = String(date.getFullYear()).slice(-4);
            return `${dia}-${mes}-${anio}`;
        },
        formatoHora(date) {
            if (date instanceof Date && !isNaN(date)) {
                const horas = String(date.getHours()).padStart(2, '0');
                const minutos = String(date.getMinutes()).padStart(2, '0');
                const segundos = String(date.getSeconds()).padStart(2, '0');
                return `${horas}:${minutos}:${segundos}`;
            }
        },
        guardarDatos() {
            const fchReserva = this.fechaReserva ? this.formatoFecha(this.fechaReserva) : 'Fecha no Seleccionada';
            const fchSolicitud = this.fechaSolicitud ? this.formatoFecha(this.fechaSolicitud) : 'Fecha no Seleccionada';
            const ftHoraInicio = this.horaInicio ? this.formatoHora(this.horaInicio) : 'Hora de inicio no seleccionada';
            const ftHoraFin = this.horaFin ? this.formatoHora(this.horaFin) : 'Hora de fin no seleccionada'
            var data = {
                id: this.id,
                personaId: this.personaId2,
                ambienteId: this.ambienteId,
                fechaReserva: fchReserva,
                fechaSolicitud: fchSolicitud,
                totalRese: this.totalRese,
                pago_estadoRese: this.pago_estadoRese,
                horaInicio: ftHoraInicio,
                horaFin: ftHoraFin
            };
            var metodo = 'POST';

            if (this.id != null || this.id != '') {
                data.id = this.id;
                metodo = 'PUT';
            }

            fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.RESERVAS}`, {
                method: metodo,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
                .then((response) => response.json())
                .then((data) => {
                    this.iniciarCarga();
                    this.visible = false;
                    this.limpiarcampos();
                })
                .catch((error) => {
                    console.error('Error al guardar:', error);
                });
        },
        editar(datos) {
            this.visible = true;
            this.id = datos.id;
            this.personaId2 = datos.personaId;
            this.ambienteId = datos.ambienteId;
            this.fechaReserva = datos.fechaReserva;
            this.fechaSolicitud = datos.fechaSolicitud;
            this.fechaActualizacion = datos.fechaActualizacion;
            this.totalRese = datos.totalRese;
            this.pago_estadoRese = datos.pago_estadoRese;
            this.horaInicio = datos.horaInicio;
            this.horaFin = datos.horaFin;
        },
        confirmarEliminar(idtemp) {
            this.confirm.require({
                group: 'headless',
                header: '¿Seguro de borrar registro?',
                message: 'Por favor confirme la acción.',
                rejectLabel: 'Cancelar',
                acceptLabel: 'Borrar',
                accept: async () => {
                    await this.eliminar(idtemp);
                },
                reject: () => {
                    this.toast.add({ severity: 'error', summary: 'Notificación', detail: 'Acción cancelada', life: 3000 });
                }
            });
        },
        async eliminar(idtemp) {
            try {
                const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.RESERVAS}` + idtemp.id, {
                    method: 'DELETE'
                });
                if (response.status === 200) {
                    this.listaNosotros = this.listaNosotros.filter((item) => item.id !== idtemp.id);
                    this.id = null;
                    this.iniciarCarga();
                }
            } catch (error) {
                console.error('Error al eliminar:', error);
            }
        },
        // Método para filtrar por rango de fechas
        filtrarPorFechas() {
            if (this.fechaInicio && this.fechaFin) {
                this.listaNosotros = this.listaOriginal.filter(item => {
                    // Convertir la fecha de la reserva al formato correcto
                    const [dia, mes, anio] = item.fechaReserva.split('-');
                    const fechaReserva = new Date(anio, mes - 1, dia);
                    return fechaReserva >= this.fechaInicio && fechaReserva <= this.fechaFin;
                });
            } else {
                this.listaNosotros = [...this.listaOriginal];
            }
        },
        generarReporte() {
            const doc = new jsPDF();

            // ---  Tabla de Reservas ---
            const headersReservas = [['Fecha Solicitud', 'Fecha Reserva', 'Hora Inicio', 'Hora Fin', 'Total', 'Estado', 'Ambiente', 'DNI']];
            const dataReservas = this.listaNosotros.map(item => [
                item.fechaSolicitud,
                item.fechaReserva,
                item.horaInicio,
                item.horaFin,
                item.totalRese,
                item.pago_estadoRese,
                item.denominacion_ambi,
                item.dniPers
            ]);

            doc.autoTable({ head: headersReservas, body: dataReservas });

            // --- Tabla de Ambientes más reservados ---
            const ambientesReservados = this.listaNosotros.reduce((acc, reserva) => {
                acc[reserva.denominacion_ambi] = (acc[reserva.denominacion_ambi] || 0) + 1;
                return acc;
            }, {});
            const sortedAmbientes = Object.entries(ambientesReservados)
                .sort(([, a], [, b]) => b - a);
            const headersAmbientes = [['Ambiente', 'Cantidad de Reservas']];
            const dataAmbientes = sortedAmbientes.map(([ambiente, cantidad]) => [ambiente, cantidad]);

            doc.autoTable({ head: headersAmbientes, body: dataAmbientes, startY: doc.lastAutoTable.finalY + 10 });

            // --- Tabla de Usuarios con más reservas ---
            const usuariosReservas = this.listaNosotros.reduce((acc, reserva) => {
                acc[reserva.dniPers] = (acc[reserva.dniPers] || 0) + 1;
                return acc;
            }, {});
            const sortedUsuarios = Object.entries(usuariosReservas)
                .sort(([, a], [, b]) => b - a);
            const headersUsuarios = [['DNI Usuario', 'Cantidad de Reservas']];
            const dataUsuarios = sortedUsuarios.map(([usuario, cantidad]) => [usuario, cantidad]);

            doc.autoTable({ head: headersUsuarios, body: dataUsuarios, startY: doc.lastAutoTable.finalY + 10 });

            doc.save('reporte_reservas.pdf');
        },
        cancelar() {
            this.visible = false;
            this.limpiarcampos();
        },
        limpiarcampos() {
            this.id = '';
            this.personaId = '';
            this.personaId2 = '';
            this.ambienteId = '';
            this.fechaReserva = '';
            this.fechaSolicitud = '';
            this.fechaActualizacion = '';
            this.pago_estadoRese = '';
        }
    },
    watch: {
        // Observadores para el filtro de fechas
        fechaInicio() {
            this.filtrarPorFechas();
        },
        fechaFin() {
            this.filtrarPorFechas();
        }
    },
    computed: {
        opcionesPersonas() {
            const nombrePersona = this.listaPersona.map((item) => ({
                idPersona: item.id,
                nombrePersona: item.dniPers
            }));
            return nombrePersona;
        },
        opcionesAmbiente() {
            const nombreAmbiente = this.listaAmbiente.map((item) => ({
                idAmbiente: item.id,
                nombreAmbiente: item.denominacion_ambi
            }));
            return nombreAmbiente;
        }
    },
    created() {
        this.iniciarCarga();
        this.iniciarPersona();
        this.iniciarAmbiente();
    }
};
</script>