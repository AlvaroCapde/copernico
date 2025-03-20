<script>
    import {writable, get} from "svelte/store";
    import {onMount} from "svelte";
    import {page} from "$app/stores";
    import coberturas from "./coberturas.js"
    import WizardCoberturas from "../../lib/WizardCoberturas.svelte";
    import Personal_Info from "./Personal_Info.js";
    let forms = []
    function removeDuplicateInputs(forms) {
        const seenNames = new Set();
        const uniqueForms = forms.map((individualForm) => {
            const uniqueInputs = individualForm.map((form) => {
                const filteredInputs = get(form).inputs.filter((input) => {
                    if (seenNames.has(input.name)) {
                        return false; // Skip duplicate inputs
                    }
                    seenNames.add(input.name); // Mark name as seen
                    return true;
                })
                return writable({formType: get(form).formType, inputs: filteredInputs})
                }
            );
            return uniqueInputs;
        });
        const convertedForms = []
        uniqueForms.forEach((cobertura) => {
            cobertura.forEach((form) => {
                if(get(form).inputs.length > 0){
                    convertedForms.push(form);
                }
            })
        })
        console.log('converted',convertedForms)
        return convertedForms;
    }
    const getForms = (params) => {
        const c = params.split(',')
        const unfilteredForms = c.map((id) => coberturas[id])
        forms = [...Personal_Info, ...removeDuplicateInputs(unfilteredForms)]
        console.log('unfiltered',unfilteredForms)
    }
    $: getForms($page.url.searchParams.get('coberturas'))
    let values = writable({})
</script>
<div class="relative">
    <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
    </div>
    {#if forms.length > 0}
        <WizardCoberturas bind:values forms={forms}/>
    {/if}
    <div class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
        <div class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
    </div>
</div>
