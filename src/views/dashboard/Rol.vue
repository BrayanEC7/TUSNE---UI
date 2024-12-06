<template>
    <div class="surface-section pb-5" v-if="!visible">
        <div class="px-4 py-5 md:px-6 lg:px-7">
            <ul class="list-none p-0 m-0 flex align-items-center font-medium mb-3">
                <li><a class="text-500 no-underline line-height-3">Aplicación</a></li>
                <li class="px-2"><i class="pi pi-angle-right text-500 line-height-3"></i></li>
                <li><span class="text-900 line-height-3">Registros</span></li>
            </ul>
            <div class="font-medium text-3xl text-900 mb-3">{{ this.setRuta }}</div>
            <div class="grid">
                <div class="col-12 lg:col-8">
                    <p class="font-light text-xl text-800">Configuración y Actualización de Datos de Ubicación de la página web.</p>
                </div>
                <div class="col-12 lg:col-4 flex justify-content-end lg:flex lg:justify-content-end md:flex md:justify-content-end md:col-12">
                    <Button label="Nuevo Registro" icon="pi pi-plus" severity="primary" outlined @click="visible = true" />
                </div>
            </div>
            <hr class="mt-0" />
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
                                <span class="border-round bg-purple-500 mr-3 flex-shrink-0" style="width: 1rem; height: 1rem"></span><span class="text-xl font-medium text-90"> Id</span><span class="text-600 text-xl font-medium ml-auto">0</span>
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
                                <span class="border-round bg-orange-500 mr-3 flex-shrink-0" style="width: 1rem; height: 1rem"></span><span class="text-xl font-medium text-90">Ruta del mapa</span
                                ><span class="text-600 text-xl font-medium ml-auto">0</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div v-else>
                    <DataTable :value="listaUbicacion" tableStyle="min-width: 50rem">
                        <!--<Column field="id" header="Id" sortable style="width: 25%"></Column>-->
                        <Column field="nombre_rol" header="Rol" sortable style="width: 25%"></Column>
                        <Column field="descripcion_rol" header="Descripción" sortable style="width: 25%"></Column>
                        <Column header="Acciones" style="width: 15%">
                            <template #body="slotProps">
                                <div>
                                    <Button icon="pi pi-pencil" @click="editarFila(slotProps.data)" class="p-button-rounded mr-2 p-button-info" text></Button>
                                    <Button icon="pi pi-trash" @click="confirmarEliminar(slotProps.data)" class="p-button-rounded p-button-danger" text></Button>
                                </div>
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </div>
        </div>
    </div>

    <Dialog v-model:visible="visible" modal :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" class="m-0 p-0">
        <template #header>
            <p class="bg-gray-100 text-800 font-bold block border-bottom-1 surface-border p-3 text-2xl w-full"><i class="pi pi-user text-green-400 text-2xl mr-2"></i> Nuevo Usuario</p>
        </template>
        <div class="grid py-4">
            <InputText v-model="id" type="text" class="w-full" hidden/>
            <div class="col-12 lg:col-12">
                <label for="Rol" class="font-bold block mb-2"> Rol </label>
                <InputText v-model="nombre_rol" type="text" class="w-full" />
            </div>
            <div class="col-12 lg:col-12">
                <label for="Descripción" class="font-bold block mb-2"> Descripción </label>
                <InputText type="text" v-model="descripcion_rol" class="w-full" />
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
</template>

<script>
import FloatLabel from 'primevue/floatlabel';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import { API_CONFIG } from '../../service/config';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
export default {
    setup() {
        const confirm = useConfirm();
        const toast = useToast();
        return { confirm, toast };
    },
    components: {
        FloatLabel,
        IconField,
        InputIcon
    },
    data() {
        return {
            id: '',
            nombre_rol: '',
            descripcion_rol: '',
            listaUbicacion: [],

            visible: false,
            contador: true,
            validacion: true,
            estaIterando: true,
            setRuta: ''
        };
    },
    methods: {
        obtenerRuta() {
            const ruta = window.location.href;
            const partes = ruta.split('/');
            const resultado = partes[partes.length - 1];
            this.setRuta = resultado.toUpperCase();
        },
        async iniciarCarga() {
            try {
                this.obtenerRuta();
                const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ROL}`);
                const data = await response.json();
                this.listaUbicacion = data;
                this.validacion = this.listaUbicacion.length <= 0;
            } catch (error) {
            } finally {
                this.estaIterando = false;
            }
        },
        guardarDatos() {
            var data = {
                id: this.id,
                nombre_rol: this.nombre_rol,
                descripcion_rol: this.descripcion_rol
            };
            var metodo = 'POST';

            if (this.id != null || this.id != '') {
                data.id = this.id;
                metodo = 'PUT';
            }
            fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ROL}`, {
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
            this.nombre_rol = datos.nombre_rol;
            this.descripcion_rol = datos.descripcion_rol;
        },
        cancelar() {
            this.visible = false;
            this.limpiarcampos();
        },
        limpiarcampos() {
            this.id = '';
            this.nombre_rol = '';
            this.descripcion_rol = '';
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
                const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ROL}` + idtemp.id, {
                    method: 'DELETE'
                });
                if (response.status === 200) {
                    this.listaUbicacion = this.listaUbicacion.filter((item) => item.id !== idtemp.id);
                    this.id = null;
                    this.iniciarCarga();
                }
            } catch (error) {}
        },
    },
    created() {
        this.iniciarCarga();
    }
};
</script>
