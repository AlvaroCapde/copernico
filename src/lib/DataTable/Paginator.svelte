<script lang="js" context="module">
  export let resetPaginator;
</script>

<script lang="js">
  import { range } from 'lodash-es';
  import { createEventDispatcher } from 'svelte';

  export let itemsPerPages;
  export let totalItems;

  const dispatch = createEventDispatcher();

  let currentPageIndex;
  let pageSize;
  let pages;
  let pagesArray = [];

  let from;
  let to;

  $: {
    if (totalItems != null) {
      initPaginator();
    }
  }

  $: {
    if (currentPageIndex !== null) {
      currentPageIndexChange(currentPageIndex, pageSize, totalItems);
    }
  }

  function initPaginator() {
    pageSize = itemsPerPages[0];
    pages = calculateTotalPages(totalItems, pageSize);
    resetPaginator();
  }
  function calculateTotalPages(totalItems, pageSize) {
    return Math.ceil(totalItems / pageSize);
  }
  function calculateFrom(currentPageIndex, pageSize, totalItems) {
    if (totalItems === 0) return 0;
    return currentPageIndex * pageSize + 1;
  }
  function calculateTo(currentPageIndex, pageSize, totalItems) {
    const to = (currentPageIndex + 1) * pageSize;
    return to <= totalItems ? to : totalItems;
  }
  resetPaginator = function () {
    currentPageIndex = 0;
    pages = calculateTotalPages(totalItems, pageSize);
    pagesArray = range(pages);
  };
  function handleLess() {
    if (currentPageIndex !== 0) {
      currentPageIndex = currentPageIndex - 1;
    }
  }
  function handleMore() {
    if (currentPageIndex < pages - 1) {
      currentPageIndex = currentPageIndex + 1;
    }
  }
  function currentPageIndexChange(currentPageIndex, pageSize, totalItems) {
    from = calculateFrom(currentPageIndex, pageSize, totalItems);
    to = calculateTo(currentPageIndex, pageSize, totalItems);
    dispatch('paginatorChange', {
      currentPageIndex,
      pageSize,
      from,
      to
    });
  }
</script>

<div class="flex justify-center items-center justify-between text-md text-gray-400">
  <div class="">
    Items per page:
    <select bind:value={pageSize} on:change={resetPaginator} class="w-24 py-sm pl-xs mt-sm md:mt-0">
      {#each itemsPerPages as itemPerPage}
        <option value={itemPerPage}>
          {itemPerPage}&nbsp;
        </option>
      {/each}
    </select>
  </div>
  <div>
    {from} - {to} of {totalItems}
  </div>
  <div class="flex items-center justify-between">
    <div class="cursor-pointer" on:click={handleLess}>
      <i>Pagina Anterior</i>
    </div>
    <select bind:value={currentPageIndex} class="w-20 py-sm pl-sm">
      {#each pagesArray as page}
        <option class="p-sm" value={page}>
          {page + 1}
        </option>
      {/each}
    </select>
    <div class="cursor-pointer" on:click={handleMore}>
      <i>Siguiente Pagina</i>
    </div>
  </div>
</div>
