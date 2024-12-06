<template>
    <div class="surface-section px-4 py-5 md:px-6 lg:px-5">
        <div class="line-height-3 text-xl text-800 px-3 border-round my-0 flex justify-content-between align-items-center">
            <div class="px-4 py-1 md:px-5 lg:px-1 surface-section">
                <div class="text-900 text-3xl font-bold mb-3">Mi Perfil</div>
                <span class="text-600 font-medium lg:font-light block -mt-3 uppercase text-sm">Información Personal </span>
            </div>
            <Button label="Editar" outlined severity="primary" @click="btnToggle" :disabled="!vistaEditar" />
        </div>
        <hr />
        <div class="grid">
            <div class="col-12 lg:col lg:px-4">
                <template v-if="vistaEditar">
                    <div v-for="dato in listaRol">
                        <div class="grid px-2 py-4">
                            <div class="line-height-3 text-xl text-900 mb-2 flex gap-3 col-12 lg:col-6 md:col-12">
                                <div class="text-center border-1 surface-border border-round lg:w-5rem md:w-4rem">
                                    <i class="pi pi-id-card text-2xl text-blue-500 pt-2 px-2 lg:pt-3 md:pt-2"></i>
                                </div>
                                <div>
                                    <div class="text-900 text-sm font-700 font-bold">N° DOCUMENTO</div>
                                    <span class="text-md font-light lg:text-2xl md:text-md">{{ dato.dniPers }}</span>
                                </div>
                            </div>
                            <div class="line-height-3 text-xl text-900 mb-2 flex gap-3 col-12 lg:col-6 md:col-12">
                                <div class="text-center border-1 surface-border border-round lg:w-5rem md:w-4rem">
                                    <i class="pi pi-exclamation-circle text-2xl text-blue-500 pt-2 px-2 lg:pt-3 md:pt-2"></i>
                                </div>
                                <div>
                                    <div class="text-900 text-sm font-700 font-bold">DENOMINACIÓN</div>
                                    <span class="text-md font-light lg:text-2xl md:text-md">{{ dato.denominacionPers }}</span>
                                </div>
                            </div>
                            <div class="line-height-3 text-xl text-900 mb-2 flex gap-3 col-12 lg:col-6 md:col-12">
                                <div class="text-center border-1 surface-border border-round lg:w-5rem md:w-4rem">
                                    <i class="pi pi-user text-2xl text-blue-500 pt-2 px-2 lg:pt-3 md:pt-2"></i>
                                </div>
                                <div>
                                    <div class="text-900 text-sm font-700 font-bold">NOMBRE</div>
                                    <span class="text-md font-light lg:text-2xl md:text-md">{{ dato.nombrePers }} {{ dato.apellido_patPers }} {{ dato.apellido_matPers }}</span>
                                </div>
                            </div>

                            <div class="line-height-3 text-xl text-900 mb-2 flex gap-3 col-12 lg:col-6 md:col-12">
                                <div class="text-center border-1 surface-border border-round lg:w-5rem md:w-4rem">
                                    <i class="pi pi-building text-2xl text-blue-500 pt-2 px-2 lg:pt-3 md:pt-2"></i>
                                </div>
                                <div>
                                    <div class="text-900 text-sm font-700 font-bold">RAZÓN SOCIAL</div>
                                    <span class="text-md font-light lg:text-2xl md:text-md">{{ dato.asociacionPers }}</span>
                                </div>
                            </div>

                            <div class="line-height-3 text-xl text-900 mb-2 flex gap-3 col-12 lg:col-6 md:col-12">
                                <div class="text-center border-1 surface-border border-round lg:w-5rem md:w-4rem">
                                    <i class="pi pi-phone text-2xl text-blue-500 pt-2 px-2 lg:pt-3 md:pt-2"></i>
                                </div>
                                <div>
                                    <div class="text-900 text-sm font-700 font-bold">TELEFONO</div>
                                    <span class="text-md font-light lg:text-2xl md:text-md">+51{{ dato.telefonoPers }}</span>
                                </div>
                            </div>

                            <div class="line-height-3 text-xl text-900 mb-2 flex gap-3 col-12 lg:col-6 md:col-12">
                                <div class="text-center border-1 surface-border border-round lg:w-5rem md:w-4rem">
                                    <i class="pi pi-briefcase text-2xl text-blue-500 pt-2 px-2 lg:pt-3 md:pt-2"></i>
                                </div>
                                <div>
                                    <div class="text-900 text-sm font-700 font-bold">CARGO</div>
                                    <span class="text-md font-light lg:text-2xl md:text-md">{{ dato.cargoPers }}</span>
                                </div>
                            </div>

                            <div class="line-height-3 text-xl text-900 mb-2 flex gap-3 col-12 lg:col-6 md:col-12">
                                <div class="text-center border-1 surface-border border-round lg:w-5rem md:w-4rem">
                                    <i class="pi pi-inbox text-2xl text-blue-500 pt-2 px-2 lg:pt-3 md:pt-2"></i>
                                </div>
                                <div>
                                    <div class="text-900 text-sm font-700 font-bold">E-MAIL</div>
                                    <span class="text-md font-light lg:text-2xl md:text-md">{{ dato.correoPers }}</span>
                                </div>
                            </div>

                            <div class="line-height-3 text-xl text-900 mb-2 flex gap-3 col-12 lg:col-6 md:col-12">
                                <div class="text-center border-1 surface-border border-round lg:w-5rem md:w-4rem">
                                    <i class="pi pi-lock text-2xl text-blue-500 pt-2 px-2 lg:pt-3 md:pt-2"></i>
                                </div>
                                <div>
                                    <div class="text-900 text-sm font-700 font-bold">CONTRASEÑA</div>
                                    <Password v-model="dato.clavePers" class="p-fluid w-full custom-monsalve" disabled />
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div class="grid pt-4">
                        <div class="col-12 lg:col-6 lg:mb-0">
                            <InputText type="text" v-model="id" class="w-full"  hidden/>
                            <InputText type="text" v-model="rolId" class="w-full" hidden/>
                            <div class="flex-auto">
                                <label for="Estado de Venta" class="font-bold block mb-2">DNI</label>
                                <InputText type="text" v-model="dniPers" class="w-full" disabled/>
                            </div>
                        </div>
                        <div class="col-12 lg:col-6 lg:mb-0">
                            <div class="flex-auto">
                                <label for="Estado de Venta" class="font-bold block mb-2">DENOMINACIÓN</label>
                                <InputText type="text" v-model="denominacionPers" class="w-full" />
                            </div>
                        </div>

                        <div class="col-12 lg:col-12 lg:mb-0">
                            <div class="flex-auto">
                                <label for="Estado de Venta" class="font-bold block mb-2">RAZÓN SOCIAL</label>
                                <InputText type="text" v-model="asociacionPers" class="w-full" />
                            </div>
                        </div>

                        <div class="col-12 lg:col-4 lg:mb-0">
                            <div class="flex-auto">
                                <label for="Estado de Venta" class="font-bold block mb-2">NOMBRES</label>
                                <InputText type="text" v-model="nombrePers" class="w-full" />
                            </div>
                        </div>
                        <div class="col-12 lg:col-4 lg:mb-0">
                            <div class="flex-auto">
                                <label for="Estado de Venta" class="font-bold block mb-2">APELLIDO PATERNO</label>
                                <InputText type="text" v-model="apellido_patPers" class="w-full" />
                            </div>
                        </div>
                        <div class="col-12 lg:col-4 lg:mb-0">
                            <div class="flex-auto">
                                <label for="Estado de Venta" class="font-bold block mb-2">APELLIDO MATERNO</label>
                                <InputText type="text" v-model="apellido_matPers" class="w-full" />
                            </div>
                        </div>
                        <div class="col-12 lg:col-6 lg:mb-0">
                            <div class="flex-auto">
                                <label for="Estado de Venta" class="font-bold block mb-2">TELÉFONO</label>
                                <InputText type="text" v-model="telefonoPers" class="w-full" />
                            </div>
                        </div>
                        <div class="col-12 lg:col-6 lg:mb-0">
                            <div class="flex-auto">
                                <label for="Estado de Venta" class="font-bold block mb-2">CARGO</label>
                                <InputText type="text" v-model="cargoPers" class="w-full" />
                            </div>
                        </div>
                        <div class="col-12 lg:col-6 lg:mb-0">
                            <div class="flex-auto">
                                <label for="Estado de Venta" class="font-bold block mb-2">EMAIL</label>
                                <InputText type="text" v-model="correoPers" class="w-full" />
                            </div>
                        </div>
                        <div class="col-12 lg:col-6 lg:mb-0">
                            <div class="flex-auto">
                                <label for="Estado de Venta" class="font-bold block mb-2">CONTRASEÑA</label>
                                <Password v-model="clavePers" class="p-fluid w-full" />
                            </div>
                        </div>

                        <div class="col-12 lg:col-12 md:col-12">
                            <div class="flex pt-4 justify-content-end gap-1">
                                <Button label="Cancelar" icon="pi pi-times" severity="danger" raised @click="vistaEditar = true" />
                                <Button label="Limpiar" icon="pi pi-refresh" severity="secondary" @click="limpiarcampos()" />
                                <Button label="Guardar" icon="pi pi-save" raised @click="guardardatos()" />
                            </div>
                        </div>
                    </div>
                </template>
            </div>
            <div class="col-12 lg:col-4 lg:border-left-1 surface-border">
                <div class="px-3">
    <a href="https://www.gob.pe/munichiclayo" target="_blank" class="no-underline">
        <div class="flex flex-column gap-3 mb-2">
            <div 
                class="w-full h-full p-5 border-round"
                style="background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), rgba(33, 150, 243, 0.8)"
            >
                <span class="text-white font-bold text-xl block mb-2">Municipalidad Provincial de Chiclayo</span>
                <span class="text-white-alpha-70 block line-height-3">
                    Representar al vecindario, promover la adecuada prestación de los servicios públicos locales, fomentar el bienestar de los vecinos y del desarrollo integral y armónico de las circunscripciones de su jurisdicción.
                </span>
            </div>
        </div>
    </a>

    <a href="https://virtualsatch.satch.gob.pe/virtualsatch/" target="_blank" class="no-underline">
        <div class="flex flex-column gap-3 mb-2">
            <div 
                class="w-full h-full p-5 border-round"
                style="background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), rgba(255, 235, 59, 0.8)"
            >
                <span class="text-white font-bold text-xl block mb-2">VirtualSATCH</span>
                <span class="text-white-alpha-70 block line-height-3">
                    El Servicio de Administración Tributaria de Chiclayo ha implementado la plataforma VirtualSATCH, la cual recopila todos los procesos en línea que puede manejar a través de nuestra plataforma.
                </span>
            </div>
        </div>
    </a>
</div>
</div>
        </div>
    </div>
</template>
<script>
import { API_CONFIG } from '../../service/config';
export default {
    data() {
        return {
            listaRol: [],
            obtenerUsu: [],
            id : '',
            rolId:'',
            nombrePers : '',
            dniPers : '',
            cargoPers : '',
            denominacionPers : '',
            asociacionPers : '',
            apellido_patPers : '',
            apellido_matPers : '',
            correoPers : '',
            telefonoPers : '',
            fecha_registroPers : '',
            fecha_actualizacionPers : '',
            clavePers : '',
            estadoPers : '',
            nombre_rol : '',
            vistaEditar: true,
            idUsu: ''
        };
    },
    methods: {
        usuario() {
            this.idUsu = sessionStorage.getItem('user_id');
        },
        async iniciarDatosUsuarios() {
            this.usuario();
            try {
                const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.CLIENTESCONROL}`);
                const data = await response.json();
                this.listaRol = data.filter((item) => item.id === this.idUsu);
                this.obtenerUsu = data.find((item) => item.id === this.idUsu);
            } catch (error) {}
        },
        btnToggle() {
            this.vistaEditar = false;
            if (this.obtenerUsu) {
                this.id = this.obtenerUsu.id;
                this.rolId = this.obtenerUsu.rolId;
                this.nombrePers = this.obtenerUsu.nombrePers;
                this.dniPers = this.obtenerUsu.dniPers;
                this.cargoPers = this.obtenerUsu.cargoPers;
                this.denominacionPers = this.obtenerUsu.denominacionPers;
                this.asociacionPers = this.obtenerUsu.asociacionPers;
                this.apellido_patPers = this.obtenerUsu.apellido_patPers;
                this.apellido_matPers = this.obtenerUsu.apellido_matPers;
                this.correoPers = this.obtenerUsu.correoPers;
                this.telefonoPers = this.obtenerUsu.telefonoPers;
                this.fecha_registroPers = this.obtenerUsu.fecha_registroPers;
                this.fecha_actualizacionPers = this.obtenerUsu.fecha_actualizacionPers;
                this.clavePers = this.obtenerUsu.clavePers;
                this.estadoPers = this.obtenerUsu.estadoPers;
                this.nombre_rol = this.obtenerUsu.nombrePers;
            }
        },
        guardardatos() {
            var data = {
                nombrePers: this.nombrePers,
                rolId: this.rolId,
                dniPers: this.dniPers,
                cargoPers: this.cargoPers,
                denominacionPers: this.denominacionPers,
                asociacionPers: this.asociacionPers,
                apellido_patPers: this.apellido_patPers,
                apellido_matPers: this.apellido_matPers,
                correoPers: this.correoPers,
                telefonoPers: this.telefonoPers,
                fecha_registroPers: this.fecha_registroPers,
                fecha_actualizacionPers: this.fecha_actualizacionPers,
                clavePers: this.clavePers,
                estadoPers: this.estadoPers
            };
            var metodo = 'POST';
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
                    this.iniciarDatosUsuarios();
                    this.vistaEditar = true;
                    this.limpiarcampos();
                })
                .catch((error) => {
                    console.error('Error:', error);
                    return;
                });
        },
        limpiarcampos() {
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
            this.fecha_registroPers = '';
            this.fecha_actualizacionPers = '';
            this.clavePers = '';
            this.estadoPers = '';
            this.nombre_rol = '';
        }
    },
    created() {
        this.iniciarDatosUsuarios();
    }
};
</script>
<style>
.custom-monsalve .p-inputtext {
    border: 0px solid white;
    color: black;
}
</style>