import { createRouter, createWebHashHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            children: [
                {
                    path: '/',
                    name: 'login',
                    component: () => import('@/views/login.vue')
                }
            ]
        },
      
        {
            path: '/dashboard',
            component: AppLayout,
            children: [
                {
                    path: '/dashboard',
                    name: 'Dashboard',
                    component: () => import('@/views/dashboard.vue')
                },
                {
                    path: '/dashboard/API/Api1',
                    name: 'api1',
                    component: () => import('@/views/dashboard/API/api1.vue')
                },
                {
                    path: '/dashboard/API/Api2',
                    name: 'api2',
                    component: () => import('@/views/dashboard/API/api2.vue')
                },
                {
                    path: '/dashboard/perfil',
                    name: 'perfil',
                    component: () => import('@/views/dashboard/Perfil.vue')
                },
              
                {
                    path: '/dashboard/Menu',
                    name: 'Menu',
                    component: () => import('@/views/dashboard/Menu.vue')
                },
                {
                    path: '/dashboard/ambientes',
                    name: 'Ambientes',
                    component: () => import('@/views/dashboard/ambientes.vue')
                },
                {
                    path: '/dashboard/HistorialReservas',
                    name: 'HistorialReservas',
                    component: () => import('@/views/dashboard/HistorialReservas.vue')
                },
                {
                    path: '/dashboard/Rol',
                    name: 'rol',
                    component: () => import('@/views/dashboard/rol.vue')
                },
                {
                    path: '/dashboard/Usuario',
                    name: 'Usuario',
                    component: () => import('@/views/dashboard/Usuario.vue')
                },
                {
                    path: '/dashboard/Ciudadanos',
                    name: 'Ciudadanos',
                    component: () => import('@/views/dashboard/Ciudadanos.vue')
                },
                {
                    path: '/dashboard/NuevaReserva',
                    name: 'NuevaReserva',
                    component: () => import('@/views/dashboard/NuevaReserva.vue')
                },
                {
                    path: '/dashboard/Reportes',
                    name: 'reportes',
                    component: () => import('@/views/dashboard/Reportes.vue')
                },
                {
                    path: '/dashboard/Reservas',
                    name: 'reservas',
                    component: () => import('@/views/dashboard/reservas.vue')
                }
            ]
        }
       
    ]
});
router.beforeEach((to, from, next) => {
    const userCargo = sessionStorage.getItem('user_rol');
    const operadorRuta = ['/dashboard/perfil', '/dashboard/historialreservas', '/dashboard/nuevareserva','/dashboard/API/api1'];
    const workerRoutes = ['/menu'];
    const publicRoutes = ['/proyectos', '/nosotros', '/rol', '/timeline', '/', '/usuario', '/login', '/ciudadanos', '/registrocliente', '/compararinmuebles', '/precios', '/reservas','/menu'];
    if (publicRoutes.includes(to.path) || to.path.startsWith('/vistapropiedad')) {
        next();
    } else if (userCargo === 'Operador' && operadorRuta.includes(to.path)) {
        next();
    } else if (userCargo === 'Administrador' && to.path.startsWith('/dashboard')) {
        next();
    } else {
        next('/');
    }
});

export default router;
