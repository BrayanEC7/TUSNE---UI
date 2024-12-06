<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { API_CONFIG } from '../service/config';
export default {
    setup() {
        const route = useRoute();

        const isRouteActive = (menuHijo) => {
            return route.path === menuHijo.url;
        };

        return { isRouteActive };
    },
    data() {
        return {
            visible: false,
            menusOrganizados: [],
            nombre: '',
            nombrePadre: '',
            persona:'',
            rolPersona:''
        };
    },
    methods: {
        async iniciarCarga() {
            try {
                const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.MENUPADRE}`);
                const data = await response.json();

                this.rolPersona = sessionStorage.getItem("user_rol");
                this.persona=sessionStorage.getItem("user_persona");
                const clientRoutes = ['/dashboard/perfil', '/dashboard/historialreservas', '/dashboard/nuevareserva','/dashboard/API/api1'];
                if (this.rolPersona === 'Operador') {
                    this.menusOrganizados = data.filter(item => clientRoutes.includes(item.url));
                    this.visible = true;
                } else {
                    this.organizarMenus(data);
                    this.visible = false;
                }
            } catch (error) {

            }
        },
        organizarMenus(data) {
            const menuPadres = {};
            data.forEach(menu => {
                if (!menu.codigoPadre) {
                    menuPadres[menu.menu_idllave_pk] = { ...menu, hijos: [] };
                }
            });
            data.forEach(menu => {
                if (menu.codigoPadre && menuPadres[menu.codigoPadre]) {
                    menuPadres[menu.codigoPadre].hijos.push(menu);
                }
            });
            this.menusOrganizados = Object.values(menuPadres);
        }

    },
    created() {
        this.iniciarCarga();
    },
}
</script>

<template>
    <ul class="layout-menu">
        <div v-if="visible">
            <li class="layout-root-menuitem text-center">
                <div class="font-bold text-3xl pt-3 ">Sistema de Reservas</div>
                <div class="font-bold text-3xl py-2 ">TUSNE</div>
                <div class=""><Avatar icon="pi pi-user" class="mr-2" size="xlarge" shape="circle" /></div>
                <div class="font-medium text-2xl ">{{persona}}</div>
                <span class="font-light text-xl uppercase">{{rolPersona}}</span>
            </li>
            <br>
            <template v-for="menuPadre in menusOrganizados" :key="menuPadre.menu_idllave_pk">

                <li class="layout-root-menuitem">
                    <div class="layout-menuitem-root-texto text-lg" >
                        {{ menuPadre.nombre }}
                    </div>
                    <div v-if="menuPadre.codigoPadre != null">
                        <a :href="'#' + menuPadre.url" class="conhover" tabindex="0">
                            <div :class="{ 'active-route': isRouteActive(menuPadre) }">
                                <i :class="'pi ' + menuPadre.icono" class="layout-menuitem-icono"></i>
                                <span class="layout-menuitem-text"> {{ menuPadre.nombre }} </span>
                            </div>
                        </a>
                    </div>
                </li>
            </template>
          
        </div>
        <div v-else>
            <template v-for="menuPadre in menusOrganizados" :key="menuPadre.menu_idllave_pk">
                <li class="layout-root-menuitem">
                    <div class="layout-menuitem-root-texto">
                        {{ menuPadre.nombre }}
                    </div>
                    <template v-if="menuPadre.hijos && menuPadre.hijos.length">
                <li class="" v-for="menuHijo in menuPadre.hijos" :key="menuHijo.menu_idllave_pk">
                    <a :href="'#' + menuHijo.url" class="conhover" tabindex="0">
                        <div :class="{ 'active-route': isRouteActive(menuHijo) }">
                            <i :class="'pi ' + menuHijo.icono" class="layout-menuitem-icono"></i>
                            <span class="layout-menuitem-text"> {{ menuHijo.nombre }} </span>
                        </div>
                    </a>
                </li>

            </template>
            </li>
</template>
</div>
</ul>

</template>

<style lang="scss" scoped>
.active-route {
    color: #2196F3;
}

.conhover {
    display: flex;
    align-items: center;
    position: relative;
    outline: 0 none;
    color: var(--text-color);
    cursor: pointer;
    padding: 0.75rem 1rem;
    border-radius: 12px;
    transition: background-color 0.2s, box-shadow 0.2s;
}

.conhover:hover {
    display: flex;
    align-items: center;
    position: relative;
    outline: 0 none;
    background-color: #49505725;
    cursor: pointer;
    padding: 0.75rem 1rem;
    border-radius: 12px;
    transition: background-color 0.2s, box-shadow 0.2s;
}

.layout-menuitem-icono {
    margin-right: 0.5rem;
}

.layout-menuitem-root-texto {
    font-size: 0.857rem;
    text-transform: uppercase;
    font-weight: 700;
    color: var(--surface-900);
    margin: 0.75rem 0;
}
</style>
