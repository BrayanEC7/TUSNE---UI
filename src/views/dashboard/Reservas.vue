<template>
    <div>
        <div class="surface-section pb-5" v-if="!visible">
            <div class="px-4 py-5 md:px-6 lg:px-7">
                <ul class="list-none p-0 m-0 flex align-items-center font-medium mb-3">
                    <li><span class="text-700 font-light">Registro de las reservas</span></li>
                </ul>

                <div class="font-medium text-3xl text-900 mb-3">Reservas</div>
                <div class="grid">
                    <div class="col-12 lg:col-8">
                        <IconField iconPosition="left">
                            <InputIcon class="pi pi-search"></InputIcon>
                            <InputText placeholder="Buscar" v-model="filtroBusqueda"
                                class="w-full surface-100 font-light text-xl" />
                        </IconField>
                    </div>
                    <div
                        class="col-12 lg:col-4 flex justify-content-end lg:flex lg:justify-content-end md:flex md:justify-content-end md:col-12">
                        <Button label="Nuevo Registro" icon="pi pi-plus" severity="primary" outlined
                            @click="visible = true" />
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
                                    <div class="text-800 font-bold mb-2 text-xl">REGISTRO ACTUAL DE LA BASE DE DATOS
                                    </div>
                                </div>
                            </div>
                            <ul class="mt-4 list-none p-0 mx-0 border-1 surface-border">
                                <li class="flex align-items-center pb-2 bg-gray-300 px-3">
                                    <span class="text-xl font-bold text-gray-800 p-2">Campos</span>
                                    <span class="text-gray-800 text-xl font-bold ml-auto p-2">N° Registro</span>
                                </li>
                                <li class="flex align-items-center py-3 px-4">
                                    <span class="border-round bg-purple-500 mr-3 flex-shrink-0"
                                        style="width: 1rem; height: 1rem"></span><span
                                        class="text-xl font-medium text-90"> Id</span><span
                                        class="text-600 text-xl font-medium ml-auto">0</span>
                                </li>
                                <li class="flex align-items-center py-3 px-4">
                                    <span class="border-round bg-indigo-500 mr-3 flex-shrink-0"
                                        style="width: 1rem; height: 1rem"></span>
                                    <span class="text-xl font-medium text-90">Título</span>
                                    <span class="text-600 text-xl font-medium ml-auto">0</span>
                                </li>
                                <li class="flex align-items-center py-3 px-4">
                                    <span class="border-round bg-blue-500 mr-3 flex-shrink-0"
                                        style="width: 1rem; height: 1rem"></span>
                                    <span class="text-xl font-medium text-90">Subtítulo</span>
                                    <span class="text-600 text-xl font-medium ml-auto">0</span>
                                </li>
                                <li class="flex align-items-center py-3 px-4">
                                    <span class="border-round bg-orange-500 mr-3 flex-shrink-0"
                                        style="width: 1rem; height: 1rem"></span><span
                                        class="text-xl font-medium text-90">Descripción</span><span
                                        class="text-600 text-xl font-medium ml-auto">0</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div v-else>
                        <DataTable :value="listaNosotros" tableStyle="min-width: 50rem" scrollable scrollHeight="400px">
                            <Column field="fechaSolicitud" header="Fecha de Solicitud" sortable style="width: 10%">
                            </Column>
                            <Column field="fechaReserva" header="Fecha de Reserva" sortable style="width: 10%"></Column>
                            <Column field="horaInicio" header="Hora Inicio" sortable style="width: 10%"></Column>
                            <Column field="horaFin" header="Hora Fin" sortable style="width: 10%"></Column>
                            <Column field="totalRese" header="Total" sortable style="width: 10%"></Column>
                            <Column field="pago_estadoRese" header="Estado Reserva" sortable style="width: 10%">
                            </Column>
                            <Column field="denominacion_ambi" header="Ambiente" sortable style="width: 30%"></Column>
                            <Column field="dniPers" header="DNI" sortable style="width: 10%"></Column>
                            <Column header="Acciones" style="width: 15%">
                                <template #body="slotProps">
                                    <div class="flex align-items-center">
                                        <Button icon="pi pi-pencil" @click="editar(slotProps.data); visible2 = true"
                                            class="p-button-rounded mr-2 p-button-info" text>
                                        </Button>
                                        <Button icon="pi pi-trash" @click="confirmarEliminar(slotProps.data)"
                                            class="p-button-rounded p-button-danger" text></Button>
                                    </div>
                                </template>
                            </Column>
                        </DataTable>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Dialog v-model:visible="visible" modal :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" class="m-0 p-0">
        <template #header>
            <p class="bg-gray-100 text-800 font-bold block border-bottom-1 surface-border p-3 text-2xl w-full"><i
                    class="pi pi-user text-green-400 text-2xl mr-2"></i> Nueva Reserva</p>
        </template>
        <a class="font-bold block mb-2">Consulta DNI</a>
        <div class="grid py-4">


            <InputText type="text" v-model="id" class="w-full" hidden />
            <div class="col-12 lg:col-12 flex align-items-center gap-2">
                <div class="flex-grow-1">
                    <label for="dni" class="font-bold block mb-2">Persona (por DNI)</label>
                    <AutoComplete v-model="personaId" :suggestions="filteredPersonas" field="nombrePersona"
                        placeholder="Buscar persona" @complete="onPersonaComplete" @select="seleccionarPersona" />
                </div>
                <Button icon="pi pi-check" class="p-button-rounded p-button-success" @click="completarCampos"
                    tooltip="Cargar información" />
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
                <Dropdown v-model="personaId2" :options="opcionesPersonas" optionLabel="nombrePersona"
                    optionValue="idPersona" placeholder="Seleccionar una opción" checkmark class="w-full" />
            </div>


            <div class="col-12 lg:col-6">

                <label for="horaFin" class="font-bold block mb-2">Hora Inicio</label>
                <Calendar v-model="horaInicio" class="w-full" timeOnly @change="calcularTotal" />
            </div>

            <!-- Campo Hora Fin -->
            <div class="col-12 lg:col-6">
                <label for="horaFin" class="font-bold block mb-2">Hora Fin</label>
                <Calendar v-model="horaFin" class="w-full" timeOnly @change="calcularTotal" />
            </div>
            <div class="col-12 lg:col-4">
                <label for="Rol" class="font-bold block mb-2">Ambiente</label>
                <Dropdown v-model="ambienteId" :options="opcionesAmbiente" optionLabel="nombreAmbiente"
                    optionValue="idAmbiente" placeholder="Seleccionar una opción" checkmark class="w-full"
                    @change="() => { actualizarPrecioPorHora(); calcularTotal(); }" />
            </div>

            <!-- Campo Precio por Hora -->
            <div class="col-12 lg:col-2">
                <label for="precioPorHora" class="font-bold block mb-2">Precio x H</label>
                <InputText v-model="precioPorHora" class="w-full" disabled />
            </div>

            <!-- Campo Fecha Solicitud -->
            <div class="col-12 lg:col-3">
                <label for="Fecha Registro" class="font-bold block mb-2"> Fecha Solicitud </label>
                <Calendar v-model="fechaSolicitud" class="w-full" dateFormat="dd-mm-yy" readonlyInput disabled />
            </div>

            <!-- Campo Fecha Reserva -->
            <div class="col-12 lg:col-3">
                <label for="Fecha Registro" class="font-bold block mb-2"> Fecha Reserva </label>
                <Calendar v-model="fechaReserva" class="w-full" dateFormat="dd-mm-yy" />
            </div>

            <!-- Campo Total -->
            <div class="col-12 lg:col-3">
                <label for="total" class="font-bold block mb-2">Total</label>
                <InputText v-model="totalRese" type="number" class="w-full" disabled />
            </div>

            <div class="col-12 lg:col-3">
                <label for="total" class="font-bold block mb-2">Estado Reserva</label>
                <Dropdown v-model="pago_estadoRese" :options="estadosReservas" optionLabel="label" optionValue="value" disabled
                    class="w-full"></Dropdown>
            </div>


            <!-- Campo Adjunto -->
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
    <Dialog v-model:visible="visible2" modal :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" class="m-0 p-0">
        <template #header>
            <p class="bg-gray-100 text-800 font-bold block border-bottom-1 surface-border p-3 text-2xl w-full"><i
                    class="pi pi-user text-green-400 text-2xl mr-2"></i> Editar Reserva</p>
        </template>
        <div class="grid py-4">


            <InputText type="text" v-model="id" class="w-full" hidden />

            <div class="col-12 lg:col-12">
                <label for="dni" class="font-bold block mb-2">Documento de Identidad</label>
                <Dropdown v-model="personaId2" :options="opcionesPersonas" optionLabel="nombrePersona"
                    optionValue="idPersona" placeholder="Seleccionar una opción" checkmark class="w-full" disabled/>
            </div>


            <div class="col-12 lg:col-6">

                <label for="horaFin" class="font-bold block mb-2">Hora Inicio</label>
                <Calendar v-model="horaInicio" class="w-full" timeOnly @change="calcularTotal" />
            </div>

            <!-- Campo Hora Fin -->
            <div class="col-12 lg:col-6">
                <label for="horaFin" class="font-bold block mb-2">Hora Fin</label>
                <Calendar v-model="horaFin" class="w-full" timeOnly @change="calcularTotal" />
            </div>
            <div class="col-12 lg:col-4">
                <label for="Rol" class="font-bold block mb-2">Ambiente</label>
                <Dropdown v-model="ambienteId" :options="opcionesAmbiente" optionLabel="nombreAmbiente"
                    optionValue="idAmbiente" placeholder="Seleccionar una opción" checkmark class="w-full"
                    @change="() => { actualizarPrecioPorHora(); calcularTotal(); }" />
            </div>

            <!-- Campo Precio por Hora -->
            <div class="col-12 lg:col-2">
                <label for="precioPorHora" class="font-bold block mb-2">Precio x H</label>
                <InputText v-model="precioPorHora" class="w-full" disabled />
            </div>

            <!-- Campo Fecha Solicitud -->
            <div class="col-12 lg:col-3">
                <label for="Fecha Registro" class="font-bold block mb-2"> Fecha Solicitud </label>
                <Calendar v-model="fechaSolicitud" class="w-full" dateFormat="dd-mm-yy" />
            </div>

            <!-- Campo Fecha Reserva -->
            <div class="col-12 lg:col-3">
                <label for="Fecha Registro" class="font-bold block mb-2"> Fecha Reserva </label>
                <Calendar v-model="fechaReserva" class="w-full" dateFormat="dd-mm-yy" />
            </div>

            <!-- Campo Total -->
            <div class="col-12 lg:col-3">
                <label for="total" class="font-bold block mb-2">Total</label>
                <InputText v-model="totalRese" type="number" class="w-full" disabled />
            </div>

            <div class="col-12 lg:col-3">
                <label for="total" class="font-bold block mb-2">Estado Reserva</label>
                <Dropdown v-model="pago_estadoRese" :options="estadosReservas" optionLabel="label" optionValue="value"
                    class="w-full"></Dropdown>
            </div>


            <!-- Campo Adjunto -->
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
            this.fechaActualizacion = '';
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