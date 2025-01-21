import {writable} from "svelte/store";
import '../../lib/Forms/Types/SelectType/SelectType.js'
//PÉRDIDA TOTAL DE LA CUENTA
//FORMULA = P = (VD×TD×F)
// VD = Valor Declarado
// TD = Tasa de Riesgo
// P= Prima
// F= FACTOR DE AJUSTE POR PARTICULARIDADES DEPENDE DE DIVERSOS FACTORES:

const valorDeclarado = writable( {
    formType: 'Ingresos',
    inputs: [
        {
            type: 'text',
            name: 'valorDeclarado',
            label: 'Valor Declarado de la cuenta',
            placeholder: '10000',
            required: true,
            layout: {
                write: {
                    containerClass: 'col-4'
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
            name: 'historial',
            label: 'Historial de Seguridad y Hackeos',
            placeholder: 'Selecciona una opción',
            required: true,
            layout: {
                write: {
                    containerClass: 'col-4'
                }
            },
            data: {
                options: [
                    { label: 'Sin incidentes', value: 0.9 },
                    { label: 'Con 1 incidente', value: 1 },
                    { label: 'Con más de 1 incidente', value: 1.3 }
                ]
            }
        },
        {
            type: 'select',
            name: 'medidasSeguridad',
            label: 'Medidas de Seguridad Implementadas',
            required: true,
            layout: {
                write: {
                    containerClass: 'col-4'
                }
            },
            data: {
                options: [
                    { label: 'Autentificación de 2 pasos', value: 0.85 },
                    { label: 'Sin autentificación de 2 pasos', value: 1 },
                    { label: 'Medidas de seguridad básicas', value: 1.2 }
                ]
            }
        },
        {
            type: 'select',
            name: 'frecuenciaUso',
            label: 'Frecuencia de uso y publicación',
            required: true,
            layout: {
                write: {
                    containerClass: 'col-4'
                }
            },
            data: {
                options: [
                    { label: 'Frecuencia de uso moderada', value: 1 },
                    { label: 'Frecuencia de uso alta (más de 1 publicación al día)', value: 1.2 }
                ]
            }
        },
        {
            type: 'select',
            name: 'tipoContenido',
            label: 'Tipo de contenido publicado',
            required: true,
            layout: {
                write: {
                    containerClass: 'col-4'
                }
            },
            data: {
                options: [
                    { label: 'Seguro (estilo de vida, educativo, productos y servicios, motivacional o inspirador, arte y creatividad, entrenamiento, deportes, libros y películas, eventos familiares, contenido caritativo)', value: 1 },
                    { label: 'Controversial (política, religión, contenido sexual, teorías conspirativas, salud, violencia)', value: 1.3 }
                ]
            }
        },
        {
            type: 'select',
            name: 'interaccionUsuarios',
            label: 'Interacción con otros usuarios',
            required: true,
            layout: {
                write: {
                    containerClass: 'col-4'
                }
            },
            data: {
                options: [
                    { label: 'Interacción moderada', value: 1 },
                    { label: 'Interacción polémica', value: 1.4 }
                ]
            }
        }
    ]
})


export default [valorDeclarado, factorDeAjuste]