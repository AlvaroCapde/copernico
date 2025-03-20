import TextRead from '../TextType/TextRead.svelte';
import NumberWrite from './NumberWrite.svelte';
import { EpicFormService } from '$lib/SvelteEpicForm/index';

export const NumberType = {
  type: 'number',
  write: NumberWrite,
  read: TextRead,
  isValid: (value) => {
    return Number.isFinite(value);
  },
  definitionInputs: [],
  label: 'Number'
};
EpicFormService.registerType(NumberType);
