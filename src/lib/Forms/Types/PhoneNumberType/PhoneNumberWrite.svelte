<script lang="js">
  import HtPhoneNumber from '../../../HtPhoneNumber/HtPhoneNumber.svelte';
  import InputControl from '../InputControl.svelte';

  export let input;
  export let showError;
  export let value = undefined;
  export let error;
  export let isDirty;
</script>

<InputControl {input} {value} {showError}>
  <HtPhoneNumber {showError} bind:value />
</InputControl>
