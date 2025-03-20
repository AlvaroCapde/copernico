import {writable} from "svelte/store";
import '../../lib/Forms/Types/SelectType/SelectType.js'
import '../../lib/Forms/Types/NumberType/NumberType.js'
//PÉRDIDA TOTAL DE LA CUENTA


const valorDeclarado = writable( {
    formType: 'Ingresos',
    inputs: [
        {
            type: 'number',
            name: 'numeroSeguidores',
            label: 'Numero de seguidores en la cuenta',
            placeholder: '10,000',
            required: true,
            moreInfo: 'Indica cuántos seguidores tiene tu cuenta actualmente',
            layout: {
                write: {
                    containerClass: 'col-span-4'
                }
            }
        },
        {
            type: 'number',
            name: 'ingresoMensualDeclarado',
            label: '¿Cuánto dinero genera tu cuenta al mes?',
            placeholder: '$10,000',
            moreInfo: 'Valor estimado',
            required: true,
            layout: {
                write: {
                    containerClass: 'col-span-4'
                }
            }
        },
    ]
    //NO PUEDE SER MAS DE 5000000
});
const factorDeAjuste = writable({
    formType: 'Historial',
    inputs: [
        {
            type: 'select',
            name: 'historialSuspension',
            label: 'Has sido suspendido en los ultimos 5 años?',
            placeholder: 'Selecciona una opción',
            required: true,
            layout: {
                write: {
                    containerClass: 'col-span-4'
                }
            },
            data: {
                options: [
                    { label: 'Nunca he perdido una cuenta', value: 0 },
                    { label: 'He sido suspendido 1 vez en los ultimos 5 años', value: 0.05 },
                    { label: 'He sido suspendido 2 veces en los ultimos 5 años', value: 0.1 },
                    { label: 'He sido suspendido 3 veces en los ultimos 5 años', value: 0.2 },
                ]
            }
        },
        {
            type: 'select',
            name: 'hackeo',
            label: 'Tu cuenta ha sido hackeada o comprometida antes?',
            placeholder: 'Selecciona una opción',
            required: true,
            layout: {
                write: {
                    containerClass: 'col-span-4'
                }
            },
            data: {
                options: [
                    { label: 'Nunca han intentado hackear mi cuenta', value: 0 },
                    { label: 'Hubo intentos de hackeo pero no lograron entrar', value: 0.05 },
                    { label: 'Fui hackeado pero recupere mi cuenta sin problemas', value: 0.1 },
                    { label: 'Fui hackeado y tuve dificultades para recuperar la cuenta', value: 0.15 },
                    { label: 'Perdi definitivamente una cuenta por hackeo en el pasado', value: 0.2},
                ]
            }
        },
        {
            type: 'select',
            name: 'frecuenciaReportes',
            label: '¿Recibes denuncias o reportes con frecuencia en tu cuenta?',
            placeholder: 'Selecciona una opción',
            required: true,
            layout: {
                write: {
                    containerClass: 'col-span-4'
                }
            },
            data: {
                options: [
                    { label: 'Nunca me han reportado', value: 0 },
                    { label: 'Algunas veces me han reportado, pero no afecta mi cuenta', value: 0.05 },
                    { label: 'Recibo reportes con frecuencia, pero no me han suspendido', value: 0.1 },
                    { label: 'Recibo reportes con frecuencia y ya me han suspendido antes', value: 0.2 }
                ]
            }
        },
        {
            type: 'select',
            name: 'tipoContenido',
            label: '¿Qué tipo de contenido publicas principalmente en tu cuenta?',
            placeholder: 'Selecciona una opción',
            required: true,
            layout: {
                write: {
                    containerClass: 'col-span-4'
                }
            },
            data: {
                options: [
                    {
                        label: 'Personal / Familiar',
                        value: {
                            "1": 0.00,
                            "2": 0.00,
                            "3": 0.00,
                        }
                    },
                    {
                        label: 'Educativo / Cultural',
                        value: {
                            "1": 0.05,
                            "2": 0.04,
                            "3": 0.03,
                        }
                    },
                    {
                        label: 'Entretenimiento / Deportes / Lifestyle',
                        value: {
                            "1": 0.05,
                            "2": 0.05,
                            "3": 0.05,
                        }
                    },
                    {
                        label: 'Humor / Memes / Reacciones',
                        value: {
                            "1": 0.07,
                            "2": 0.08,
                            "3": 0.08,
                        }
                    },
                    {
                        label: 'Finanzas / Criptomonedas / Negocios',
                        value: {
                            "1": 0.10,
                            "2": 0.10,
                            "3": 0.12,
                        }
                    },
                    {
                        label: 'Opiniones Polémicas / Conspiraciones',
                        value: {
                            "1": 0.12,
                            "2": 0.13,
                            "3": 0.15,
                        }
                    },
                    {
                        label: 'Noticias / Activismo / Política',
                        value: {
                            "1": 0.15,
                            "2": 0.15,
                            "3": 0.18,
                        }
                    },
                    {
                        label: 'Contenido adulto / Apuestas / Violencia',
                        value: {
                            "1": 0.20,
                            "2": 0.20,
                            "3": 0.20,
                        }
                    }
                ]
            }
        }
    ]
})


export default [valorDeclarado, factorDeAjuste]