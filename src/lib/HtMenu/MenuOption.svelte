<script lang="js">
  export let isDisabled = false;
  export let text = '';

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  const handleClick = () => {
    if (isDisabled) return;
    dispatch('click');
  };
</script>

<div class:disabled={isDisabled} on:click={handleClick}>
  {#if text}
    {text}
  {:else}
    <slot />
  {/if}
</div>
