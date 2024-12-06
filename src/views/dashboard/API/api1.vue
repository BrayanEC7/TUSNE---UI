<template>
    <div class="surface-section pb-5">
        <form @submit.prevent="consultarDNI">
            <div class="grid py-4 px-4">
                <div class="col-12 lg:col-6">
                    <FloatLabel>
                        <InputText type="text" v-model="dni" class="w-full" maxlength="8" placeholder="Ingresa DNI" />
                        <label for="dni">DNI</label>
                    </FloatLabel>
                </div>
                <div class="col-12 lg:col-6">
                    <Button label="Consultar" icon="pi pi-search" severity="primary" raised @click="consultarDNI"
                        class="w-full" />
                </div>
            </div>

            <Toast :autoHide="true" :position="topCenter" />
            <div v-if="datos">
                <div class="grid">
                    <div class="col-12 lg:col-6">
                        <FloatLabel>
                            <InputText type="text" v-model="datos.nombre_completo" class="w-full" readonly />
                            <label for="nombre_completo">Nombre Completo</label>
                        </FloatLabel>
                    </div>
                    <div class="col-12 lg:col-6">
                        <FloatLabel>
                            <InputText type="text" v-model="datos.nombres" class="w-full" readonly />
                            <label for="nombres">Nombres</label>
                        </FloatLabel>
                    </div>
                    <div class="col-12 lg:col-6">
                        <FloatLabel>
                            <InputText type="text" v-model="datos.apellido_paterno" class="w-full" readonly />
                            <label for="apellido_paterno">Apellido Paterno</label>
                        </FloatLabel>
                    </div>
                    <div class="col-12 lg:col-6">
                        <FloatLabel>
                            <InputText type="text" v-model="datos.apellido_materno" class="w-full" readonly />
                            <label for="apellido_materno">Apellido Materno</label>
                        </FloatLabel>
                    </div>
                    <div class="col-12 lg:col-6">
                        <FloatLabel>
                            <InputText type="text" v-model="datos.codigo_verificacion" class="w-full" readonly />
                            <label for="codigo_verificacion">Código Verificador</label>
                        </FloatLabel>
                    </div>
                </div>
            </div>
            <div class="flex pt-2 justify-content-end gap-1">
                <Button label="Cancelar" icon="pi pi-times" severity="danger" raised />
                <Button label="Limpiar" icon="pi pi-refresh" severity="secondary" @click="limpiarFormulario" />
                <Button label="Guardar" icon="pi pi-save" raised />
            </div>
        </form>
    </div>
</template>

<script>
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Toast from 'primevue/toast'; // Import Toast 1    

export default {
    components: {
        FloatLabel,
        InputText,
        Button,
        Toast,
    },
    data() {
        return {
            dni: '',
            datos: true,
            error: null,
        };
    },
    methods: {
        async consultarDNI() {
            this.error = true;
            if (this.dni.length !== 8) {
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'El DNI debe tener 8 dígitos.' });
                return;
            }

            try {
                const response = await fetch("https://apiperu.dev/api/dni", {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer eb948ee8e6834cdea73443001cfd436d408970e519193fef3213b35d941663bb'
                    },
                    body: JSON.stringify({ dni: this.dni })
                });

                const responseData = await response.json();

                if (responseData.success) {
                    this.datos = responseData.data;
                } else {
                    this.$toast.add({ severity: 'warn', summary: 'Sin resultados', detail: 'No se encontraron datos para el DNI ingresado.' });
                }
            } catch (err) {
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error al consultar la API.' });
                console.error(err);
            }
        },
        limpiarFormulario() {
            this.dni = '';
            this.datos = null;
            this.error = null;
        },
    },
};
</script>

<style>
.text-red-500 {
    color: red;
}
</style>