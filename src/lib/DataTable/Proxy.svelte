<script lang="js">
  import { page } from '$app/stores';
  import { buildRelativeDiseasePath } from '$services/RouteUtils';
  export let row, column, rowIndex, columnIndex;
  let path = column?.path || '';
</script>

{#if !column.customEditable || (column.customEditable && row.editable)}
  {#if column.target}
    <a
      href={buildRelativeDiseasePath($page, `${path}${row.ref.id}`)}
      target={column.target}
      class="text-button text-green-300">Edit</a
    >
  {:else}
    <a
      href={buildRelativeDiseasePath($page, `${path}${row.ref.id}`)}
      class="text-button text-green-300">Edit</a
    >
  {/if}
{/if}
