// 4. PÉRDIDA MASIVA DE SEGUIDORES
// Esta cobertura le otorga una indemnización al asegurado por cada seguidor perdido ocasionado por la pérdida masiva de seguidores derivada del contenido publicado por la cuenta (controvertido por los seguidores).
// Se entiende por perdida masiva mas del 15% de los seguidores de la cuenta (dentro de un plazo de 124 horas)
//
// FORMULA PARA CALCULAR PRIMA
//
// NS = NUMERO DE SEGUIDORES
// VS = VALOR ASIGNADO A CADA SEGUIDOR
// R= RIESGO (3% = 0.03) (doblar 6%)
// F= FACTOR DE AJUSTE
//
// Factor de Ajuste por Contenido y Comunidad:
//     Contenido neutral o comercial: Factor de 0.8.
//     Contenido polémico o sensible: Factor de 1.3.
//     Buena gestión de la comunidad: Factor de 0.85.
//     Mala gestión de la comunidad: Factor de 1.2.
//
//     P = NS X VS X R X F

import {writable} from "svelte/store";

const ingresoDiarioDeclarado = writable( {
    inputs: [
        {
            type: 'text',
            name: 'numeroSeguidores',
            label: 'Numero de Seguidores',
            placeholder: '100,000',
            required: true,
            layout: {
                write: {
                    containerClass: 'col-4'
                }
            }
        },
        {
            type: 'text',
            name: 'valorAsignadoSeguidor',
            label: 'Valor asignado a cada seguidor',
            placeholder: '2',
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
    ]
})


export default [ingresoDiarioDeclarado, factorDeAjuste]