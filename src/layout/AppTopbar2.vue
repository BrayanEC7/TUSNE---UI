<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import { useLayout } from '@/layout/composables/layout';
import { useRouter } from 'vue-router';
import useEstadosComparar from '@/service/estadosComparar.js'
const {totalCount, loadCart} = useEstadosComparar();

const { layoutConfig, onMenuToggle } = useLayout();

const outsideClickListener = ref(null);
const topbarMenuActive = ref(false);
const router = useRouter();

onMounted(() => {
    bindOutsideClickListener();
    loadCart();
});

onBeforeUnmount(() => {
    unbindOutsideClickListener();
});
const menu = ref(null);
const cart = ref([]);
const cartItems = ref({});

const items = ref([
    {
        label: 'Mi Cuenta',
        icon: 'pi pi-refresh'
    },
    {
        label: 'Mis Compras',
        icon: 'pi pi-search'
    },
    {
        separator: true
    },
    {
        label: 'Salir',
        icon: 'pi pi-times'
    }
]);



const groupCartItems = () => {
    cartItems.value = {};
    cart.value.forEach(item => {
        if (cartItems.value[item.id]) {
            cartItems.value[item.id].quantity++;
        } else {
            cartItems.value[item.id] = { ...item, quantity: 1 };
        }
    });
};


/*const loadCart = () => {
  const storedCart = localStorage.getItem('evaluarPropiedad');
  if (storedCart) {
    cart.value = JSON.parse(storedCart);
    groupCartItems();
  }
};
const totalCount = computed(() => {
  let totalCount = 0;
  for (const key in cartItems.value) {
    if (cartItems.value.hasOwnProperty(key)) {
      totalCount += cartItems.value[key].quantity;
    }
  }
  return totalCount;
});*/



// Mirar cambios en el carrito y agrupar ítems cuando cambie
watch(cart, () => {
  groupCartItems();
});
/*
const totalCount = computed(() => {
  let total = 0;
  for (const item of cartItems.value) {
    total += item.quantity;
  }
  return total;
});
*/

const onTopBarMenuButton = () => {
    topbarMenuActive.value = !topbarMenuActive.value;
};

const mostrarComparacion=()=>{
    router.push('/compararinmuebles');
}

const toggle = (event) => {
    menu.value.toggle(event);
};

const onSettingsClick = () => {
    topbarMenuActive.value = false;
    router.push('/documentation');
};
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

            <button @click="mostrarComparacion()" class="p-link custom-iconTop" title="Comparar">
                <i v-badge.danger="totalCount" class="pi pi-chart-bar p-overlay-badge" style="font-size: 1.7rem"></i>
                <span class="notext">Comparar </span>
            </button>
            <!-- <button @click="onTopBarMenuButton()" class="p-link layout-topbar-button">
                <i class="pi pi-user" :model="items"></i>
                <span>Profile</span>
            </button>-->

           <!-- <button class="p-link custom-iconTop mr-2" @click="toggle">
                <i v-badge.danger="totalCount" class="pi pi-heart p-overlay-badge" style="font-size: 1.7rem"></i>
                <span class="notext">Favoritos</span>
            </button>-->
            <Menu ref="menu" id="config_menu" :model="items" popup />

        </div>

    </div>
</template>

<style lang="scss" scoped></style>
