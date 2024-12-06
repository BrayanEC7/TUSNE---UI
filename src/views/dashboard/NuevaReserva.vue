<template>
    <div class="surface-section pb-5">
      <div class="px-4 py-5 md:px-6 lg:px-7">
        <hr />
      </div>
  
      <div class="grid m-0">
        <div class="col-12 lg:col-4">
          <div class="grid text-center">
            <div class="col-12">
              <Dropdown v-model="localElegido" :options="localReservar" optionLabel="nombreArea" optionValue="idArea" placeholder="Seleccionar un área" checkmark class="w-50" />
            </div>
            <div class="col-12 lg:col-12 md:col-12">
              <p><i class="pi pi-map-marker" /> Av. Salaverry 350</p>
            </div>
            <div class="col-12 lg:col-12 md:col-12">
              <iframe :src="mapaURL" class="w-full h-full" style="border: 0" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="grid">   
  
            <div class="col-12">
              <p>Seleccionar la fecha a reservar:</p>
              <Calendar v-model="fechaReserva" inline @change="obtenerHorariosReservados" />
            </div>
            <div class="col-12">
              <div class="grid">
                <div class="col-6">
                  <p>Selecciona la hora de inicio:</p>
                  <Calendar v-model="horaInicio" timeOnly :minDate="horaMinima" :maxDate="horaMaxima" @change="validarHoraFin" class="p-fluid" inline />
                </div>
                <div class="col-6">
                  <p>Selecciona la hora de fin:</p>
                  <Calendar v-model="horaFin" timeOnly :minDate="horaInicio" :maxDate="horaMaxima" @change="calcularTotal" class="p-fluid" inline />
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="grid">
                <div class="col-12 lg:col-6">
                  <label for="total" class="font-bold block mb-2">Total a Pagar:</label>
                  <InputText v-model="totalAPagar" disabled class="w-full" />
                </div>
                <div class="col-12 lg:col-6">
                  <Button label="Reservar" icon="pi pi-check" severity="success" class="p-button-raised mt-4" @click="reservar" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-4">
          <h4>Horarios Reservados</h4>
          <div v-for="(horario, index) in horariosReservados" :key="index">
            <i class="pi pi-clock" /> {{ horario }}
          </div>
          <small v-if="!horariosReservados.length">No hay horarios reservados para esta fecha.</small>
        </div>
      </div>
  
      <Dialog v-model:visible="mostrarDetalles" modal :style="{ width: '30rem' }" :breakpoints="{ '960px': '75vw', '640px': '90vw' }" header="Detalles de la Reserva" :modal="true">
        <div class="flex flex-column align-items-center">
          <p><strong>Local:</strong> {{ nombreLocalElegido }}</p>
          <p><strong>Fecha:</strong> {{ formatoFecha(fechaReserva) }}</p>
          <p><strong>Hora Inicio:</strong> {{ formatoHora(horaInicio) }}</p>
          <p><strong>Hora Fin:</strong> {{ formatoHora(horaFin) }}</p>
          <p><strong>Total:</strong> S/. {{ totalAPagar }}</p>
        </div>
        <template #footer>
          <Button label="Cerrar" icon="pi pi-times" @click="mostrarDetalles = false" class="p-button-text" />
        </template>
      </Dialog>
  
      <Dialog v-model:visible="visible" modal :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" class="m-0 p-0">
        <template #header>
          <p class="bg-gray-100 text-800 font-bold block border-bottom-1 surface-border p-3 text-2xl w-full">
            <i class="pi pi-user text-green-400 text-2xl mr-2"></i> Nueva Reserva
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
            <label for="total" class="font-bold block mb-2">Estado</label>
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
import { API_CONFIG } from '../../service/config';
import AutoComplete from 'primevue/autocomplete';
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
            localElegido: null,
      localReservar: [],
      fechaReserva: null,
      horaInicio: null,
      horaFin: null,
      horariosReservados: [],
      totalAPagar: 0,
      precioPorHora: 10,
      horaMinima: new Date(),
      horaMaxima: new Date(),
      mostrarDetalles: false,
            localElegido: null,
            localReservar: [],
            fechaReserva: null,
            horaInicio: null,
            horaFin: null,
            horariosReservados: [],
            totalAPagar: 0,
            precioPorHora: 10,
            horaMinima: new Date(),
            horaMaxima: new Date(),
            mostrarDetalles: false,
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
            fechaSolicitud: this.getCurrentDate(),
            fechaActualizacion: '',
            totalRese: 0,
            horaInicio: '',
            horaFin: '',
            listaNosotros: [],
            visible: false,
            visible2: false,
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
            filtroBusqueda: '',
            filtroBusqueda2: ''
        };
    },
    methods: {
        mounted() {
    this.obtenerLocales();
    this.horaMinima.setHours(8, 0, 0);
    this.horaMaxima.setHours(20, 0, 0);
  },
        async obtenerLocales() {
      try {
        const response = await fetch(`${API_CONFIG.BASE_URL}/areas`);
        const data = await response.json();
        this.localReservar = data;
      } catch (error) {
        console.error('Error al obtener los locales:', error);
      }
    },
    async obtenerHorariosReservados() {
      if (this.localElegido && this.fechaReserva) {
        try {
          const fechaFormateada = this.formatoFecha(this.fechaReserva);
          const response = await fetch(`${API_CONFIG.BASE_URL}/reservas/horarios/${this.localElegido}/${fechaFormateada}`);
          const data = await response.json();
          this.horariosReservados = data.map(reserva => `${reserva.horaInicio} - ${reserva.horaFin}`);
        } catch (error) {
          console.error('Error al obtener los horarios reservados:', error);
        }
      } else {
        this.horariosReservados = [];
      }
    },
    validarHoraFin() {
      if (this.horaInicio) {
        const horaFinMinima = new Date(this.horaInicio);
        horaFinMinima.setHours(horaFinMinima.getHours() + 1);
        this.horaFin = this.horaFin && this.horaFin >= horaFinMinima ? this.horaFin : horaFinMinima;
      }
    },
    calcularTotal() {
      if (this.horaInicio && this.horaFin) {
        const inicio = new Date(this.horaInicio);
        const fin = new Date(this.horaFin);
        const horas = Math.abs(fin - inicio) / 36e5;
        this.totalAPagar = horas * this.precioPorHora;
      } else {
        this.totalAPagar = 0;
      }
    },
    reservar() {
      // ... tu lógica para enviar la reserva al servidor ...
      this.mostrarDetalles = true;
    },
    formatoFecha(date) {
      if (date instanceof Date && !isNaN(date)) {
        const dia = String(date.getDate()).padStart(2, '0');
        const mes = String(date.getMonth() + 1).padStart(2, '0');
        const anio = date.getFullYear();
        return `${anio}-${mes}-${dia}`;
      }
      return '';
    },
    formatoHora(date) {
      if (date instanceof Date && !isNaN(date)) {
        const horas = String(date.getHours()).padStart(2, '0');
        const minutos = String(date.getMinutes()).padStart(2, '0');
        return `${horas}:${minutos}`;
      }
      return '';
    },
        getCurrentDate() {
            const today = new Date();
            const day = String(today.getDate()).padStart(2, '0');
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const year = today.getFullYear();
            return `${day}-${month}-${year}`;
        },
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
                this.totalRese = 0; // Restablecer el total si falta alguna hora
                console.warn("Hora de inicio o fin no definida");
                return;
            }

            // Convertir las horas a objetos Date
            const inicio = new Date(this.horaInicio);
            const fin = new Date(this.horaFin);

            // Validar si las horas son fechas válidas
            if (isNaN(inicio.getTime()) || isNaN(fin.getTime())) {
                console.error("Las horas de inicio o fin no son válidas.");
                this.totalRese = 0;
                return;
            }

            // Validar que la hora de inicio sea menor que la hora de fin
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

            // Calcular la diferencia en horas enteras
            const diferenciaEnHoras = Math.floor((fin - inicio) / (1000 * 60 * 60));

            // Multiplicar por el precio por hora
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
                this.precioPorHora = 0; // Restablecer si no se selecciona un ambiente válido
            }
        },
        seleccionarPersona(event) {
            this.personaId = event;
            console.log('Persona seleccionada:', this.personaId);
        },
        completarCampos() {
            console.log('personaId:', this.personaId);

            // Validar que personaId tenga un nombrePersona (DNI)
            if (!this.personaId || !this.personaId.nombrePersona) {
                this.$toast.add({
                    severity: 'warn',
                    summary: 'Advertencia',
                    detail: 'Seleccione un nombre válido',
                    life: 3000,
                });
                return;
            }

            // Validar que listaPersona esté disponible
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

            // Buscar la persona por DNI en lugar de nombrePersona
            const persona = this.listaPersona.find(
                (p) => p.dniPers === this.personaId.nombrePersona
            );

            if (persona) {
                // Asignar todos los campos necesarios
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
                // Mostrar un mensaje si no se encuentra la persona
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
            // Filtra las opciones basadas en el texto ingresado
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
                console.error('Ocurrió un error', error);
            }
        },
        async iniciarAmbiente() {
            try {
                const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.AMBIENTES}`);
                const data = await response.json();
                this.listaAmbiente = data;
            } catch (error) {
                console.error('Ocurrió un error', error);
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

                // Solo incluir segundos si son diferentes de 00
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
                method: metodo, // or 'PUT'
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
                .then((response) => response.json())
                .then((data) => {
                    this.iniciarCarga();
                    this.visible2 = false;
                    this.visible = false;
                    this.limpiarcampos();
                })
                .catch((error) => {
                    console.error('Error:', error);
                    return;
                });
        },
        editar(datos) {
            this.visible2 = true;
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
            } catch (error) { }
        },
        buscarInformacion() {
            const dato = this.filtroBusqueda;
            if (dato) {
                const nuevaBusqueda = this.listaNosotros.filter((item) => item.dniPers.toUpperCase().includes(dato.toUpperCase()) || item.denominacion_ambi.toUpperCase().includes(dato.toUpperCase()) || item.fechaReserva.includes(dato) || item.fechaSolicitud.includes(dato)

                );
                this.listaNosotros = nuevaBusqueda;
            } else {
                this.listaNosotros = [...this.listaOriginal];
            }
        },
        cancelar() {
            this.visible = false;
            this.visible2 = false;
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
        }
    },
    watch: {
        filtroBusqueda() {
            this.buscarInformacion();
        },
    },
    computed: {
        mapaURL() {
      if (this.localElegido) {
        const local = this.localReservar.find(local => local.idArea === this.localElegido);
        if (local && local.coordenadas) {
          const [latitud, longitud] = local.coordenadas.split(',');
          return `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${latitud},${longitud}`; 
        }
      }
      return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.9890782190687!2d-79.84794289999999!3d-6.7711825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x904cef209f1b58db%3A0x3f77c294123025a0!2sPARQUE%20INFANTIL%20DE%20CHICLAYO!5e0!3m2!1ses!2spe!4v1727918719130!5m2!1ses!2spe";
    },
    nombreLocalElegido() { 
      if (this.localElegido) {
        const local = this.localReservar.find(local => local.idArea === this.localElegido);
        return local ? local.nombreArea : ''; 
      }
      return '';
    },
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