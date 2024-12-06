<template>
    <div class="surface-section pb-5">
        <div class="px-4 py-5 md:px-6 lg:px-7">
            <ul class="list-none p-0 m-0 flex align-items-center font-medium mb-3">
                <li><span class="text-700 font-light">Registros de los ambientes</span></li>
            </ul>

            <div class="font-medium text-3xl text-900 mb-3">Ambientes</div>
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
                                <span class="text-xl font-medium text-90">Nombre</span>
                                <span class="text-600 text-xl font-medium ml-auto">0</span>
                            </li>
                            <li class="flex align-items-center py-3 px-4">
                                <span class="border-round bg-blue-500 mr-3 flex-shrink-0"
                                    style="width: 1rem; height: 1rem"></span>
                                <span class="text-xl font-medium text-90">Ruta</span>
                                <span class="text-600 text-xl font-medium ml-auto">0</span>
                            </li>
                            <li class="flex align-items-center py-3 px-4">
                                <span class="border-round bg-orange-500 mr-3 flex-shrink-0"
                                    style="width: 1rem; height: 1rem"></span><span
                                    class="text-xl font-medium text-90">Icono</span><span
                                    class="text-600 text-xl font-medium ml-auto">0</span>
                            </li>
                            <li class="flex align-items-center py-3 px-4">
                                <span class="border-round bg-yellow-500 mr-3 flex-shrink-0"
                                    style="width: 1rem; height: 1rem"></span><span
                                    class="text-xl font-medium text-90">Orden</span><span
                                    class="text-600 text-xl font-medium ml-auto">0</span>
                            </li>
                            <li class="flex align-items-center py-3 px-4">
                                <span class="border-round bg-green-500 mr-3 flex-shrink-0"
                                    style="width: 1rem; height: 1rem"></span><span
                                    class="text-xl font-medium text-90">Menu padre</span><span
                                    class="text-600 text-xl font-medium ml-auto">0</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div v-else>
                    <DataTable :value="listamenus" tableStyle="min-width: 50rem">
                        <Column field="denominacion_ambi" header="Nombre" sortable style="width: 25%"></Column>
                        <Column field="direccion_ambi" header="Dirección" sortable style="width: 25%"></Column>
                        <Column field="capacidad_ambi" header="Capacidad" sortable style="width: 15%"></Column>
                        <Column field="precioporhora_ambi" header="Precio" sortable style="width: 15%"></Column>
                        <Column field="estado_ambi" header="Estado" sortable style="width: 25%"></Column>
                        <Column header="Acciones" style="width: 20%">
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
                </div>
            </div>
        </div>
    </div>

    <Dialog v-model:visible="visible" modal :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" class="m-0 p-0">
        <template #header>
            <h2 class="bg-gray-100 text-900 font-bold block border-bottom-1 surface-border p-3 text-3xl w-full">Nuevo
                Ambiente</h2>
        </template>
        <div class="grid">
            <InputText type="text" v-model="id" :disabled="true" hidden />
            <InputText type="text" v-model="fecha_creacion_ambi" :disabled="true" hidden />
            <InputText type="text" v-model="fecha_actualizacion_ambi" :disabled="true" hidden />
            <div class="col-12 lg:col-12 lg:mb-0">
                <div class="flex-auto">
                    <label for="Nombre" class="font-bold block mb-2 pl-1">Nombre:</label>
                    <InputText type="text" v-model="denominacion_ambi" class="w-full" />
                </div>
            </div>

            <div class="col-12 lg:col-12 lg:mb-0">
                <div class="flex-auto">
                    <label for="Dirección" class="font-bold block mb-2 pl-1">Dirección:</label>
                    <InputText type="text" v-model="direccion_ambi" class="w-full" />
                </div>
            </div>

            <div class="col-12 lg:col-4 lg:mb-0">
                <div class="flex-auto">
                    <label for="Aforo" class="font-bold block mb-2 pl-1">Aforo:</label>
                    <InputText type="number" v-model="capacidad_ambi" class="w-full" />
                </div>
            </div>

            <div class="col-12 lg:col-4 lg:mb-0">
                <div class="flex-auto">
                    <label for="Precio Hora" class="font-bold block mb-2 pl-1">Precio Hora:</label>
                    <InputText type="number" v-model="precioporhora_ambi" class="w-full" />
                </div>
            </div>

            <div class="col-12 lg:col-4 lg:mb-0">
                <div class="flex-auto">
                    <label for="Estado" class="font-bold block mb-2 pl-1">Estado:</label>
                    <Dropdown v-model="estado_ambi" :options="estadosDisponibilidad" optionLabel="label"
                        optionValue="value" class="w-full" />
                </div>
            </div>
        </div>

        <div class="flex pt-2 justify-content-end gap-1">
            <Button label="Cancelar" icon="pi pi-times" severity="danger" raised @click="cancelarOperacion()" />
            <Button label="Limpiar" icon="pi pi-refresh" severity="secondary" @click="limpiarcampos()" />
            <Button label="Registrar" icon="pi pi-save" raised @click="guardardatos()" />
        </div>
    </Dialog>


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

    <Toast />
</template>

<script>
import SelectButton from 'primevue/selectbutton';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import FloatLabel from 'primevue/floatlabel';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import { API_CONFIG } from '../../service/config.js';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';

export default {
    setup() {
        const confirm = useConfirm();
        const toast = useToast();
        return { confirm, toast };
    },
    components: {
        Dropdown,
        IconField,
        InputIcon,
        FloatLabel,
        SelectButton,
        Button
    },
    data() {
        return {
            id: '',
            denominacion_ambi: '',
            capacidad_ambi: '',
            direccion_ambi: '',
            precioporhora_ambi: '',
            fecha_creacion_ambi: '',
            fecha_actualizacion_ambi: '',
            estado_ambi: '',
            listamenus: [],
            estadosDisponibilidad: [
                { label: 'Activo', value: 'Activo' },
                { label: 'Inactivo', value: 'Inactivo' },
            ],
            visible: false,
            mensajeMDL: false,

            filtroBusqueda: '',
            menuItems: [],

            confirm: null,
            toast: null,
            validacion: true,
            estaIterando: true,
            setRuta: ''
        };
    },

    methods: {
        obtenerRuta() {
            const ruta = window.location.href;
            const modulo = ruta.split('/');
            const resultado = modulo[modulo.length - 1];
            this.setRuta = resultado.toUpperCase();
        },
        async iniciarCarga() {
            this.obtenerRuta();
            try {
                const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.AMBIENTES}`);
                this.listamenus = this.listMenuItems = await response.json();
                this.validacion = this.listamenus.length <= 0;
                this.filtrarMenus();
            } catch (error) {
                //console.log(error);
            } finally {
                this.estaIterando = false;
            }
        },

        filtrarMenus() {
            const searchTerm = this.filtroBusqueda;
            if (searchTerm) {
                this.listamenus = this.listMenuItems.filter(
                    (fila) => fila.denominacion_ambi.toLowerCase().includes(searchTerm.toLowerCase()) || fila.estado_ambi.toLowerCase().includes(searchTerm.toLowerCase()) || fila.direccion_ambi.toLowerCase().includes(searchTerm.toLowerCase())
                );
            } else {
                this.listamenus = [...this.listMenuItems];
            }
        },

        guardardatos() {
            var data = {
                id: this.id,
                denominacion_ambi: this.denominacion_ambi,
                capacidad_ambi: this.capacidad_ambi,
                direccion_ambi: this.direccion_ambi,
                precioporhora_ambi: this.precioporhora_ambi,

                estado_ambi: this.estado_ambi
            };
            var metodo = 'POST';
            if (this.id != null || this.id != '') {
                data.id = this.id;
                metodo = 'PUT';
            }
            fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.AMBIENTES}`, {
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
        editarFila(datos) {
            this.visible = true;
            this.id = datos.id;
            this.denominacion_ambi = datos.denominacion_ambi;
            this.capacidad_ambi = datos.capacidad_ambi;
            this.direccion_ambi = datos.direccion_ambi;
            this.precioporhora_ambi = datos.precioporhora_ambi;
            this.estado_ambi = datos.estado_ambi;
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
        async eliminarMenu(idtemp) {
            try {
                const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.AMBIENTES}` + idtemp.id, {
                    method: 'DELETE'
                });
                if (response.status === 200) {
                    this.listamenus = this.listamenus.filter((item) => item.id !== idtemp.id);
                    this.id = null;
                    this.iniciarCarga();
                }
            } catch (error) { }
        },

        cancelarOperacion() {
            this.mensajeMDL = false;
            this.limpiarcampos();
            this.visible = false;
        },
        limpiarcampos() {
            this.id = '';
            this.denominacion_ambi = '';
            this.capacidad_ambi = '';
            this.direccion_ambi = '';
            this.precioporhora_ambi = '';
            this.estado_ambi = '';
        }
    },
    watch: {
        filtroBusqueda() {
            this.filtrarMenus();
        }
    },
    created() {
        this.iniciarCarga();
    }
};
</script>
