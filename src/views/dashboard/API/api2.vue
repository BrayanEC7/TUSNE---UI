<template>
    <div class="surface-section pb-5">
        <form action="">
            <div class="grid py-4 px-4">
                <div class="col-12">
                    <div class="grid">
                        <div class="col-12 lg:col-6">
                            <FloatLabel>
                                <InputText type="text" v-model="var1" class="w-full" />
                                <label for="IMAGEN">NOMBRE EMPRESA</label>
                            </FloatLabel>
                        </div>

                        <div class="col-12 lg:col-6">
                            <FloatLabel>
                                <InputText type="text" v-model="var1" class="w-full" />
                                <label for="IMAGEN">NOMBRE EMPRESA</label>
                            </FloatLabel>
                        </div>

                        <div class="col-12 lg:col-6">
                            <FloatLabel>
                                <InputText type="text" v-model="var1" class="w-full" />
                                <label for="IMAGEN">RUC</label>
                            </FloatLabel>
                        </div>

                        <div class="col-12 lg:col-6 lg:mb-0">
                            <FloatLabel>
                                <InputText type="text" v-model="var1" class="w-full" />
                                <label for="TITULO">SITIO WEB</label>
                            </FloatLabel>
                        </div>
                        <div class="col-12 lg:col-6">
                            <FloatLabel>
                                <InputText type="text" v-model="var1" class="w-full" />
                                <label for="IMAGEN">RUC</label>
                            </FloatLabel>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex pt-2 justify-content-end gap-1">
                <Button label="Cancelar" icon="pi pi-times" severity="danger" raised  />
                <Button label="Limpiar" icon="pi pi-refresh" severity="secondary" />
                <Button label="Guardar" icon="pi pi-save" raised  />
            </div>
        </form>
    </div>
</template>
<script>
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import FloatLabel from 'primevue/floatlabel';

export default {
    data() {
        return {
            var1: ''
        };
    },
    components: {
        IconField,
        InputIcon,
        FloatLabel
    },
};
</script>
