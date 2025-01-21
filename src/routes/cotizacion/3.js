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
            type: 'text',
            name: 'coberturaSolicitada',
            label: 'Cobertura a solicitar (Máximo 5 Millones)',
            placeholder: '5000',
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
            name: 'numeroSeguidores',
            label: 'Numero de seguidores',
            required: true,
            layout: {
                write: {
                    containerClass: 'col-4'
                }
            },
            data: {
                options: [
                    { label: 'Menos de 10,000', value: 1 },
                    { label: 'Mas de 100,000', value: 1.2 },
                    { label: 'Mas de 1,000,000', value: 1.4 },
                    { label: 'Mas de 5,000,000', value: 1.6 },
                ]
            }
        }
    ]
})


export default [coberturaSolicitada, factorDeAjuste]