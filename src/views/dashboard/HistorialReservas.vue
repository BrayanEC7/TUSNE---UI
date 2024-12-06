<template>
    <div>
        <div class="surface-section pb-5">
            <div class="px-4 py-5 md:px-6 lg:px-7">
                <ul class="list-none p-0 m-0 flex align-items-center font-medium mb-3">
                    <li><span class="text-700 font-light">Mis Reservas</span></li>
                </ul>

                <div class="font-medium text-3xl text-900 mb-3">Reservas</div>
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
                                    <div class="text-800 font-bold mb-2 text-xl">NO HAY RESERVAS REGISTRADAS</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <DataTable :value="listaNosotros" tableStyle="min-width: 50rem" scrollable scrollHeight="400px">
                            <Column field="fechaSolicitud" header="Fecha de Solicitud" sortable style="width: 15%">
                            </Column>
                            <Column field="fechaReserva" header="Fecha de Reserva" sortable style="width: 15%"></Column>
                            <Column field="horaInicio" header="Hora Inicio" sortable style="width: 10%"></Column>
                            <Column field="horaFin" header="Hora Fin" sortable style="width: 10%"></Column>
                            <Column field="totalRese" header="Total" sortable style="width: 10%"></Column>
                            <Column field="pago_estadoRese" header="Estado Reserva" sortable style="width: 10%">
                            </Column>
                            <Column field="denominacion_ambi" header="Ambiente" sortable style="width: 20%"></Column>
                            <Column header="Acciones" style="width: 10%">
                                <template #body="slotProps">
                                    <div class="flex align-items-center">
                                        <Button icon="pi pi-eye" @click="verDetalles(slotProps.data)"
                                            class="p-button-rounded mr-2 p-button-info" text></Button>
                                    </div>
                                </template>
                            </Column>
                        </DataTable>
                    </div>
                </div>
            </div>
        </div>

        <Dialog v-model:visible="visible" modal :style="{ width: '50rem' }"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" class="m-0 p-0">
            <template #header>
                <p class="bg-gray-100 text-800 font-bold block border-bottom-1 surface-border p-3 text-2xl w-full">
                    <i class="pi pi-info-circle text-blue-400 text-2xl mr-2"></i> Detalles de la Reserva
                </p>
            </template>
            <div class="grid py-4">
                <div class="col-12 lg:col-6">
                    <label for="fechaSolicitud" class="font-bold block mb-2">Fecha Solicitud</label>
                    <InputText v-model="detalleReserva.fechaSolicitud" disabled class="w-full" />
                </div>
                <div class="col-12 lg:col-6">
                    <label for="fechaReserva" class="font-bold block mb-2">Fecha Reserva</label>
                    <InputText v-model="detalleReserva.fechaReserva" disabled class="w-full" />
                </div>
                <div class="col-12 lg:col-6">
                    <label for="horaInicio" class="font-bold block mb-2">Hora Inicio</label>
                    <InputText v-model="detalleReserva.horaInicio" disabled class="w-full" />
                </div>
                <div class="col-12 lg:col-6">
                    <label for="horaFin" class="font-bold block mb-2">Hora Fin</label>
                    <InputText v-model="detalleReserva.horaFin" disabled class="w-full" />
                </div>
                <div class="col-12 lg:col-6">
                    <label for="totalRese" class="font-bold block mb-2">Total</label>
                    <InputText v-model="detalleReserva.totalRese" disabled class="w-full" />
                </div>
                <div class="col-12 lg:col-6">
                    <label for="pago_estadoRese" class="font-bold block mb-2">Estado Reserva</label>
                    <InputText v-model="detalleReserva.pago_estadoRese" disabled class="w-full" />
                </div>
                <div class="col-12 lg:col-12">
                    <label for="denominacion_ambi" class="font-bold block mb-2">Ambiente</label>
                    <InputText v-model="detalleReserva.denominacion_ambi" disabled class="w-full" />
                </div>
                <div class="col-12 lg:col-12">
                <Button label="Cancelar" @click="cancelar" outlined class="text-800"></Button>
            </div>
            </div>
        </Dialog>

        <Toast />
        <ConfirmDialog group="headless">
            <template #container="{ message, rejectCallback, acceptCallback }">
                <div class="flex flex-column align-items-center p-5 surface-overlay border-round">
                    <div
                        class="border-circle bg-red-600 inline-flex justify-content-center align-items-center h-4rem w-4rem -mt-2">
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
            visible: false,
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
                this.dniUsuarioSesion = this.obtenerDniUsuarioSesion(); // Obtener el DNI del usuario en sesión (debes implementar esta función)
                const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.RESERVASCONPERS_AMB}`);
                const data = await response.json();
                // Filtrar las reservas por el DNI del usuario en sesión
                this.listaNosotros = data.filter(reserva => reserva.dniPers === this.dniUsuarioSesion);
                this.listaOriginal = [...this.listaNosotros];
                this.validacion = this.listaNosotros.length <= 0;
            } catch (error) {
                console.error('Error al cargar las reservas:', error);
            } finally {
                this.estaIterando = false;
            }
        },

        // Función para obtener el DNI del usuario en sesión (debes implementarla)
        obtenerDniUsuarioSesion() {
            return ('71484607');
        },

        // Método para mostrar los detalles de una reserva en el diálogo
        verDetalles(reserva) {
            this.detalleReserva = { ...reserva };
            this.visible = true;
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
                    this.visible = false;
                    this.limpiarcampos();
                })
                .catch((error) => {
                    console.error('Error:', error);
                    return;
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
        filtroBusqueda() {
            this.buscarInformacion();
        },
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