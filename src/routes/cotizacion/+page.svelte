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

{#if forms.length > 0}
    <WizardCoberturas bind:values forms={forms}/>
{/if}