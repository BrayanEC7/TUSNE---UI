<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useLayout } from '@/layout/composables/layout';
import { useRouter } from 'vue-router';

const menu = ref();
const menuUsuario = ref();
const items = ref([
    {
        label: 'Empresa sol'

    },
    {
        label: 'Export'
    }

]);
const valoresUser = ref([

    {
        label: 'Mi perfil',
        icon: 'pi pi-user',
        command: () => {
            router.push('./perfil');
        }
    },
    {
        label: 'Salir',
        icon: 'pi pi-sign-out',
        command: () => {
            sessionStorage.removeItem("user_id");
            sessionStorage.removeItem("user_password");
            sessionStorage.removeItem("user_fechayhora");
            sessionStorage.removeItem("user_persona");
            sessionStorage.removeItem("user_usuario");
            sessionStorage.removeItem("user_rol");
            sessionStorage.removeItem("user_token");
            router.push("../")
        }
    }


])
const { layoutConfig, onMenuToggle } = useLayout();

const outsideClickListener = ref(null);
const topbarMenuActive = ref(false);
const router = useRouter();

const toggle = (event) => {
    menu.value.toggle(event);
};
const toggleUsuario = (event) => {
    menuUsuario.value.toggle(event)
}
onMounted(() => {
    bindOutsideClickListener();
});

onBeforeUnmount(() => {
    unbindOutsideClickListener();
});


const onTopBarMenuButton = () => {
    topbarMenuActive.value = !topbarMenuActive.value;

};
const cargoAdmin = () => {
    router.push('/documentation');
}
const mostrarDashboard = () => {
    router.push('./');
}
const onCalendarioClick = () => {
    const url = './demo/ManualdeUsuario.pdf';  
      window.open(url, '_blank');
};

const manualVendedor = () => {
    const url = './demo/ManualdeUsuario.pdf';  
      window.open(url, '_blank');
}


const topbarMenuClasses = computed(() => {
    return {
        'layout-topbar-menu-mobile-active': topbarMenuActive.value
    };
});

const bindOutsideClickListener = () => {
    if (!outsideClickListener.value) {
        outsideClickListener.value = (event) => {
            if (isOutsideClicked(event)) {
                topbarMenuActive.value = false;
            }
        };
        document.addEventListener('click', outsideClickListener.value);
    }
};
const unbindOutsideClickListener = () => {
    if (outsideClickListener.value) {
        document.removeEventListener('click', outsideClickListener);
        outsideClickListener.value = null;
    }
};
const isOutsideClicked = (event) => {
    if (!topbarMenuActive.value) return;

    const sidebarEl = document.querySelector('.layout-topbar-menu');
    const topbarEl = document.querySelector('.layout-topbar-menu-button');

    return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target));
};
const usuarioNombre = sessionStorage.getItem("user_persona");
const rol = sessionStorage.getItem("user_rol")
</script>

<template>
    <div class="layout-topbar">


        <button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle()">
            <i class="pi pi-bars"></i>
        </button>

        <button class="p-link layout-topbar-menu-button layout-topbar-button" @click="onTopBarMenuButton()">
            <i class="pi pi-ellipsis-v"></i>
        </button>

        <div class="layout-topbar-menu" :class="topbarMenuClasses">
            <template v-if="rol === 'Operador' || rol === 'Administrador'">

                <button @click="mostrarDashboard()" class="p-link layout-topbar-button" v-tooltip.bottom="{
            value: 'Dashboard', pt: { arrow: { style: { borderBottomColor: 'var(--primary-color)' } }, text: 'bg-primary font-medium' }
        }">
                    <i class="pi pi-th-large"></i>
                    <span>Dashboard</span>
                </button>
                <button @click="onCalendarioClick()" class="p-link layout-topbar-button" v-tooltip.bottom="{
            value: 'Manual de Usuario', pt: { arrow: { style: { borderBottomColor: 'var(--primary-color)' } }, text: 'bg-primary font-medium' }
        }">
                    <i class="pi pi-file"></i>
                    <span>Manual Usuario</span>
                </button>
                <button class="p-link layout-topbar-button lg:border-1 lg:surface-border md:border-0" v-tooltip.bottom="{
            value: usuarioNombre, pt: { arrow: { style: { borderBottomColor: 'var(--primary-color)' } }, text: 'bg-primary font-medium' }
        }" @click="toggleUsuario" aria-haspopup="true" aria-controls="overlay_menuUsuario">
                    <i class="pi pi-user"></i>
                    <span>Usuario</span>
                </button>
            </template>
            <template v-else>
                <button @click="manualVendedor()" class="p-link layout-topbar-button" v-tooltip.bottom="{
            value: 'Requisitos de sistema', pt: { arrow: { style: { borderBottomColor: 'var(--primary-color)' } }, text: 'bg-primary font-medium' }
        }">
                    <i class="pi pi-file"></i>
                    <span>Manual Usuario</span>
                </button>
                <button class="p-link layout-topbar-button border-1 surface-border" v-tooltip.bottom="{
            value: usuarioNombre, pt: { arrow: { style: { borderBottomColor: 'var(--primary-color)' } }, text: 'bg-primary font-medium' }
        }" @click="toggleUsuario" aria-haspopup="true" aria-controls="overlay_menuUsuario">
                    <i class="pi pi-user"></i>
                    <span>Usuario</span>
                </button>
            </template>

        </div>
    </div>
    <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" class="p-0">
        <template #start>
            <span class="flex align-items-center justify-content-center py-2 bg-gray-200">
                <span class="text-md font-bold text-800">NOTIFICACIONES</span>
            </span>
        </template>

        <template #item="{ item }">
            <div class="flex align-items-center justify-content-between p-2 border-bottom-1 surface-border">
                <span>{{ item.label }}</span>
                <div class=""><span class="pi pi-check" style="font-size: 10px" /><span class="pi pi-check"
                        style="font-size: 10px" /></div>
            </div>
        </template>
    </Menu>
    <Menu ref="menuUsuario" id="overlay_menuUsuario" :model="valoresUser" :popup="true" class="p-0 " />
</template>

<style lang="scss" scoped></style>
