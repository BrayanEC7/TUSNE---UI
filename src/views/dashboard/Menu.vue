<template>
    <div class="surface-section pb-5">
        <div class=" px-4 py-5 md:px-6 lg:px-7 ">
            <ul class="list-none p-0 m-0 flex align-items-center font-medium mb-3">
                <li><a class="text-500 no-underline line-height-3">Aplicación</a></li>
                <li class="px-2"><i class="pi pi-angle-right text-500 line-height-3"></i></li>
                <li><span class="text-900 line-height-3">Registros</span></li>
            </ul>
            <div class="font-medium text-3xl text-900 mb-3">{{ setRuta }}</div>
            <div class="grid">
                <div class="col-12 lg:col-8">
                    <IconField iconPosition="left">
                        <InputIcon class="pi pi-search"> </InputIcon>
                        <InputText placeholder="Buscar" v-model="filtroBusqueda"
                            class="w-full surface-100 font-light text-xl" />
                    </IconField>
                </div>
                <div class="col-12 lg:col-4 flex justify-content-end lg:flex lg:justify-content-end md:flex md:justify-content-end md:col-12">
                    <Button icon="pi pi-plus" label="Nuevo Registro" severity="primary" outlined @click="toggle" />
                    <Toast />
                    <Menu ref="menu" id="config_menu" :model="items" popup />
                </div>
            </div>
            <hr>
        </div>
        <div class="px-4 md:px-6 lg:px-7">
            <div class=" flex justify-content-center" v-if="estaIterando">
                <ProgressSpinner />
            </div>
            <div v-else>
                <div v-if="validacion" class="py-3">
                    <div class=" shadow-2 border-round p-4 mb-5">
                        <div class="flex flex-column lg:flex-row align-items-center justify-content-between">
                            <div class="text-center lg:text-left lg:pr-8">
                                <div class="text-800 font-bold mb-2 text-xl">REGISTRO ACTUAL DE LA BASE DE DATOS</div>
                            </div>
                        </div>
                        <ul class="mt-4 list-none p-0 mx-0 border-1 surface-border ">
                            <li class="flex align-items-center pb-2 bg-gray-300 px-3">
                                <span class="text-xl font-bold text-gray-800 p-2">Campos</span>
                                <span class="text-gray-800 text-xl font-bold ml-auto p-2">N° Registro</span>
                            </li>
                            <li class="flex align-items-center py-3 px-4"><span
                                    class="border-round bg-purple-500 mr-3 flex-shrink-0"
                                    style="width: 1rem; height: 1rem;"></span><span class="text-xl font-medium text-90">
                                    Id</span><span class="text-600 text-xl font-medium ml-auto">0</span></li>
                            <li class="flex align-items-center py-3 px-4">
                                <span class="border-round bg-indigo-500 mr-3 flex-shrink-0"
                                    style="width: 1rem; height: 1rem;"></span>
                                <span class="text-xl font-medium text-90">Nombre</span>
                                <span class="text-600 text-xl font-medium ml-auto">0</span>
                            </li>
                            <li class="flex align-items-center py-3 px-4">
                                <span class="border-round bg-blue-500 mr-3 flex-shrink-0"
                                    style="width: 1rem; height: 1rem;"></span>
                                <span class="text-xl font-medium text-90">Ruta</span>
                                <span class="text-600 text-xl font-medium ml-auto">0</span>
                            </li>
                            <li class="flex align-items-center py-3 px-4"><span
                                    class="border-round bg-orange-500 mr-3 flex-shrink-0"
                                    style="width: 1rem; height: 1rem;"></span><span
                                    class="text-xl font-medium text-90">Icono</span><span
                                    class="text-600 text-xl font-medium ml-auto">0</span></li>
                            <li class="flex align-items-center py-3 px-4"><span
                                    class="border-round bg-yellow-500 mr-3 flex-shrink-0"
                                    style="width: 1rem; height: 1rem;"></span><span
                                    class="text-xl font-medium text-90">Orden</span><span
                                    class="text-600 text-xl font-medium ml-auto">0</span></li>
                            <li class="flex align-items-center py-3 px-4"><span
                                    class="border-round bg-green-500 mr-3 flex-shrink-0"
                                    style="width: 1rem; height: 1rem;"></span><span
                                    class="text-xl font-medium text-90">Menu
                                    padre</span><span class="text-600 text-xl font-medium ml-auto">0</span></li>
                        </ul>
                    </div>
                </div>
                <div v-else>
                    <DataTable :value="listamenus" tableStyle="min-width: 50rem" scrollable scrollHeight="400px">
                        <!--<Column field="menu_idllave_pk" header="Code" sortable style="width: 25%"></Column>-->
                        <Column field="nombre" header="Nombre" sortable style="width: 25%"></Column>
                        <Column field="url" header="Ruta" sortable style="width: 25%"></Column>
                        <Column field="icono" header="Icono" sortable style="width: 25%"></Column>
                        <Column field="orden" header="Orden" sortable style="width: 25%"></Column>
                        <Column field="nombrePadre" header="Menu Padre" sortable style="width: 25%"></Column>
                        <Column header="Acciones" style="width: 15%">
                            <template #body="slotProps">
                                <div class="button-container">
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
            <h2 class="bg-gray-100 text-800 font-bold block border-bottom-1 surface-border p-3 text-3xl w-full m-0">
                FORMULARIO {{ setRuta }}</h2>
        </template>
        <div class="grid py-4">
            <div class="col-12 lg:col-6 lg:mb-0">
                <FloatLabel>
                    <InputText type="text" v-model="menu_idllave_pk" disabled class="w-full" />
                    <label for="ID">ID</label>
                </FloatLabel>
            </div>

            <div class="col-12 lg:col-6 lg:mb-0">
                <FloatLabel>
                    <InputText type="text" v-model="nombre" class="w-full" />
                    <label for="Nombre">Nombre</label>
                </FloatLabel>
            </div>

            <div class="col-12 lg:col-6 lg:mb-0">
                <FloatLabel>
                    <InputText type="text" v-model="url" :disabled="desactivar" class="w-full" />
                    <label for="Ruta">Ruta</label>
                </FloatLabel>
            </div>

            <div class="col-12 lg:col-6 lg:mb-0">
                <FloatLabel>
                    <InputText type="text" v-model="icono" :disabled="desactivar" class="w-full" />
                    <label for="Icono">Icono</label>
                </FloatLabel>
            </div>

            <div class="col-12 lg:col-6 lg:mb-0">
                <FloatLabel>
                    <InputText type="text" v-model="orden" :disabled="desactivar" class="w-full" />
                    <label for="Orden">Orden</label>
                </FloatLabel>
            </div>

            <div class="col-12 lg:col-6 lg:mb-0">
                <Dropdown v-model="codigoPadre" :options="opcionesMenu" optionLabel="nombreP" optionValue="idP"
                    placeholder="Seleccionar Menu Padre" checkmark class="w-full" :disabled="desactivar" />
            </div>

        </div>
        <div class="flex pt-2 justify-content-end gap-1">
            <Button label="Cancelar" icon="pi pi-times" severity="danger" raised @click="cancelar()" />
            <Button label="Limpiar" icon="pi pi-refresh" severity="secondary" @click="limpiarcampos()" />
            <Button label="Guardar" icon="pi pi-save" raised @click="guardardatos()" />
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
</template>
<script>
import { API_CONFIG } from '../../service/config';
import Menu from 'primevue/menu';
import FloatLabel from 'primevue/floatlabel';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";


export default {
    setup() {
        const confirm = useConfirm();
        const toast = useToast();
        return { confirm, toast };
    },
    components: {
        IconField,
        InputIcon,
        Menu,
        FloatLabel
    },
    data() {
        return {
            visible: false,
            validacion: true,

            filtroBusqueda: '',
            items: [
                {
                    label: ' Menu Padre',
                    command: () => {
                        this.visible = true;
                        this.url = '-',
                            this.icono = '-',
                            this.orden = '-',
                            this.nombrePadre = '-',

                            this.desactivar = true;
                    }
                },
                {
                    label: 'Sub Menus',
                    icon: 'pi',
                    command: () => {
                        this.visible = true;
                        this.desactivar = false;
                    }
                }
            ],

            menu_idllave_pk: '',
            nombre: "",
            url: '',
            icono: "",
            orden: "",
            nombrePadre: "",
            codigoPadre: '',
            listamenus: [],
            
            toast: null,
            setRuta: '',
            desactivar: false,
            
            estaIterando: true,
        };
    },
    methods: {
        async iniciarCarga() {
            this.obtenerRuta();
            try {
                const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.MENUPADRE}`);
                this.listamenus = this.listMenuItems = await response.json();
                this.validacion = this.listamenus.length <= 0;
                this.filtrarMenus();
            } catch (error) {
            } finally {
                this.estaIterando = false;
            }
        },
        obtenerRuta() {
            const ruta = window.location.href;
            const partes = ruta.split('/');
            const info = partes[partes.length - 1]
            this.setRuta = info.toUpperCase();
        },
        toggle(event) {
            this.$refs.menu.toggle(event);
        },
        filtrarMenus() {
            const searchTerm = this.filtroBusqueda;
            if (searchTerm) {
                this.listamenus = this.listMenuItems.filter(fila =>
                    fila.nombre.toLowerCase().includes(searchTerm.toLowerCase()));
            } else {
                this.listamenus = [...this.listMenuItems];
            }
        },
        guardardatos() {
            this.visible = true;
            var data = {
                menu_idllave_pk: this.menu_idllave_pk,
                nombre: this.nombre,
                url: this.url,
                icono: this.icono,
                orden: this.orden,
                codigoPadre: this.codigoPadre
            };
            var metodo = "POST";
            if (this.menu_idllave_pk != null || this.menu_idllave_pk != "") {
                data.menu_idllave_pk = this.menu_idllave_pk
                metodo = "PUT";
            }
            fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.MENU}`, {
                method: metodo, // or 'PUT'
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify(data),
            }).then((response) => response.json())
                .then((data) => {
                    this.iniciarCarga();
                    this.limpiarcampos();
                    this.visible = false;
                })
                .catch((error) => {
                    console.error("Error:", error);
                    return;
                });
        },
        editarFila(datos) {
            this.visible = true;
            this.desactivar = false;
            this.menu_idllave_pk = datos.menu_idllave_pk
            this.nombre = datos.nombre;
            this.url = datos.url;
            this.orden = datos.orden;
            this.codigoPadre = datos.codigoPadre;
            this.icono = datos.icono;
        },
        async eliminarMenu(idtemp) {
            try {
                const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.MENU}` + idtemp.menu_idllave_pk, {
                    method: "DELETE",
                })
                if (response.status === 200) {
                    this.listamenus = this.listamenus.filter(item => item.menu_idllave_pk !== idtemp.menu_idllave_pk);
                    this.menu_idllave_pk = null;
                    this.iniciarCarga();
                }
            } catch (error) {

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
        cancelar() {
            this.visible = false;
            this.limpiarcampos();
        },
        limpiarcampos() {
            this.menu_idllave_pk = '';
            this.nombre = '';
            this.url = '';
            this.orden = '';
            this.codigoPadre = '';
            this.icono = '';
        },
        prepararDatosTabla() {
            const encabezados = ['Código', 'Nombre', 'Ruta', 'Icono', 'Orden', 'Menu Padre'];
            const datosTabla = this.listamenus.map(menu => [
                menu.menu_idllave_pk, menu.nombre, menu.url, menu.icono, menu.orden, menu.menuPadre
            ]);
            return [encabezados, ...datosTabla];
        },
        generarPDF() {
            const docDefinition = {
                content: [
                    { text: 'Recopilación de información', style: 'header' },
                    'Información detallada de toda la información.',
                    {
                        style: 'tableExample',
                        table: {
                            body: this.prepararDatosTabla()
                        }
                    }
                ],
                styles: {
                    header: {
                        fontSize: 18,
                        bold: true,
                        margin: [0, 0, 0, 10]
                    },
                    tableExample: {
                        margin: [0, 5, 0, 15]
                    }
                }
            };
            pdfMake.createPdf(docDefinition).open();
        }
    },
    watch: {
        filtroBusqueda() {
            this.filtrarMenus();
        }
    },
    created() {
        this.iniciarCarga();
    },
    computed: {
        opcionesMenu() {
            const nombreMenuPadre = this.listMenuItems.filter(item => item.nombrePadre === null)
                .map(item => ({
                    idP: item.menu_idllave_pk,
                    nombreP: item.nombre
                }));

            return nombreMenuPadre;

        },
    }
}
</script>
