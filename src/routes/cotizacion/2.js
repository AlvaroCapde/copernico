// COBERTURA POR PERJUICIO GENERADO POR SUSPENSIÓN O PERDIDA TEMPORAL
//
// FORMULA PARA CALCULAR PRIMA:
//
//     IDD = INGRESO DIARIO DECLARADO (factor variable)
// DPS = DURACIÓN PROMEDIO DE LA SUSPENSIÓN (4)
// R = TASA DE RIESGO (7% … 0.07) (doblar 0.15)
// F= FACTOR DE AJUSTE POR PARTICULARIDADES DEPENDE DE DIVERSOS FACTORES:
//
//     FORMULA:  P = IDD X DPS X R X F

import {writable} from "svelte/store";

const ingresoDiarioDeclarado = writable( {
    formType: 'Ingresos',
    inputs: [
        {
            type: 'number',
            name: 'ingresoMensualDeclarado',
            label: 'Ingreso Mensual Declarado',
            placeholder: '$10,000',
            required: true,
            layout: {
                write: {
                    containerClass: 'col-span-4'
                }
            }
        },
        {
            type: 'number',
            name: 'numeroSeguidores',
            label: 'Numero de seguidores en la cuenta',
            placeholder: '10,000',
            required: true,
            moreInfo: 'Valor de la cuenta en MXN',
            layout: {
                write: {
                    containerClass: 'col-span-4'
                }
            }
        },
    ]
})

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
                        // Factores según la cobertura 1, 2, y 3
                        value: {
                            name: 'Personal / Familiar',
                            "1": 0.00,
                            "2": 0.00,
                            "3": 0.00
                        }
                    },
                    {
                        label: 'Educativo / Cultural',
                        value: {
                            name: 'Educativo / Cultural',
                            "1": 0.05,
                            "2": 0.04,
                            "3": 0.03
                        }
                    },
                    {
                        label: 'Entretenimiento / Deportes / Lifestyle',
                        value: {
                            name: 'Entretenimiento / Deportes / Lifestyle',
                            "1": 0.05,
                            "2": 0.05,
                            "3": 0.05
                        }
                    },
                    {
                        label: 'Humor / Memes / Reacciones',
                        value: {
                            name: 'Humor / Memes / Reacciones',
                            "1": 0.07,
                            "2": 0.08,
                            "3": 0.08
                        }
                    },
                    {
                        label: 'Finanzas / Criptomonedas / Negocios',
                        value: {
                            name:  'Finanzas / Criptomonedas / Negocios',
                            "1": 0.10,
                            "2": 0.10,
                            "3": 0.12
                        }
                    },
                    {
                        label: 'Opiniones Polémicas / Conspiraciones',
                        value: {
                            name:   'Opiniones Polémicas / Conspiraciones',
                            "1": 0.12,
                            "2": 0.13,
                            "3": 0.15
                        }
                    },
                    {
                        label: 'Noticias / Activismo / Política',
                        value: {
                            name: 'Noticias / Activismo / Política',
                            "1": 0.15,
                            "2": 0.15,
                            "3": 0.18
                        }
                    },
                    {
                        label: 'Contenido adulto / Apuestas / Violencia',
                        value: {
                            name: 'Contenido adulto / Apuestas / Violencia',
                            "1": 0.20,
                            "2": 0.20,
                            "3": 0.20
                        }
                    }
                ]
            }
        }
    ]
})


export default [ingresoDiarioDeclarado, factorDeAjuste]