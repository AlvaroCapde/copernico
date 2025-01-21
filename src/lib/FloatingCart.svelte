<script>
    import { coberturasStore } from "../routes/cartStore";
    import { derived } from "svelte/store";

    // Get the total number of items in the store
    $: totalItems = $coberturasStore.length;
    $: params = $coberturasStore.join(',')
    let showList = false;
    const coberturasType = {
        1: 'Perdida total de la cuenta',
        2: 'Cobertura por perjuicio generado por suspension o perdida temporal',
        3: 'Responsabilidad Civil por daños a terceros'
    }
    export function removeCobertura(index) {
        coberturasStore.update(items => {
            const updated = [...items];
            updated.splice(index, 1); // Remove the item at the given index
            return updated;
        });
    }
</script>
{#if totalItems > 0}
<div
    class="fixed ml-4 top-4 right-4 bg-white p-4 border-2  rounded-lg shadow-lg cursor-pointer z-50 transition-colors duration-200"
    on:click={() => (showList = !showList)}
>
    <div class="text-primary font-semibold flex space-x-2 justify-center">
        <p>
        {totalItems} cobertura{totalItems !== 1 ? "s" : ""} </p>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
    </svg>

    </div>
    {#if showList}
        <div class="mt-4 rounded-lg ">
            <div class="space-y-4 ">
                {#each $coberturasStore as cobertura, i}
                    <div class=" flex px-3 space-x-3 justify-between shadow-lg py-2 bg-white rounded-md border">
                        <div class="text-gray-700 font-bold">
                           {coberturasType[cobertura]}
                        </div>
                        <button on:click|stopPropagation={() => removeCobertura(i)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 font-bold text-red-400">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                {/each}
            </div>
            <a href={`/cotizacion?coberturas=${params}`} class="cursor-pointer block mt-4 text-center rounded-lg primary-button">
                Cotizar
            </a>
        </div>
    {/if}
</div>
{/if}