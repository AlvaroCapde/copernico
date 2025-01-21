<script lang="js">
  import { page } from '$app/stores';
  import { buildRelativePath } from '$services/RouteUtils';
  import { get } from 'lodash-es';
  export let row, column, rowIndex, columnIndex;
</script>

{#if !column.customEditablePath || (column.customEditablePath && get(row, column.customEditablePath))}
  {#if column.target}
    <a
      href={buildRelativePath($page, './' + row?.ref?.id)}
      target={column.target}
      class="text-button text-green-300">Edit</a
    >
  {:else}
    <a href={buildRelativePath($page, './' + row?.ref?.id)} class="text-button text-green-300">Edit</a
    >
  {/if}
{/if}
