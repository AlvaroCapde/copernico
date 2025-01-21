<script lang="js">
	import phoneNumbers from '../../data/country-phones.json';
	import HtSelect from '../HtSelect/HtSelect.svelte';
	import { onMount } from 'svelte';

	export let value = undefined;
	export let showError;
	let code = 'MX',
		maskedNumber;
	let options = [];
	let codeNumberMap = {};

	function makeMaskedNumber(_number = '') {
		if (_number.length) {
			const rawNumber = extractNumbers(_number);
			if (!rawNumber) {
				return '';
			} else {
				let _maskedNumber = `(${rawNumber.substr(0, 2)}) ${rawNumber.substr(
					2,
					4
				)} - ${rawNumber.substr(6)}`;
				const numberRegex = /[0-9]/g;
				let lastNumberIndex;
				while (numberRegex.test(_maskedNumber)) lastNumberIndex = numberRegex.lastIndex;
				return _maskedNumber.substr(0, lastNumberIndex);
			}
		}
	}

	function extractNumbers(_number = '') {
		const notNumberRegex = /\D/g;
		return _number.replace(notNumberRegex, '');
	}

	onMount(() => {
		options = Object.entries(phoneNumbers).map((phoneNumber) => {
			codeNumberMap[phoneNumber[0]] = phoneNumber[1];
			return {
				label: `${phoneNumber[0]} +${phoneNumber[1]}`,
				value: phoneNumber[0]
			};
		});
		if (value?.code && value?.maskedNumber) {
			code = value.code;
			maskedNumber = value.maskedNumber;
		}
	});

	function triggerCalculations(_code, _maskedNumber) {
		const codeNumber = codeNumberMap[_code];
		const number = extractNumbers(_maskedNumber);
		value = {
			maskedNumber: makeMaskedNumber(_maskedNumber),
			code: _code,
			number,
			codeNumber,
			e164: `+${codeNumber}${number}`
		};
		maskedNumber = value.maskedNumber;
	}

	$: {
		if (maskedNumber) {
			triggerCalculations(code, maskedNumber);
		}
	}
</script>

<div class="flex">
	<div>
		<HtSelect {showError} {options} bind:value={code} />
	</div>
	<div class="ml-sm flex-grow">
		<input
			class="base-input"
			class:base-input-error={showError}
			type="tel"
			bind:value={maskedNumber}
			maxlength={code === 'US' && '16'}
		/>
	</div>
</div>
