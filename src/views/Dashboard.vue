<template>
    <div class="surface-section pb-5">
        <div class="px-4 py-5 md:px-5 lg:px-8 surface-section ">
            <div class="flex lg:flex-row lg:align-items-center lg:justify-content-between" v-for="item in listaempresa">
                <div class="">
                    <div class="text-900 text-3xl font-medium mb-3">{{ item.nombre_emp }}</div>
                    <p class="mt-0 mb-3 text-700 lg:text-xl md:text-sm">{{ item.descripcion_emp }}</p>
                    <div class="text-600 font-medium lg:font-medium uppercase text-sm"><span>{{ item.departamento_emp }} | {{
                item.provincia_emp }}</span>
                    </div>
                </div>
                <div class="flex align-items-center justify-content-center lg:shadow-2 lg:mb-3 md:shadow-0 ">
                    <img :src="item.logo_emp" alt="logo"
                        class="w-8rem lg:w-8rem lg:h-7rem lg:p-2 border-round md:w-8rem bg-gray-900" />
                </div>
            </div>
            <hr>
        </div>
        <div class="px-4 md:px-6 lg:px-8">
            <div class="grid">

                <div class="col-12 lg:col-6 xl:col-4">
                    <div class="surface-card shadow-2 p-3 border-1 border-50 border-round">
                        <div class="flex justify-content-between mb-3">
                            <div><span class="block text-500 font-medium mb-3">INMUEBLES</span>
                                <div class="text-900 font-medium text-xl">{{ totalPropiedades }}</div>
                            </div>
                            <div class="flex align-items-center justify-content-center bg-blue-100 border-round"
                                style="width: 2.5rem; height: 2.5rem;"><i class="pi pi-home text-blue-500 text-xl"></i>
                            </div>
                        </div>
                        <div class="flex justify-content-between align-items-center">
                            <span class="text-green-500 font-medium text-sm">PLANO: <span class="text-500 ml-2">{{
                totalTerrenos }}</span></span>
                            <span class="text-green-500 font-medium text-sm">CLIENTES: <span class="text-500 ml-2">{{
                totalTerrenosCli }}</span></span>
                            <ToggleButton v-model="checkedInmueble" onLabel=" " offLabel=" " onIcon="pi pi-arrow-down"
                                offIcon="pi pi-cog" aria-label="Do you confirm" @click="configInmueble" />

                            <!-- <Button icon="pi pi-cog" aria-label="Save" text class="m-0 p-0" v-tooltip.bottom="{
                value: 'Configuración avanzada', pt: {
                    arrow: {
                        style: {
                            borderBottomColor: 'var(--p-primary-color)'
                        }
                    },
                    text: 'bg-primary text-primary-contrast font-medium'
                }
            }" />-->
                        </div>
                    </div>
                </div>
                <div class="col-12 lg:col-6 xl:col-4">
                    <div class="surface-card shadow-2 p-3 border-1 border-50 border-round">
                        <div class="flex justify-content-between mb-3">
                            <div><span class="block text-500 font-medium mb-3">MENSAJES</span>
                                <div class="text-900 font-medium text-xl">{{ totalMensajes }}</div>
                            </div>
                            <div class="flex align-items-center justify-content-center bg-orange-100 border-round"
                                style="width: 2.5rem; height: 2.5rem;"><i
                                    class="pi pi-envelope text-orange-500 text-xl"></i></div>
                        </div>
                        <div class="flex justify-content-between align-items-center">
                            <span class="text-green-500 font-medium text-sm">TOTAL: <span class="text-500 ml-2">{{
                totalMensajes }}</span></span>
                            <ToggleButton onLabel=" " offLabel=" " offIcon="pi pi-arrow-up" disabled />
                        </div>
                    </div>
                </div>
                <div class="col-12 lg:col-6 xl:col-4">
                    <div class="surface-card shadow-2 p-3 border-1 border-50 border-round">
                        <div class="flex justify-content-between mb-3">
                            <div><span class="block text-500 font-medium mb-3">REGISTRADOS</span>
                                <div class="text-900 font-medium text-xl">{{ totalRegistrosClientes }}</div>
                            </div>
                            <div class="flex align-items-center justify-content-center bg-purple-100 border-round"
                                style="width: 2.5rem; height: 2.5rem;"><i
                                    class="pi pi-users text-purple-500 text-xl"></i>
                            </div>
                        </div>
                        <div class="flex justify-content-between align-items-center">
                            <span class="text-green-500 font-medium text-sm">VENDEDORES: <span class="text-500 ml-2">{{
                totalVendedor }}</span></span>
                            <span class="text-green-500 font-medium text-sm">TRABAJADORES: <span
                                    class="text-500 ml-2">{{ totalTrabajador }}</span></span>
                            <ToggleButton v-model="checkedRegistrados" onLabel=" " offLabel=" "
                                onIcon="pi pi-arrow-down" offIcon="pi pi-cog" aria-label="Do you confirm"
                                @click="configRegistrados" />
                        </div>
                    </div>
                </div>

                <template v-if="visibleInmueble">
                    <div class="col-12 xl:col-6">
                        <div class="surface-card shadow-2 border-round px-3 pb-3 pt-0">
                            <div class="text-xl text-700 font-bold  border-bottom-1 surface-border text-center py-2">
                                TIPO DE PROPIEDADES </div>
                            <DataTable :value="listatipoPropiedades" tableStyle="min-width: 25rem" scrollable
                                scrollHeight="400px">
                                <Column field="id" header="ID" sortable style="width: 5%"></Column>
                                <Column field="titulo" header="NOMBRE" sortable style="width:5%"></Column>
                                <Column header="Acciones" style="width: 10%">
                                    <template #body="slotProps">
                                        <div class="button-container">
                                            <Button icon="pi pi-pencil" @click="editarFilaTP(slotProps.data)"
                                                class="p-button-rounded mr-2 p-button-info" text></Button>
                                            <Button icon="pi pi-trash" @click="confirmarEliminarTP(slotProps.data)"
                                                class="p-button-rounded p-button-danger" text></Button>
                                        </div>
                                    </template>
                                </Column>
                            </DataTable>
                            <div class="flex justify-content-between pt-3 gap-2">
                                <IconField iconPosition="left">
                                    <InputIcon class="pi pi-search"> </InputIcon>
                                    <InputText placeholder="Buscar" v-model="filtroBusquedaTP"
                                        class="w-full surface-100 font-light text-xl" />
                                </IconField>
                                <Button label="Nuevo registro" severity="primary" icon="pi pi-plus" class="w-6" outlined
                                    @click="tipodePropiedad = true" />
                            </div>
                        </div>
                    </div>
                    <div class="col-12 xl:col-6">
                        <div class="surface-card shadow-2 border-round px-3 pb-3 pt-0">
                            <div class="text-xl text-700 font-bold  border-bottom-1 surface-border text-center py-2">
                                ESTADO PROPIEDAD
                            </div>
                            <DataTable :value="listaEstadoPropiedad" tableStyle="min-width: 25rem" scrollable
                                scrollHeight="400px">
                                <Column field="id" header="ID" sortable style="width: 5%"></Column>
                                <Column field="estado_venta_prop" header="NOMBRE" sortable style="width:5%"></Column>
                                <Column header="Acciones" style="width: 10%">
                                    <template #body="slotProps">
                                        <div class="button-container">
                                            <Button icon="pi pi-pencil" @click="editarEstadoProp(slotProps.data)"
                                                class="p-button-rounded mr-2 p-button-info" text></Button>
                                            <Button icon="pi pi-trash" @click="confirmarEliminarTP(slotProps.data)"
                                                class="p-button-rounded p-button-danger" text></Button>
                                        </div>
                                    </template>
                                </Column>
                            </DataTable>
                            <div class="flex justify-content-between pt-3 gap-2">
                                <IconField iconPosition="left">
                                    <InputIcon class="pi pi-search"> </InputIcon>
                                    <InputText placeholder="Buscar" v-model="filtroBusquedaTP"
                                        class="w-full surface-100 font-light text-xl" />
                                </IconField>
                                <Button label="Nuevo registro" severity="primary" icon="pi pi-plus" class="w-6" outlined
                                    @click="tipodePropiedad = true" />
                            </div>
                        </div>
                    </div>
                </template>

                <template v-if="visibleRegistrados">
                    <div class="col-12 xl:col-6">
                        <div class="surface-card shadow-2 border-round p-4">
                            <div class="text-xl text-900 font-medium mb-2">Vendedores</div>
                            <ul class="list-none p-0 m-0">
                                <template v-for="item in listavendedor">
                                    <li
                                        class="flex flex-row md:align-items-center md:justify-content-between gap-2 py-3 border-bottom-1 surface-border justify-content-between">
                                        <div class="flex flex-row ">
                                            <img src="https://cdn-icons-png.flaticon.com/512/56/56863.png"
                                                class="mr-3 hidden md:block lg:block"
                                                style="width: 45px; height: 45px;">
                                            <div><span class="block text-900 font-medium mb-1">{{ item.nombre_cli
                                                    }}</span>
                                                <div class="text-600">{{ item.correo_cli }}</div>
                                            </div>
                                        </div>

                                        <ToggleButton v-model="checkedVd" onLabel=" " offLabel=" " onIcon="pi pi-eye"
                                            offIcon="pi pi-eye-slash" class="w-3rem " aria-label="Do you confirm"
                                            @click="verVendedor(item)" />

                                    </li>
                                </template>
                            </ul>
                            <div class="flex justify-content-between pt-3 gap-2">

                                <Button label="Compartir enlace" severity="help" icon="pi pi-share-alt" class="w-6"
                                    outlined @click="abrirOver" />
                                <Button label="Nuevo registro" severity="primary" icon="pi pi-plus" class="w-6"
                                    outlined />
                            </div>
                        </div>
                    </div>
                    <div class="col-12 xl:col-6">
                        <div class="surface-card shadow-2 border-round p-4">
                            <div class="flex justify-content-between align-items-center mb-2"><span
                                    class="text-xl text-900 font-medium">Trabajadores</span>
                            </div>
                            <ul class="list-none p-0 m-0">
                                <template v-for="item in listatrabajador">
                                    <li
                                        class="flex flex-row md:align-items-center md:justify-content-between gap-2 py-3 border-bottom-1 surface-border justify-content-between">
                                        <div class="flex">
                                            <img src="https://www.shutterstock.com/image-vector/man-silhouette-profile-picture-vector-260nw-221431054.jpg"
                                                class="mr-3 hidden md:block lg:block"
                                                style="width: 45px; height: 45px;">
                                            <div><span class="block text-900 font-medium mb-1">{{ item.nombre_cli
                                                    }}</span>
                                                <div class="text-600">{{ item.correo_cli }}</div>
                                            </div>
                                        </div>
                                        <div class="mt-2 md:mt-0 flex flex-nowrap">
                                            <ToggleButton v-model="checked" onLabel=" " offLabel=" " onIcon="pi pi-eye"
                                                offIcon="pi pi-eye-slash" class="w-3rem" aria-label="Do you confirm"
                                                @click="verVendedor(item)" />
                                        </div>
                                    </li>
                                </template>



                            </ul>
                            <div class="flex justify-content-between pt-3 gap-2">

                                <Button label="Compartir enlace" severity="help" icon="pi pi-share-alt" class="w-6"
                                    outlined @click="abrirOver" />
                                <Button label="Nuevo registro" severity="primary" icon="pi pi-plus" class="w-6"
                                    outlined />
                            </div>
                        </div>
                    </div>
                </template>

                <div class="col-12 lg:col-12 xl:col-12">
                   <Iconos/>
                </div>

            </div>
        </div>
    </div>
    <Dialog v-model:visible="visible" modal :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" class="m-0 p-0 ">
        <template #header>
            <h2 class="bg-gray-100 text-900 font-bold block border-bottom-1 surface-border p-3 text-3xl w-full ">
                Información
                completa</h2>
        </template>


        <div class="grid ">
            <div class="col-12 md:col-6 p-3">
                <div class="text-500 font-medium mb-2">Nombre</div>
                <div class="text-900">
                    <input type="text" v-model="nombre_cli" class=" bg-white " disabled
                        style="border:1px solid transparent" />
                </div>
            </div>
            <div class="col-12 md:col-6 p-3">
                <div class="text-500 font-medium mb-2">Email</div>
                <div class="text-900"><input type="text" v-model="correo_cli" class=" bg-white " disabled
                        style="border:1px solid transparent" /></div>
            </div>
            <div class="col-12 md:col-6 p-3">
                <div class="text-500 font-medium mb-2">Teléfono</div>
                <div class="text-900"> <input type="text" v-model="telefono_cli" class=" bg-white " disabled
                        style="border:1px solid transparent" /></div>
            </div>
            <div class="col-12 md:col-6 p-3">
                <div class="text-500 font-medium mb-2">Nro Documento</div>
                <div class="text-900"><input type="text" v-model="nrodoc_cli" class=" bg-white " disabled
                        style="border:1px solid transparent" /></div>
            </div>
            <div class="col-12 p-3">
                <div class="text-500 font-medium mb-2">Descripción</div>
                <div class="text-900 line-height-3"> 
                    <Textarea v-model="descripcion_cli" variant="filled" rows="5" cols="30"
                    class="w-full" />
                </div>
            </div>
            <div class="col-12 p-3">
                <div class="text-500 font-medium mb-3">Credenciales</div>
                <template v-for="rol in listaRol">
                    <div
                        class="flex md:align-items-center md:justify-content-between border-top-1 surface-border p-3 flex-column md:flex-row ">
                        <div class="flex align-items-center font-medium">Usuario</div>
                        <span class=" w-12rem"> {{ rol.user }}</span>
                    </div>
                    <div
                        class="flex md:align-items-center md:justify-content-between border-top-1 surface-border p-3 flex-column md:flex-row">
                        <div class="flex align-items-center font-medium">Contraseña</div>
                        <span class=" w-12rem"> #########</span>
                    </div>
                </template>
                <div
                    class="flex md:align-items-center md:justify-content-between border-top-1 surface-border p-3 flex-column md:flex-row">
                    <div class="flex align-items-center font-medium">Estado</div>
                    <span class=" w-12rem"> HABILITADO</span>
                </div>
            </div>
        </div>
        <div class="flex pt-2 justify-content-end gap-1">
            <Button label="Cancelar" icon="pi pi-times" severity="danger" raised @click="cancelarOperacion()" />
            <Button label="Habilitar" icon="pi pi-pencil" severity="secondary" @click="limpiarcampos()" />
            <Button label="Guardar" icon="pi pi-save" raised @click="confirmarE(data)" />
        </div>



    </Dialog>

    <Dialog v-model:visible="tipodePropiedad" modal :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" class="m-0 p-0">
        <template #header>
            <h2 class="bg-gray-100 text-800 font-bold block border-bottom-1 surface-border p-3 text-3xl w-full m-0">
                PROPIEDADES</h2>
        </template>
        <template v-if="mostrarTipoProp">
            <div class="grid py-4">
                <div class="col-12 lg:col-6 lg:mb-0">
                    <FloatLabel>
                        <InputText type="text" v-model="id" disabled class="w-full" />
                        <label for="ID">ID</label>
                    </FloatLabel>
                </div>

                <div class="col-12 lg:col-6 lg:mb-0">
                    <FloatLabel>
                        <InputText type="text" v-model="titulo" class="w-full" />
                        <label for="Nombre">Nombre</label>
                    </FloatLabel>
                </div>
                <InputText type="text" v-model="categoria" hidden />
            </div>
            <div class="flex pt-2 justify-content-end gap-1">
                <Button label="Cancelar" icon="pi pi-times" severity="danger" raised @click="cancelarTipoProp" />
                <Button label="Limpiar" icon="pi pi-refresh" severity="secondary" @click="limpiarcampos()" />
                <Button label="Guardar" icon="pi pi-save" raised @click="guardarTP()" />
            </div>
        </template>
        <template v-if="mostrarEstadoProp">
            <div class="grid py-4">
                <div class="col-12 lg:col-6 lg:mb-0">
                    <FloatLabel>
                        <InputText type="text" v-model="id" disabled class="w-full" />
                        <label for="ID">ID</label>
                    </FloatLabel>
                </div>

                <div class="col-12 lg:col-6 lg:mb-0">
                    <FloatLabel>
                        <InputText type="text" v-model="estado_venta_prop" class="w-full" />
                        <label for="Nombre">Nombre</label>
                    </FloatLabel>
                </div>
                <InputText type="text" v-model="categoria" hidden />
            </div>
            <div class="flex pt-2 justify-content-end gap-1">
                <Button label="Cancelar" icon="pi pi-times" severity="danger" raised @click="cancelarTipoProp" />
                <Button label="Limpiar" icon="pi pi-refresh" severity="secondary" @click="limpiarcampos()" />
                <Button label="Guardar" icon="pi pi-save" raised @click="guardarTP()" />
            </div>
        </template>
    </Dialog>



    <OverlayPanel ref="op">
        <div class="flex flex-column gap-3 w-25rem">
            <span class="font-medium text-900 block mb-2">Compartir enlace de registro de vendedores</span>
            <InputGroup>
                <InputText v-model="url" readonly class="w-23rem"></InputText>
                <InputGroupAddon class="p-0">
                    <Button icon="pi pi-copy" text @click="copyToClipboard" />
                </InputGroupAddon>
            </InputGroup>
        </div>
    </OverlayPanel>
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

import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import FloatLabel from 'primevue/floatlabel';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import Toast from 'primevue/toast';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
export default {
    setup() {
        const confirm = useConfirm();
        const toast = useToast();
        return { confirm, toast };
    },
    components: {
        InputGroup,
        InputGroupAddon,
        Toast,
        IconField,
        InputIcon,
        FloatLabel
    },
    data() {
        return {
            url: 'http://localhost:5173/#/registrocliente',

            mostrarImg: false,
            mostrarEstadoProp:false,
            checkedVd: false,
            checkedInmueble: false,
            visibleInmueble: false,
            visibleRegistrados: false,
            checkedMensaje: false,
            checkedRegistrados: false,
            checked: false,
            visible: false,
            tipodePropiedad: false,
            idPlano: '',
            op: '',
            filtroBusquedaTP: '',

            listaEstadoPropiedad: [],
            mostrarTipoProp:false,
            id: '',
            estado_venta_prop: '',
            clienteId: '',
            titulo: '',
            subtitulo: '',
            descripcion: '',
            listavendedor: [],
            totalVendedor: [],
            listatrabajador: [],
            totalTrabajador: [],
            totalPropiedades: [],
            totalTerrenos: [],
            totalTerrenosCli: [],
            totalRegistrosClientes: [],
            totalMensajes: [],
            listatipoPropiedades: [],
            listaRol: [],
            listaempresa: [],
            listatipoP: [],
            listaPlano: []
        };
    },
    methods: {
        async iniciarEmpresa() {
            try {
                const response = await fetch("http://localhost:8080/v1/empresas/");
                this.listaempresa = await response.json();
            } catch (error) {

            }
        },
        async iniciarMensajes() {
            try {
                const response = await fetch("http://localhost:8080/v1/pedidos/");
                const data = await response.json();
                this.totalMensajes = data.length;

            } catch (error) {

            }
        },
        async iniciarPropiedades() {
            try {
                const response = await fetch("http://localhost:8080/v1/propiedades/");
                const data = await response.json();
                this.totalPropiedades = data.length;
                const uniqueData = [];
                const seenEstados = new Set();

                data.forEach(item => {
                    if (!seenEstados.has(item.estado_venta_prop)) {
                        uniqueData.push({
                            ...item,
                            editing: false
                        });
                        seenEstados.add(item.estado_venta_prop);
                    }
                });

                this.listaEstadoPropiedad = uniqueData;
                const terreno = data.filter(item => item.categoria_prop === 'TERRENO');
                this.totalTerrenos = terreno.length;
                const propiedadCli = data.filter(item => item.categoria_prop !== 'TERRENO');
                this.totalTerrenosCli = propiedadCli.length;
            } catch (error) {

            }
        },
        async iniciarRegistrosClientes() {
            try {
                const response = await fetch("http://localhost:8080/v1/clientes/");
                const data = await response.json();
                this.totalRegistrosClientes = data.length;

            } catch (error) {

            }
        },
        //borrar
        async iniciarTipoPropiedades() {
            try {
                const response = await fetch("http://localhost:8080/v1/informacion/");
                const data = await response.json();
                this.listatipoPropiedades = this.listatipoP = data.filter(item => item.categoria === 'PROPIEDADES');
                this.listaPlano = data.filter(item => item.categoria === 'PLANO');
            } catch (error) {

            }
        },
        configInmueble() {
            this.visibleInmueble = !this.visibleInmueble;
        },
        configRegistrados() {
            this.visibleRegistrados = !this.visibleRegistrados;
        },
        verVendedor(datos) {
            // this.checked=true;
            this.visible = true;
            this.id = datos.id;
            this.correo_cli = datos.correo_cli;
            this.nombre_cli = datos.nombre_cli;
            this.telefono_cli = datos.telefono_cli;
            this.nrodoc_cli = datos.nrodoc_cli;
            this.descripcion_cli=datos.descripcion_cli;
            this.iniciarRol(this.id);
        },
        editarFilaTP(dato) {
            this.tipodePropiedad = true;
            this.mostrarTipoProp=true;
            this.id = dato.id;
            this.titulo = dato.titulo;
        },
        guardarTP() {
            var datosCategoria = {
                id: this.id,
                titulo: this.titulo,
                subtitulo: '-',
                descripcion: '-',
                categoria: 'PROPIEDADES',
                correlativo: '-'
            };
            var metodo = "POST";
            if (this.id != null || this.id != "") {
                datosCategoria.id = this.id
                metodo = "PUT";
            }
            fetch("http://localhost:8080/v1/informacion/", {
                method: metodo, // or 'PUT'
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify(datosCategoria),
            }).then((response) => response.json())
                .then((datosCategoria) => {
                    this.iniciarTipoPropiedades();
                    this.tipodePropiedad = false;
                })
                .catch((error) => {
                    console.error("Error:", error);
                    return;
                });
        },
        confirmarEliminarTP(idtemp) {
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
                    this.toast.add({ severity: 'error', summary: 'Cancelar', detail: 'You have rejected', life: 3000 });
                }
            });
        },
        async eliminarMenu(idtemp) {
            try {
                const response = await fetch("http://localhost:8080/v1/informacion/" + idtemp.id, {
                    method: "DELETE",
                })
                if (response.status === 200) {
                    this.listatipoPropiedades = this.listatipoP.filter(item => item.id !== idtemp.id);
                    this.id = null;
                    this.iniciarTipoPropiedades();
                }
            } catch (error) {

            }

        },
        buscarTipoPropiedad() {
            const dato = this.filtroBusquedaTP.toUpperCase();
            if (dato) {
                this.listatipoPropiedades = this.listatipoP.filter((item) =>
                    item.titulo.toUpperCase().includes(dato)
                )
            } else {
                this.listatipoPropiedades = [...this.listatipoP];
            }
        },
        handleFileUpload(event) {
            this.mostrarImg = true;
            const file = event.target.files[0];
            if (file) {
                this.convertToBase64(file);
            }
        },
        convertToBase64(file) {
            const reader = new FileReader();
            reader.onload = () => {
                this.descripcion = reader.result;
            };
            reader.readAsDataURL(file);
        },
        async iniciarVendedores() {
            try {
                const response = await fetch("http://localhost:8080/v1/clientes/rol");
                const data = await response.json();
                this.listavendedor = data.filter(item => item.nombre_rol === 'VENDEDOR');
                this.totalVendedor = this.listavendedor.length;
                this.listatrabajador = data.filter(item => item.nombre_rol === 'TRABAJADOR')
                this.totalTrabajador = this.listatrabajador.length;

            } catch (error) {

            }
        },
        async iniciarRol(td) {
            try {
                const response = await fetch("http://localhost:8080/v1/rol");
                const datos = await response.json();
                this.listaRol = datos.filter(item => item.clienteId === td);
            } catch (error) {

            }
        },
        cancelarTipoProp(){
            this.mostrarTipoProp=false;
            this.mostrarEstadoProp=false;
            this.tipodePropiedad= false;
        },
        cancelarOperacion() {
            this.visible = false;
            this.checked = false;
            this.checkedVd = false;
            this.plano = false;
        },
        abrirOver(event) {
            this.$refs.op.toggle(event);
        },
        copyToClipboard() {
            const texto = document.createElement('textarea');
            texto.value = this.url;
            document.body.appendChild(texto);
            texto.select();
            document.execCommand('copy');
            document.body.removeChild(texto);
            this.$toast.add({ severity: 'success', summary: 'Copiado', detail: 'URL copiada al portapapeles', life: 3000 });
        },
        guardarPlano() {
            var data = {
                id: this.id,
                titulo: this.titulo,
                subtitulo: this.subtitulo,
                descripcion: this.descripcion,
                categoria: 'PLANO',
                correlativo: '-',
                posicion: 1
            };
            var metodo = "POST";
            if (this.id != null || this.id != "") {
                data.id = this.id
                metodo = "PUT";
            }
            fetch("http://localhost:8080/v1/informacion/", {
                method: metodo, // or 'PUT'
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify(data),
            }).then((response) => response.json())
                .then((data) => {
                    this.iniciarTipoPropiedades();
                    this.plano = false;
                })
                .catch((error) => {
                    console.error("Error:", error);
                    return;
                });
        },
        editarEstadoProp(dato) {
            this.tipodePropiedad = true;
            this.mostrarEstadoProp= true;
            this.id = dato.id;
            this.estado_venta_prop = dato.estado_venta_prop;

        },
        limpiarcampos() {
            this.id = '';
            this.titulo = '';
            this.subtitulo = '';
            this.descripcion = '';
        }
    },
    watch: {
        filtroBusquedaTP() {
            this.buscarTipoPropiedad();
        }
    },
    created() {
        this.iniciarVendedores();
        this.iniciarEmpresa();
        this.iniciarPropiedades();
        this.iniciarRegistrosClientes();
        this.iniciarMensajes();
        this.iniciarTipoPropiedades();
    }
}
</script>