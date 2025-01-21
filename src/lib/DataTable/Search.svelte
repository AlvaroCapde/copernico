<script lang="js">
  import { debounce } from 'lodash-es';
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let searchKey;

  const callSearch = debounce(() => {
    dispatch('search', {
      searchKey
    });
  },200)
</script>

<div class="w-1/3">
  <input
    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
    type="text"
    placeholder={'Search...'}
    bind:value={searchKey}
    on:keyup={callSearch}
  />
</div>
