import PhoneNumberWrite from './PhoneNumberWrite.svelte';
import TextRead from '../TextType/TextRead.svelte';

import { EpicFormService } from '$lib/SvelteEpicForm/index';

export const PhoneNumber = {
  type: 'phoneNumber',
  write: PhoneNumberWrite,
  read: TextRead,
  isValid: (value) => {
    return value?.code && value?.maskedNumber;
  },
  label: 'Phone Number'
};
EpicFormService.registerType(PhoneNumber);
