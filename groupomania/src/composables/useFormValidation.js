import { reactive } from '@vue/reactivity';
// import { ref } from 'vue';
import useValidators from './Validators';

const errors = reactive({});
// Get back validators functions from composable
// Define an error message or an empty string for each field based on validators results
// Return errors and validate functions for all fields
export default function useFormValidation() {
  const {
    isEmpty, minLength, isEmail, isPassword,
  } = useValidators();
  const validateEmailField = (fieldName, fieldValue) => {
    errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue) : isEmail(fieldName, fieldValue);
  };
  const validateUsernameField = (fieldName, fieldValue) => {
    errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue) : minLength(fieldName, fieldValue, 3);
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
