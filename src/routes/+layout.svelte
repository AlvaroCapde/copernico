<script>
	import '../app.css';
    import CreateAccount from "../lib/Auth/CreateAccount.svelte";
    import FloatingCart from "../lib/FloatingCart.svelte";
	let { children } = $props();
    let b = true
</script>

{#if b}
    <div class="min-h-screen">
     {@render children()}
    </div>
{/if}
