<template>
    <div class="col-12 lg:col-12 md:col-12 p-0 bg-cover bg-no-repeat"
        style="background-image: url('https://cdn.www.gob.pe/uploads/document/file/6647321/989011-fontis-de-palacio-con-colores-patrios.jfif'); height: 100vh;">
        <div class="flex justify-content-center align-items-center px-4" style="height: 100%;">
            <div class="surface-card shadow-5 border-round-xl flex w-full lg:w-8 overflow-hidden"
                style="border-radius: 20px; box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.2);">
                
                <!-- Sección Izquierda -->
                <div class="w-full lg:w-6 text-left p-6"
                    :class="isAdminView ? 'bg-primary text-white' : 'bg-white'">
                    <img v-if="!isAdminView" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Escudo_de_Chiclayo.PNG/544px-Escudo_de_Chiclayo.PNG" 
                        alt="Escudo de Chiclayo" class="mb-4" style="width: 80px; height: auto;">
                    
                    <div class="text-4xl font-bold mb-5" :class="isAdminView ? 'text-white' : 'text-primary'">
                        {{ isAdminView ? 'Bienvenido Administrador' : 'Bienvenido Ciudadano' }}
                    </div>

                    <div class="mb-4">
                        <label for="email1" class="block text-xl font-semibold mb-2"
                            :class="isAdminView ? 'text-white' : 'text-gray-700'">Correo Electrónico</label>
                        <div class="flex gap-3">
                             
                            <InputText v-model="user" type="text" placeholder="Ingresa tu correo" @keyup.enter="login"
                                class="w-full p-inputtext-lg border-round-md mb-3"
                                :class="errorUsu ? 'border-red-500' : ''" />
                        </div>
                        <small v-if="errorUsu" class="text-red-500 block ml-1 mb-3">{{ errorUsu }}</small>
                    </div>

                    <div class="mb-4">
                        <label for="password1" class="block text-xl font-semibold mb-2"
                            :class="isAdminView ? 'text-white' : 'text-gray-700'">Contraseña</label>
                        <Password v-model="clave" toggleMask @keyup.enter="login" placeholder="Ingresa tu contraseña"
                            class="w-full p-inputtext-lg border-round-md mb-3 p-fluid" style="font-size: 1rem;"
                            :class="errorPass ? 'custom-password' : ''" />
                        <small v-if="errorPass" class="text-red-500 block ml-1 mb-3">{{ errorPass }}</small>
                    </div>
                    <a href="#" class="text-sm mb-4 inline-block hover:underline"
                        :class="isAdminView ? 'text-white' : 'text-blue-600'">Registrate</a>
                    <a href="#" class="text-sm mb-4 inline-block hover:underline"
                        :class="isAdminView ? 'text-white' : 'text-blue-600'">¿Olvidaste tu contraseña?</a>
                    <Button label="Iniciar Sesión" icon="pi pi-sign-in"
                        class="w-full p-button-lg p-button-primary border-round-md mt-4" @click="login" />
                </div>

                <!-- Sección Derecha -->
                <div class="w-full lg:w-6 flex justify-content-center align-items-center"
                    :class="isAdminView ? 'bg-blue-500 text-white' : 'bg-yellow-500'">
                    
                    <div class="text-center p-5">
                        <div class="text-4xl font-bold mb-4" :class="isAdminView ? 'text-white' : 'text-white'">
                            
                            {{ isAdminView ? 'Acceso Usuario' : 'Acceso Administrativo'  }}
                        </div>
                        
                        <p class="mb-6 text-md"
                            :class="isAdminView ? 'text-white' : 'text-white'">
                            {{ isAdminView
                                ? 'Si eres ciudadano, utiliza tu acceso para autogestionar tu reserva.'
                                : 'Si eres administrador, utiliza tu acceso personalizado para ingresar a la plataforma.'
                            }}
                        </p>
                        <Button label="Ingresar Aquí" class="p-button-rounded p-button-outlined p-button-lg hover:bg-white hover:text-yellow-600"
                            style="border-color: #ffffff; color: #ffffff; transition: all 0.3s ease-in-out;" @click="toggleAdminView" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
:deep(.custom-password .p-password-input) {
    border-color: #ff0000 !important;
}

.bg-cover {
    background-size: cover;
    background-position: center;
}

.bg-primary {
    background-color: #007bff !important;
}

.bg-blue-500 {
    background-color: #0056b3 !important;
}

.bg-yellow-500 {
    background-color: #ffc107 !important;
}

.text-white {
    color: #ffffff !important;
}

.text-primary {
    color: #007bff !important;
}
</style>



<script>
import Dashboard from './Dashboard.vue'
import {API_CONFIG} from '../service/config';
export default {
    data() {
        return {
            user: '',
            clave: '',
            errorUsu: '',
            errorPass:'',
            isAdminView: false, // Estado para controlar el diseño dinámico
        }
    },
    methods: {
        toggleAdminView() {
            this.isAdminView = !this.isAdminView;
        },
        login() {
            var data = {
                user: this.user,
                clave: this.clave
            };
            var metodo = "POST";
            fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.PERSONA}`, {
                method: metodo, // or 'PUT'
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify(data),
            }).then((response) => response.json())
                .then((data) => {

                    if (data.codigo == 200) {
                        let token = data.token;
                        sessionStorage.setItem('user_token', data.token);
                        var datadecode = atob(token)
                        var datos = datadecode.split("!=!");
                        var userCargo = '';
                        datos.forEach(element => {
                            var datovalor = element.split("=");
                            sessionStorage.setItem('user_' + datovalor[0], datovalor[1]);
                            if (datovalor[0] === 'rol') {
                                userCargo = datovalor[1];
                            }
                        });
                        if (userCargo === 'Administrador' || userCargo === 'Operador') {
                            window.location.href = '#/dashboard/perfil';
                        } else {
                            window.location.href = '#/dashboard';
                        }

                    } else {
                        if (data.codigo === 400 && data.mensaje === 'UsuarioNulo') {
                            this.errorUsu = "El usuario no existe"
                        } else {
                            if (data.codigo === 400 && data.mensaje === 'ClaveErronea') {
                                this.errorPass = "Contraseña incorrecta"
                            }
                        }
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                    return;
                });
        }
    }
}
</script>