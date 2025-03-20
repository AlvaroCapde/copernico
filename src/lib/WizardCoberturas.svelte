<script>
    import {get, writable} from 'svelte/store';
    import {WriteForm} from '../lib/SvelteEpicForm/index';
    import {page} from "$app/stores";
    import {calculadorCoberturas} from "../services/calculadorCoberturas.js";
    import PrimaResult from "./PrimaResult.svelte";
    import {Form, Input} from "./SvelteEpicForm/index.js";
    import PlatformPicker from "./PlatformPicker.svelte";

    export let forms = []; // Array of form objects received as props
    let sections = ["Conozcamonos", "Ingresos", "Historial", "Asegurate"];

    let currentStep = 0; // Track the current step in the wizard
    let currentSectionIndex = 0;
    let submitted = false; // Track if the wizard is complete
    let hasErrors;
    export let values = writable({
        nombreUsuario: '@',
    }); // Bindable values for forms
    function nextStep() {
        if (currentStep < forms.length - 1) {
            currentStep++;
        } else {
            submitAll();
        }
    }
    let results
    function submitAll() {
        submitted = true;
        results = calculadorCoberturas($values, $page.url.searchParams.get('coberturas').split(','))
    }

    function submit(event) {
        event.preventDefault();
        nextStep();
    }
    const checkSectionChange = (form) => {
        const formType = get(form).formType
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
        {#if !submitted}
    <div class="md:px-20 px-5 w-full md:w-auto shadow-2xl border-gray-200 border rounded-md mt-10 space-y-4 ">
            <div class="flex items-center justify-between w-full mt-10">
                <p class="text-black font-bold ">{get(forms[currentStep]).formType}</p>
                <p class="text-primary font-bold ml-auto">{currentStep + 1}/{forms.length}</p>
            </div>

            <Form form={forms[currentStep]} bind:values bind:hasErrors>
                <div class="grid text-sm md:grid-cols-4 gap-x-4 gap-y-8 pb-lg">
                    {#each get(forms[currentStep]).inputs as input (input.name)}
                            <Input
                                    name={`${input.name}`}
                            />
                    {/each}
                    {#if get(forms[currentStep]).formType === 'Conozcamonos'}
                        <div class="col-span-4">
                            <PlatformPicker bind:values/>
                        </div>
                    {/if}
                </div>
            </Form>
<!--            <WriteForm-->
<!--                    bind:values-->
<!--                    form={forms[currentStep]}-->
<!--                    on:submit={submit}-->
<!--                    containerClass="py-10 md:w- w-full"-->
<!--                    listClass="space-y-10"-->
<!--                    showButtons={false}-->
<!--                />-->
        <div class="pb-10  flex {currentStep > 0? 'justify-between space-x-4' : 'justify-end'} items-center">

            {#if currentStep > 0}
                <button on:click={() => currentStep--}  class="w-[100px] cursor-pointer border-2 hover:animate py-2 border-gray-300  hover:bg-gray-50 w-full mt-5 rounded-full">Atras</button>
            {/if}
            <button disabled={hasErrors} on:click={submit} class="cursor-pointer w-[100px] border-2 hover:animate py-2 border-primary  hover:border-lg trans hover:text-primary w-full mt-5 rounded-full">Siguiente</button>
        </div>
    </div>
        {:else}
            <PrimaResult bind:values {results}/>
        {/if}
</div>