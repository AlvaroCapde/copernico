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
            layout: {
                write: {
                    containerClass: 'col-4'
                }
            }
        },
        {
            type: 'select',
            name: 'plataforma',
            label: 'Plataforma a asegurar',
            required: true,
            layout: {
                write: {
                    containerClass: 'col-4'
                }
            },
            data: {
                options: [
                    { label: 'Instagram', value: 'Instagram' },
                    { label: 'Facebook', value: 'Facebook' },
                    { label: 'X', value: 'X' },
                    { label: 'TikTok', value: 'TikTok' },
                    { label: 'Youtube', value: 'Youtube' }
                ]
            }
        },
        {
            type: 'text',
            name: 'nombreUsuario',
            label: 'Nombre usuario en la plataforma seleccionada',
            placeholder: '@ejemplo',
            required: true,
            layout: {
                write: {
                    containerClass: 'col-4'
                }
            }
        },
    ]
})



export default [informacionPersonal]