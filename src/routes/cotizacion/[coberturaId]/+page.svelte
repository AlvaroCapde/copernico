<script>

    import WizardCoberturas from "../../../lib/WizardCoberturas.svelte";
    import {writable} from "svelte/store";
    import {onMount} from "svelte";
    import {page} from "$app/stores";
    import coberturas from "../coberturas.js"
    let forms = []
    onMount(() => {
        const id = $page.params.coberturaId
        const cobertura = coberturas[id]
        forms = [...forms, ...cobertura]
    })
    let values = writable({})
    let i = 0
    $: console.log($values)
</script>

{#if forms.length > 0}
    <WizardCoberturas bind:values forms={forms[i]}/>
{/if}