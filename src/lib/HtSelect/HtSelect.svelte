<script lang="js">
  import { toJSON } from '@healthtree/firestore-join';
  export let value = undefined,
    disabled = undefined,
    placeholder = undefined,
    options,
    showError,
    required = undefined,
    autocomplete = 'off',
    componentClass,
    selectClass = '',
    unselectedValue;
  $: {
    value =
      options?.find((o) => {
        const jsonOption = toJSON(o.value);
        const jsonValue = toJSON(value);
        const resp = jsonOption === jsonValue;
        return resp;
      })?.value || value;
  }
</script>

<div class={componentClass || 'flex w-full items-stretch'}>
  <select
    class="base-input pr-lg {selectClass}"
    on:click
    on:change
    {required}
    {disabled}
    class:base-input-error={showError}
    bind:value
    {placeholder}
    {autocomplete}
  >
    <option value={unselectedValue}>{placeholder || ''}</option>
    {#if options}
      {#each options as option}
        <option value={option.value} disabled={option.disabled}>{option.label}</option>
      {/each}
    {/if}
  </select>
</div>
