import { computed } from 'vue';

// Check if user properties are not empty and errors exist
// Vue JS ? doesn't allow using for loops in arrow functions
export default function useSubmitButtonDisable(user, errors) {
  const isButtonDisabled = computed(() => {
    let disabled = true;
    const userPropsToCheck = Object.values(user);
    const errorsToCheck = Object.values(errors);
    const isNotEmpty = userPropsToCheck.every((inputValue) => (inputValue !== ''));
    const isValid = errorsToCheck.every((error) => (error === ''));
    if (isNotEmpty && isValid) {
      disabled = false;
    }
    return disabled;
  });
  return {
    isButtonDisabled,
  };
}
