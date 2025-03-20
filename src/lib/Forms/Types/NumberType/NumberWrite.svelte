<script lang="js">
  import InputControl from '../InputControl.svelte';

  export let input;
  export let value = undefined; // numeric value
  export let showError;

  let formattedValue = '';

  // Re-format displayed text whenever `value` changes externally
  $: formattedValue = formatNumber(value);

  function handleInput(event) {
    // Remove anything that is NOT a digit (0-9).
    // This means no commas, no decimals, no letters, etc.
    let sanitized = event.target.value.replace(/[^\d]/g, '');

    // Convert sanitized string to a numeric value (integer).
    value = parseInt(sanitized, 10) || 0;

    // Let the user see exactly what they typed (digits only).
    formattedValue = sanitized;
  }

  function handleBlur() {
    // On blur, finalize display with thousand separators
    formattedValue = formatNumber(value);
  }

  function formatNumber(num) {
    if (!num || isNaN(num)) {
      return '';
    }
    // Use toLocaleString for thousands separators,
    // but no decimals. (Example: 62000 => "62,000")
    return Number(num).toLocaleString();
  }
</script>

<InputControl {input} {value} {showError}>
  <div class="w-full flex items-stretch">
    <!-- type="text" so we can intercept and sanitize in handleInput -->
    <input
            type="text"
            class="base-input"
            class:base-input-error={showError}
            disabled={input.disabled}
            placeholder={input.placeholder || ''}
            bind:value={formattedValue}
            on:input={handleInput}
            on:blur={handleBlur}
    />
  </div>
</InputControl>