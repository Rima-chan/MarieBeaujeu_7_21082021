import { computed } from 'vue';

// Check if user properties are not empty and errors exist
// Vue JS ? doesn't allow using of for loops in arraw functions
export default function useSubmitButtonDisable(user, errors) {
  const isButtonDisabled = computed(() => {
    let disabled = true;
    const userPropsToCheck = Object.values(user);
    const errorsToCheck = Object.values(errors);
    const isNotEmptyUserInput = userPropsToCheck.every((inputValue) => (inputValue !== ''));
    const isNotError = errorsToCheck.every((error) => (error === ''));
    if (isNotEmptyUserInput && isNotError) {
      disabled = false;
    }
    return disabled;
  });
  return {
    isButtonDisabled,
  };
}
