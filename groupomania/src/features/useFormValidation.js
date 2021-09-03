import { reactive } from '@vue/reactivity';
// import { ref } from 'vue';
import useValidators from './Validators';

const errors = reactive({});
// One function per form field to check input validity
// Return functions and errors
export default function useFormValidation() {
  const { isEmpty, minLength, isEmail, isPassword } = useValidators();
  const validateEmailField = (fieldName, fieldValue) => {
    errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue) : isEmail(fieldName, fieldValue);
  };
  const validateUsernameField = (fieldName, fieldValue) => {
    errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue) : minLength(fieldName, fieldValue, 4);
  };
  const validatePasswordField = (fieldName, fieldValue) => {
    errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue) : isPassword(fieldName, fieldValue);
  };
  return {
    errors,
    validateEmailField,
    validateUsernameField,
    validatePasswordField,
  };
}
