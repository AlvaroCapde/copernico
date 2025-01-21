<script lang="js">
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';

  export let x;
  export let y;

  // whenever x and y is changed, restrict box to be within bounds
  $: (() => {
    if (!menuEl) return;

    const rect = menuEl.getBoundingClientRect();
    x = Math.min(window.innerWidth - rect.width, x);
    if (y > window.innerHeight - rect.height) y -= rect.height;
  })(x, y);

  const dispatch = createEventDispatcher();

  let menuEl;
  function onPageClick(e) {
    if (
      e.target === menuEl ||
      menuEl.contains(e.target) ||
      e.target.className.indexOf('show-filter') > -1
    ) {
      return;
    }
    dispatch('clickoutside');
  }
</script>

<svelte:body on:click={onPageClick} />

<div
  transition:fade={{ duration: 100 }}
  bind:this={menuEl}
  class="min-w-60 p-md absolute grid border shadow-2xl bg-white max-h-72 overflow-scroll"
>
  <slot />
</div>
