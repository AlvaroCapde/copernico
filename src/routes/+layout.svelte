<script>
	import '../app.css';
    import CreateAccount from "../lib/Auth/CreateAccount.svelte";
    import FloatingCart from "../lib/FloatingCart.svelte";
    import Header from "../lib/Header.svelte";
	let { children } = $props();
    let b = true
</script>
<svelte:head>
    <title>Copernico</title>
</svelte:head>
{#if b}
    <div class="min-h-screen">
        <Header />
     {@render children()}
    </div>
{/if}
