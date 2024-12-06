import { toRefs, reactive, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
const layoutConfig = reactive({
    ripple: false,
    darkTheme: false,
    inputStyle: 'outlined',
    menuMode: 'static',
    theme: 'lara-light-indigo',
    scale: 14,
    activeMenuItem: null
});

const layoutState = reactive({
    staticMenuDesktopInactive: false,
    overlayMenuActive: false,
    profileSidebarVisible: false,
    configSidebarVisible: false,
    staticMenuMobileActive: false,
    menuHoverActive: false
});

export function useLayout() {
    const route = useRoute();

    onMounted(() => {
        //al recargar
        if (route.path.includes('/vistapropiedad')) {
            layoutState.staticMenuDesktopInactive = true;
        }
        if (route.path.includes('/listacompra')) {
            layoutState.staticMenuDesktopInactive = true;
        }
    });
    
    watch(() => route.path, (newPath) => {
        //para visualizar
        if (newPath.includes('/vistapropiedad')) {
            if (!layoutState.staticMenuDesktopInactive) {
                onMenuToggle();
            }
        } else {
            if (newPath.includes('/listacompra')) {
                if (!layoutState.staticMenuDesktopInactive) {
                    onMenuToggle();
                }
            } else {
                if (layoutState.staticMenuDesktopInactive) {
                    onMenuToggle();
                }
            }
        }
    });

    const changeThemeSettings = (theme, darkTheme) => {
        layoutConfig.darkTheme = darkTheme;
        layoutConfig.theme = theme;
    };

    const setScale = (scale) => {
        layoutConfig.scale = scale;
    };

    const setActiveMenuItem = (item) => {
        layoutConfig.activeMenuItem = item.value || item;
    };

    const onMenuToggle = () => {
       
        if (layoutConfig.menuMode === 'overlay') {
            layoutState.overlayMenuActive = !layoutState.overlayMenuActive;
        }

        if (window.innerWidth > 991) {
            layoutState.staticMenuDesktopInactive = !layoutState.staticMenuDesktopInactive;
        } else {
            layoutState.staticMenuMobileActive = !layoutState.staticMenuMobileActive;
        }
    };

    const isSidebarActive = computed(() => layoutState.overlayMenuActive || layoutState.staticMenuMobileActive);

    const isDarkTheme = computed(() => layoutConfig.darkTheme);

    return { layoutConfig: toRefs(layoutConfig), layoutState: toRefs(layoutState), changeThemeSettings, setScale, onMenuToggle, isSidebarActive, isDarkTheme, setActiveMenuItem };
}
