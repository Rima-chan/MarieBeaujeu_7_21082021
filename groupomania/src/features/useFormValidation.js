import { reactive } from '@vue/reactivity';
import useValidators from './Validators';

const errors = reactive({});

export default function useFormValidation() {
  const { isEmpty, minLength } = useValidators();
  const validateEmailField = (fieldName, fieldValue) => {
    (errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue) : minLength(fieldName, fieldValue, 3));
  };
  return {
    validateEmailField,
    errors,
  };
}
