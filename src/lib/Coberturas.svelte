<script>
    import {onMount} from "svelte";
    import {goto} from "$app/navigation";
    import {coberturasStore} from "../routes/cartStore";

    const coberturasType = [
        {
            id: 1,
            name: 'Perdida total de la cuenta',
            description: 'Indemnización por la pérdida definitiva de la cuenta debido a hackeo o baja injustificada (cobertura básica hasta 1 millón de pesos).'
        },
        {
            id: 2,
            name: 'Cobertura por perjuicio generado por suspension o perdida temporal',
            description: 'Protección por pérdidas derivadas de bloqueos temporales o suspensiones (lucro cesante de hasta 10 días de ingresos con un máximo de 2,000 MXN por día).'
        },
        {
            id: 3,
            name: 'Responsabilidad Civil por daños a terceros',
            description: 'Protección contra demandas derivadas de publicaciones, con un monto máximo de 2 millones de pesos.'
        }
    ]
    const addCobertura = (newCobertura) => {
        if(!$coberturasStore.includes(newCobertura.toString())) coberturasStore.set([...$coberturasStore, newCobertura.toString()])
    }
</script>
<div id="coberturas" class="bg-white scroll-smooth py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-4xl text-center">
            <h2 class="text-base/7 font-semibold text-indigo-600">Coberturas</h2>
            <p class="mt-2 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl">Coberturas que se acomodan a tus necesidades</p>
        </div>
        <p class="mx-auto mt-6 max-w-2xl text-pretty text-center text-lg font-medium text-gray-600 sm:text-xl/8">Choose an affordable plan that’s packed with the best features for engaging your audience, creating customer loyalty, and driving sales.</p>
        <div class="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {#each coberturasType as cobertura (cobertura.id)}
            <div class="rounded-3xl p-8 ring-1 ring-gray-200 xl:p-10">
                <h3 id="tier-freelancer" class="text-lg/8 font-semibold text-gray-900">{cobertura.name}</h3>
                <p class="mt-4 text-sm/6 text-gray-600">{cobertura.description}</p>
                <button on:click={()=> addCobertura(cobertura.id)} aria-describedby="tier-freelancer" class="mt-6 block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Agregar cobertura</button>
<!--                <ul role="list" class="mt-8 space-y-3 text-sm/6 text-gray-600 xl:mt-10">-->
<!--                    <li class="flex gap-x-3">-->
<!--                        <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">-->
<!--                            <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />-->
<!--                        </svg>-->
<!--                        5 products-->
<!--                    </li>-->
<!--                    <li class="flex gap-x-3">-->
<!--                        <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">-->
<!--                            <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />-->
<!--                        </svg>-->
<!--                        Up to 1,000 subscribers-->
<!--                    </li>-->
<!--                    <li class="flex gap-x-3">-->
<!--                        <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">-->
<!--                            <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />-->
<!--                        </svg>-->
<!--                        Basic analytics-->
<!--                    </li>-->
<!--                    <li class="flex gap-x-3">-->
<!--                        <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">-->
<!--                            <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />-->
<!--                        </svg>-->
<!--                        48-hour support response time-->
<!--                    </li>-->
<!--                </ul>-->
            </div>
            {/each}
        </div>
    </div>
</div>
