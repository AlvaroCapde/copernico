// Personal Info para todas las cotizaciones

import {writable} from "svelte/store";

const informacionPersonal = writable( {
    formType: 'Conozcamonos',
    inputs: [
        {
            type: 'text',
            name: 'name',
            label: 'Nombre completo del asegurado',
            placeholder: 'Juan Perez',
            required: true,
            moreInfo: 'Persona física o moral que solicita el pago en caso de siniestro',
            layout: {
                write: {
                    containerClass: 'md:col-span-2 col-span-4'
                }
            }
        },
        {
            type: 'text',
            name: 'nombreUsuario',
            moreInfo: 'Debe coincidir exactamente con la cuenta asegurada.',
            label: 'Nombre usuario en la plataforma seleccionada',
            placeholder: '@ejemplo',
            required: true,
            layout: {
                write: {
                    containerClass: 'md:col-span-2 col-span-4'
                }
            }
        },
    ]
})



export default [informacionPersonal]