<script>
    import {get, writable} from 'svelte/store';
    import {WriteForm} from '../lib/SvelteEpicForm/index.js';
    import {page} from "$app/stores";
    import {calculadorCoberturas} from "../services/calculadorCoberturas.js";
    import PrimaResult from "./PrimaResult.svelte";

    export let forms = []; // Array of form objects received as props
    let sections = ["Conozcamonos", "Ingresos", "Historial", "Asegurate"];

    let currentStep = 0; // Track the current step in the wizard
    let currentSectionIndex = 0;
    let submitted = false; // Track if the wizard is complete
    export let values = writable({}); // Bindable values for forms
    function nextStep() {
        if (currentStep < forms.length - 1) {
            currentStep++;
        } else {
            submitAll();
        }
    }
    let prima
    function submitAll() {
        submitted = true;
        prima = calculadorCoberturas($values, $page.url.searchParams.get('coberturas').split(','))
    }

    function submit(event) {
        event.preventDefault();
        nextStep();
    }
    const checkSectionChange = (form) => {
        console.log(get(form))
        const formType = get(form).formType
        console.log(formType)
        if (formType === 'Conozcamonos') {
            currentSectionIndex = 0
        } else if (formType === 'Ingresos') {
            currentSectionIndex = 1
        } else if (formType === 'Historial') {
            currentSectionIndex = 2
        } else{
            currentSectionIndex = 3
        }
    }
    $: checkSectionChange(forms[currentStep])
</script>

<div class="flex flex-col justify-center items-center">
    {#if !submitted}
    <div class="mx-2 flex flex-col justify-center items-center">
        <p class="text-4xl font-bold text-slate-600 text-center primary-text">Calcula tu poliza</p>

        <div class="flex justify-center md:w-[600px] w-[400px]  items-center my-4">
            {#each sections as section, index}
                <!-- Vertical container for each step -->

                    <!-- Circle and Line -->
                    <div class="flex flex-col justify-center items-center w-full">
                        <!-- Circle for the progress step -->
                        <div class="w-8 h-8 flex items-center justify-center rounded-full border-2"
                             class:border-primary="{currentSectionIndex >= index}"
                             class:border-gray-300="{currentSectionIndex !== index}">
                            <div class="w-4 h-4 rounded-full"
                                 class:bg-primary="{currentSectionIndex >= index}"
                                 class:bg-gray-300="{currentSectionIndex !== index}">
                            </div>
                        </div>
                        <p class="text-sm w-full mt-2 font-bold text-center"
                           class:text-primary="{currentSectionIndex >= index}"
                           class:text-gray-400="{currentSectionIndex !== index}">
                            {section}
                        </p>

                        <!-- Line between progress steps -->
                        <!--{#if index < sections.length - 1}-->
                        <!--    <div class=" absolute h-1 bg-gray-300"-->
                        <!--         class:bg-primary="{index < currentSectionIndex}">-->
                        <!--    </div>-->
                        <!--{/if}-->
                    </div>
            {/each}
        </div>
    </div>
    {/if}
    <div class="md:px-20 px-5 w-full md:w-auto shadow-2xl rounded-md mt-10 space-y-4 bg-white">
        {#if !submitted}
            <div class="flex items-center w-full mt-4">
                {#if currentStep > 0}
                    <button on:click={() => currentStep--} class="mr-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                    </button>
                {/if}
<!--                <p class="text-primary font-bold ml-auto">{currentStep + 1}/{forms.length}</p>-->
            </div>
            <WriteForm
                    bind:values
                    form={forms[currentStep]}
                    on:submit={submit}
                    containerClass="py-10 md:w-96 w-full"
                    listClass="space-y-10"
                    showSecondaryButton={false}
                    primaryButtonText={currentStep < forms.length - 1 ? "Siguiente" : "Enviar solicitud"}
                    primaryButtonClass="cursor-pointer border-2 hover:animate text-white py-2 border-primary primary-color hover:bg-white w-full mt-5 rounded-full" />
        {:else}
            <PrimaResult {prima}/>
        {/if}
    </div>
</div>