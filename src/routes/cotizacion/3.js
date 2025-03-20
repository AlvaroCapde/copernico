// 3. RESPONSABILIDAD CIVIL POR DAÑOS A TERCEROS
//     FORMULA PARA CALCULAR PRIMA
// MCS = MONTO DE COBERTURA SOLICITADO (MÁXIMO 5 MILLONES)
// R = RIESGO DE DEMANDAS (2%) (doblar 4%)
// F= FACTOR DE AJUSTE POR PARTICULARIDADES DEPENDE DE DIVERSOS FACTORES:

import {writable} from "svelte/store";

const coberturaSolicitada = writable( {
    formType: 'Ingresos',
    inputs: [
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
                            "1": 0.00,
                            "2": 0.00,
                            "3": 0.00
                        }
                    },
                    {
                        label: 'Educativo / Cultural',
                        value: {
                            "1": 0.05,
                            "2": 0.04,
                            "3": 0.03
                        }
                    },
                    {
                        label: 'Entretenimiento / Deportes / Lifestyle',
                        value: {
                            "1": 0.05,
                            "2": 0.05,
                            "3": 0.05
                        }
                    },
                    {
                        label: 'Humor / Memes / Reacciones',
                        value: {
                            "1": 0.07,
                            "2": 0.08,
                            "3": 0.08
                        }
                    },
                    {
                        label: 'Finanzas / Criptomonedas / Negocios',
                        value: {
                            "1": 0.10,
                            "2": 0.10,
                            "3": 0.12
                        }
                    },
                    {
                        label: 'Opiniones Polémicas / Conspiraciones',
                        value: {
                            "1": 0.12,
                            "2": 0.13,
                            "3": 0.15
                        }
                    },
                    {
                        label: 'Noticias / Activismo / Política',
                        value: {
                            "1": 0.15,
                            "2": 0.15,
                            "3": 0.18
                        }
                    },
                    {
                        label: 'Contenido adulto / Apuestas / Violencia',
                        value: {
                            "1": 0.20,
                            "2": 0.20,
                            "3": 0.20
                        }
                    }
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
                    { label: '️Algunas veces me han reportado, pero no afecta mi cuenta', value: 0.05 },
                    { label: 'Recibo reportes con frecuencia, pero no me han suspendido', value: 0.1 },
                    { label: 'Recibo reportes con frecuencia y ya me han suspendido antes', value: 0.2 }
                ]
            }
        },
    ]
})


export default [coberturaSolicitada, factorDeAjuste]