<style>
.text-wrap-6 {
    overflow-wrap: break-word;
    width: 50%;
}
</style>
<template>
    <div class="surface-section pb-5" v-if="!visible">
        <div class="px-4 py-5 md:px-6 lg:px-7">
            <ul class="list-none p-0 m-0 flex align-items-center font-medium mb-3">
                <li><span class="text-700 font-light">Registro de Usuario</span></li>
            </ul>
            <div class="font-medium text-3xl text-900 mb-3">Usuarios</div>
            <div class="grid">
                <div class="col-12 lg:col-8">
                    <IconField iconPosition="left">
                        <InputIcon class="pi pi-search"> </InputIcon>
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
                                <div class="text-800 font-bold mb-2 text-xl">REGISTRO ACTUAL DE LA BASE DE DATOS</div>
                            </div>
                        </div>
                        <ul class="mt-4 list-none p-0 mx-0 border-1 surface-border">
                            <li class="flex align-items-center pb-2 bg-gray-300 px-3">
                                <span class="text-xl font-bold text-gray-800 p-2">Campos</span>
                                <span class="text-gray-800 text-xl font-bold ml-auto p-2">N° Registro</span>
                            </li>
                            <li class="flex align-items-center py-3 px-4">
                                <span class="border-round bg-purple-500 mr-3 flex-shrink-0"
                                    style="width: 1rem; height: 1rem"></span><span class="text-xl font-medium text-90">
                                    Id</span><span class="text-600 text-xl font-medium ml-auto">0</span>
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
                    <DataTable :value="listamenus" tableStyle="min-width: 50rem">
                        <Column field="dniPers" header="Nro Documento" sortable style="width: 25%"></Column>
                        <Column field="nombrePers" header="Nombres" sortable style="width: 25%"></Column>
                        <Column field="apellido_patPers" header="Apellido Paterno" sortable style="width: 25%"></Column>
                        <Column field="apellido_matPers" header="Apellido Materno" sortable style="width: 25%"></Column>
                        <Column field="telefonoPers" header="Telefono" sortable style="width: 25%"></Column>
                        <Column field="correoPers" header="Correo" sortable style="width: 25%"></Column>
                        <Column field="cargoPers" header="Código Boleta" sortable style="width: 25%"></Column>
                        <Column field="nombre_rol" header="Rol" sortable style="width: 25%"></Column>
                        <Column field="fecha_registroPers" header="Fecha Registro" sortable style="width: 25%"></Column>
                        <Column header="Acciones" style="width: 15%">
                            <template #body="slotProps">
                                <div class="flex align-items-center justify-content-center">
                                    <Button icon="pi pi-pencil" @click="editarFila(slotProps.data)"
                                        class="p-button-rounded mr-2 p-button-info" text></Button>
                                    <Button icon="pi pi-trash" @click="confirmarEliminar(slotProps.data)"
                                        class="p-button-rounded p-button-danger" text></Button>
                                </div>
                            </template>
                        </Column>
                    </DataTable>
                    <Paginator :rows="rowsPerPage" :totalRecords="totalRecords" @page="onPageChange" />
                </div>
            </div>
        </div>
    </div>

    <Dialog v-model:visible="visible" modal :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" class="m-0 p-0">
        <template #header>
            <p class="bg-gray-100 text-800 font-bold block border-bottom-1 surface-border p-3 text-2xl w-full"><i
                    class="pi pi-user text-green-400 text-2xl mr-2"></i> Nuevo Usuario</p>
        </template>
        <div class="grid py-4">
            <InputText v-model="id" type="text" class="w-full" hidden />

            <!-- Documento con botón de consulta -->
            <div class="col-12 lg:col-6">
                <label for="Documento" class="font-bold block mb-2"> Documento </label>
                <div class="p-inputgroup">
                    <InputText v-model="dniPers" type="number" class="w-full" />
                    <Button label="Consultar" icon="pi pi-search" severity="primary" @click="consultarDNI" />
                </div>
            </div>

            <div class="col-12 lg:col-6">
                <label for="Rol" class="font-bold block mb-2"> Rol </label>
                <Dropdown v-model="rolId" :options="opcionesRol" optionLabel="nombreRol" optionValue="idRol"
                    placeholder="Seleccionar una opción" checkmark class="w-full" />
            </div>
            <div class="col-12 lg:col-6">
                <label for="Nombres" class="font-bold block mb-2"> Nombres </label>
                <InputText type="text" v-model="nombrePers" class="w-full" :readonly="isReadonly" />
            </div>
            <div class="col-12 lg:col-3">
                <label for="Apellido Paterno" class="font-bold block mb-2"> Apellido Paterno</label>
                <InputText type="text" v-model="apellido_patPers" class="w-full" :readonly="isReadonly" />
            </div>
            <div class="col-12 lg:col-3">
                <label for="Apellido Materno" class="font-bold block mb-2"> Apellido Materno</label>
                <InputText type="text" v-model="apellido_matPers" class="w-full" :readonly="isReadonly" />
            </div>

            <div class="col-12 lg:col-3">
                <label for="Teléfono" class="font-bold block mb-2"> Teléfono </label>
                <InputText type="number" v-model="telefonoPers" class="w-full" />
            </div>
            <div class="col-12 lg:col-3">
                <label for="Cargo" class="font-bold block mb-2"> Código Boleta </label>
                <InputText type="text" v-model="cargoPers" class="w-full" />
            </div>
            <div class="col-12 lg:col-6">
                <label for="Fecha Registro" class="font-bold block mb-2"> Fecha Registro </label>
                <Calendar v-model="fecha_registroPers" class="w-full" dateFormat="dd-mm-yy" readonlyInput disabled />
            </div>
            <div class="col-12 lg:col-6">
                <label for="Correo" class="font-bold block mb-2"> Correo </label>
                <InputText type="text" v-model="correoPers" class="w-full" placeholder="@" />
            </div>
            <div class="col-12 lg:col-6">
                <label for="Contraseña" class="font-bold block mb-2"> Contraseña </label>
                <Password v-model="clavePers" toggleMask class="p-fluid w-full" />
            </div>
        </div>
        <div class="flex pt-2 justify-content-end gap-1">
            <Button label="Cancelar" icon="pi pi-times" severity="danger" raised @click="cancelar()" />
            <Button label="Limpiar" icon="pi pi-refresh" severity="secondary" @click="limpiarcampos()" />
            <Button label="Guardar" icon="pi pi-save" raised @click="guardardatos()" />
        </div>
    </Dialog>

    <Toast />
    <ConfirmDialog group="positioned">
        <template #container="{ message, acceptCallback, rejectCallback }">
            <div class="flex align-items-start p-4 bg-yellow-100 border-bottom-1 border-yellow-300">
                <i :class="message.icon" class="text-yellow-600 text-2xl mr-3"></i>
                <div class="mr-3">
                    <div class="text-yellow-900 font-medium text-xl mb-3 line-height-1">{{ message.header }}</div>
                    <ul class="m-0 p-0 text-yellow-700 ml-3 w-21rem">
                        <li class="p-1">{{ message.message }}</li>
                        <li class="p-1">{{ message.summary }}</li>
                    </ul>
                    <div class="flex align-items-center justify-content-end gap-2 mt-3">
                        <Button label="Redirigir" @click="acceptCallback" class="text-yellow-600" outlined></Button>
                        <Button label="Cancel" class="text-yellow-800" outlined @click="rejectCallback"></Button>
                    </div>
                </div>
            </div>
        </template>
    </ConfirmDialog>

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
    <OverlayPanel ref="op">
        <div class="flex flex-column gap-3 w-25rem">
            <span class="font-medium text-900 block mb-2">Enlace de registro de los vendedores</span>
            <InputGroup>
                <InputText v-model="url" readonly class="w-23rem"></InputText>
                <InputGroupAddon class="p-0">
                    <Button icon="pi pi-copy" text @click="copyToClipboard" />
                </InputGroupAddon>
            </InputGroup>
        </div>
    </OverlayPanel>
</template>

<script>
import Paginator from 'primevue/paginator';
import FloatLabel from 'primevue/floatlabel';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import { API_CONFIG } from '../../service/config';

export default {
    setup() {
        const confirm = useConfirm();
        const toast = useToast();
        return { confirm, toast };
    },
    components: {
        Paginator,
        IconField,
        InputIcon,
        FloatLabel,
        Toast,
        InputGroup,
        InputGroupAddon
    },

    data() {
        return {
            rowsPerPage: 10, // Número de filas por página
            currentPage: 1,  // Página actual
            totalRecords: 0, // Total de registros
            visible: false,
            filtroBusqueda: '',
            id: '',
            rolId: '',
            nombrePers: '',
            dniPers: '',
            cargoPers: '',
            denominacionPers: '',
            asociacionPers: '',
            apellido_patPers: '',
            apellido_matPers: '',
            correoPers: '',
            telefonoPers: '',
            fecha_registroPers: this.getCurrentDate(),
            clavePers: '',
            estadoPers: '',
            nombre_rol: '',
            listamenus: [],
            listaClientes: [],
            toast: null,
            entidad: false,
            progress: 0,
            interval: null,
            validacion: true,
            estaIterando: true,
            setRuta: ''
        };
    },
    computed: {
        
        opcionesRol() {
            const nombreRol = this.listaclientesNull
                .map((item) => ({
                    idRol: item.id,
                    nombreRol: item.nombre_rol
                }))
                .filter((item) => item.idRol !== '41cf0a15-1f10-4953-ad15-4067e3a95477'); // Filtra el idRol que no deseas listar

            return nombreRol;
        },
        listamenus() {
            return this.listamenus.filter(item => item.nombre_rol === 'Administrador' || item.nombre_rol === 'Operador');
        }
    },
    methods: {
        cargarUsuarios() {
        const startIndex = (this.currentPage - 1) * this.rowsPerPage;
        const endIndex = startIndex + this.rowsPerPage;
        this.listamenus = this.listaClientes.slice(startIndex, endIndex); 
    },
        onPageChange(event) {
            this.currentPage = event.page + 1; // Actualizar la página actual
            this.cargarUsuarios(); // Volver a cargar los usuarios con la nueva página
        },
        validateFields() {
            if (!this.clavePers) {  // Validar contraseña obligatoria
                this.$toast.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'La contraseña es obligatoria.',
                    life: 5000
                });
                return false;
            }

            // Validar que la contraseña tenga al menos una letra y un número
            const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/;
            if (!passwordPattern.test(this.clavePers)) {
                this.$toast.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'La contraseña debe contener al menos una letra y un número.',
                    life: 5000
                });
                return false;
            }

            // Validación más completa del correo electrónico
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if (!this.correoPers || !emailPattern.test(this.correoPers)) {
                this.$toast.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'El correo electrónico es inválido.',
                    life: 5000
                });
                return false;
            }
            if (!this.dniPers || this.dniPers.length !== 8) {
                this.$toast.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'El DNI debe tener 8 dígitos.',
                    life: 5000
                });
                return false;
            }
            if (!this.correoPers || !this.correoPers.includes('@')) {
                this.$toast.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'El correo es inválido o está vacío.',
                    life: 5000
                });
                return false;
            }
            if (!this.telefonoPers || this.telefonoPers.toString().length !== 9 || !this.telefonoPers.toString().startsWith('9')) {
                this.$toast.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'El teléfono debe comenzar con "9" y contener 9 dígitos.',
                    life: 5000
                });
                return false;
            }
            return true;
        },
        getCurrentDate() {
            const today = new Date();
            const day = String(today.getDate()).padStart(2, '0');
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const year = today.getFullYear();
            return `${day}-${month}-${year}`;
        },
        async consultarDNI() {
            if (this.dniPers.length !== 8) {
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'El DNI debe tener 8 dígitos.' });
                return;
            }

            try {
                const response = await fetch("https://apiperu.dev/api/dni", {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer 14c23bc415bf30e974d66a358bc62c3bee88f654f15f033849282dce3c8d842a'
                    },
                    body: JSON.stringify({ dni: this.dniPers })
                });

                const responseData = await response.json();

                if (responseData.success) {
                    this.datos = responseData.data;
                    this.nombrePers = this.datos.nombres;
                    this.apellido_patPers = this.datos.apellido_paterno;
                    this.apellido_matPers = this.datos.apellido_materno;
                    this.isReadonly = true; // Hacer los campos solo lectura
                } else {
                    this.$toast.add({ severity: 'warn', summary: 'Sin resultados', detail: 'No se encontraron datos para el DNI ingresado.' });
                }
            } catch (err) {
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error al consultar la API.' });
                console.error(err);
            }
        },
        obtenerRuta() {
            const ruta = window.location.href;
            const modulo = ruta.split('/');
            const resultado = modulo[modulo.length - 1];
            this.setRuta = resultado.toUpperCase();
        },
        async iniciarCarga() {
            this.obtenerRuta();
            try {
                const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.CLIENTESCONROL}`);
                const data = await response.json();
                this.listaClientes = data;
                this.listamenus = [...this.listaClientes];
                this.totalRecords = this.listaClientes.length; // Actualizar el total de registros
                this.cargarUsuarios(); // Cargar la primera página de usuarios
                this.validacion = this.listaClientes.length <= 0;
                //  this.filtrarMenus();
            } catch (error) {
            } finally {
                this.estaIterando = false;
            }
        },
        async iniciarRoles() {
            try {
                const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ROL}`);
                this.listaclientesNull = await response.json();
                this.validacion = this.listaclientesNull.length <= 0;
            } catch (error) { }
        },

        filtrarMenus() {
            const searchTerm = this.filtroBusqueda.toLowerCase();
            if (searchTerm) {
                const datosM = this.listamenus.filter((fila) =>
                    fila.nombrePers.toLowerCase().includes(searchTerm) ||
                    fila.dniPers.includes(searchTerm) ||
                    fila.apellido_patPers.toLowerCase().includes(searchTerm) ||
                    fila.apellido_matPers.toLowerCase().includes(searchTerm)
                );
                this.listamenus = [...datosM];
            } else {
                this.listamenus = [...this.listaClientes];
            }
        },
        guardardatos() {
            if (!this.validateFields()) {
                return;
            }
            this.visible = true;
            const formatoFecha = this.fecha_registroPers ? this.formatDate(this.fecha_registroPers) : 'Fecha no Seleccionada';
            var data = {
                id: this.id,
                rolId: this.rolId,
                nombrePers: this.nombrePers,
                dniPers: this.dniPers,
                cargoPers: this.cargoPers,
                denominacionPers: this.denominacionPers,
                asociacionPers: this.asociacionPers,
                apellido_patPers: this.apellido_patPers,
                apellido_matPers: this.apellido_matPers,
                correoPers: this.correoPers,
                telefonoPers: this.telefonoPers,
                fecha_registroPers: formatoFecha,
                clavePers: this.clavePers,
                estadoPers: this.estadoPers
            };
            var metodo = 'POST';
            console.log(data);
            if (this.id != null || this.id != '') {
                data.id = this.id;
                metodo = 'PUT';
            }
            fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.CLIENTES}`, {
                method: metodo, // or 'PUT'
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
                .then((response) => response.json())
                .then((data) => {
                    this.iniciarCarga();

                    this.visible = false;
                })
                .catch((error) => {
                    console.error('Error:', error);
                    return;
                });
            this.$toast.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Datos guardados correctamente.',
            });
        },
        formatDate(date) {
            if (date instanceof Date && !isNaN(date)) {
                return this.getFormattedDate(date);
            }
            if (typeof date === 'string') {
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
        editarFila(datos) {
            this.visible = true;
            this.id = datos.id;
            this.rolId = datos.rolId;
            this.nombrePers = datos.nombrePers;
            this.dniPers = datos.dniPers;
            this.cargoPers = datos.cargoPers;
            this.denominacionPers = datos.denominacionPers;
            this.asociacionPers = datos.asociacionPers;
            this.apellido_patPers = datos.apellido_patPers;
            this.apellido_matPers = datos.apellido_matPers;
            this.correoPers = datos.correoPers;
            this.telefonoPers = datos.telefonoPers;
            this.fecha_registroPers = datos.fecha_registroPers;
            this.fecha_actualizacionPers = datos.fecha_actualizacionPers;
            this.clavePers = datos.clavePers;
            this.estadoPers = datos.estadoPers;
        },
        async eliminarMenu(idtemp) {
            try {
                const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.CLIENTES}` + idtemp.id, {
                    method: 'DELETE'
                });
                if (response.status === 200) {
                    const data = await response.json();
                    this.listamenus = this.listamenus.filter((item) => item.id !== idtemp.id);
                    this.id = null;
                    this.iniciarCarga();
                } else {
                    const errorMessage = await response.text();
                    alert(`Error al eliminar el menú: ${errorMessage}`);
                }
            } catch (error) {
                this.confirm.require({
                    group: 'positioned',
                    message: 'Eliminar al usuario podría ocasionar la pérdida de información sobre las propiedades.',
                    summary: 'Confirmar acción desde propiedades.',
                    header: 'Información vinculada',
                    icon: 'pi pi-info-circle',
                    position: 'topright',
                    rejectClass: 'p-button-secondary p-button-text',
                    acceptClass: 'p-button-text',
                    rejectLabel: 'Cancel',
                    acceptLabel: 'Save',
                    accept: () => {
                        this.toast.add({ severity: 'info', summary: 'Confirmed', detail: 'Request submitted', life: 3000 });
                    },
                    reject: () => {
                        this.toast.add({ severity: 'error', summary: 'Cancelar', detail: 'Proceso incompleto', life: 3000 });
                    }
                });
            }
        },
        confirmarEliminar(idtemp) {
            this.confirm.require({
                group: 'headless',
                header: '¿Seguro de borrar registro?',
                message: 'Por favor confirme la acción.',
                rejectLabel: 'Cancelar',
                acceptLabel: 'Borrar',
                accept: async () => {
                    await this.eliminarMenu(idtemp);
                },
                reject: () => {
                    this.toast.add({ severity: 'error', summary: 'Notificación', detail: 'Acción cancelada', life: 3000 });
                }
            });
        },
        limpiarcampos() {
            this.id = '';
            this.rolId = '';
            this.nombrePers = '';
            this.dniPers = '';
            this.cargoPers = '';
            this.denominacionPers = '';
            this.asociacionPers = '';
            this.apellido_patPers = '';
            this.apellido_matPers = '';
            this.correoPers = '';
            this.telefonoPers = '';
            this.fecha_actualizacionPers = '';
            this.clavePers = '';
            this.estadoPers = '';
        },
        cancelar() {
            this.visible = false;
            this.limpiarcampos();
        }
    },
    watch: {
        filtroBusqueda() {
            this.filtrarMenus();
        }
    },
    created() {
        this.iniciarCarga();
        this.iniciarRoles();
    }
};
</script>
