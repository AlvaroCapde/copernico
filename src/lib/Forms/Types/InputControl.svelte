<script lang="js">
	import { ErrorMessage } from '$lib/SvelteEpicForm/index';

	export let showError, input;

	function isRequired(input) {
		return (
			input.required ||
			input?.validations?.find((validation) => /required/i.test(validation.message))
		);
	}
</script>

{#if input.label}
	<div class="base-input-label {input.data?.customLabelClasses}" class:text-warm-100={showError}>
		<div class="flex justify-between items-center">
			<div>
			{input.label}
			{#if isRequired(input)}<span class="text-warm-100">*</span>{/if}
			</div>
			{#if input.moreInfo}
				<div class="relative group ml-auto">
					<!-- Circle with a Question Mark -->
					<div
							class="flex items-center justify-center w-6 h-6 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300"
					>
						<span class="text-gray-700 font-bold">?</span>
					</div>

					<!-- Tooltip -->
					<div
							class="absolute right-10 top-1/2 -translate-y-1/2 hidden group-hover:block bg-gradient-primary text-white w-auto whitespace-nowrap  text-sm rounded-md px-3 py-1  shadow-md"
					>
						<div class="">{input.moreInfo}</div>
					</div>
				</div>
			{/if}
		</div>

	</div>
{/if}
{#if input.description}
	<div class="base-input-label text-gray-400" class:text-warm-100={showError}>
		{input.description}
	</div>
{/if}
<div class="w-full mt-1 cursor-pointer flex flex-col {input?.layout?.write?.maxHeight || ''}">
	<slot />
</div>
<ErrorMessage messageClass="block p-2 text-warm-100 base-input-error" />
