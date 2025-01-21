<script>
    import Logo from "../../lib/Logo.svelte";

    let { children } = $props();

</script>
<div class="sticky p-6 top-0">
    <a href="/">
        <Logo width="w-20"/>
    </a>

</div>
{@render children()}
