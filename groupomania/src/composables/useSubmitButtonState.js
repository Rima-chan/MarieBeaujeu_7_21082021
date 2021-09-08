import { computed } from 'vue';

// Get back each properties of User and errors objects
// Check if user properties are not empty and errors exist
// Vue JS ??? doesn't allow using "for loops" in arrow functions
// Return disabled buttons functions
export default function useSubmitButtonDisable(user, errors) {
  const isSignupButtonDisabled = computed(() => {
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
  const isLoginButtonDisabled = computed(() => {
    let disabled = true;
    const userPropsToCheck = Object.values(user);
    const isNotEmpty = userPropsToCheck.every((inputValue) => (inputValue !== ''));
    if (isNotEmpty) {
      disabled = false;
    }
    return disabled;
  });
  return {
    isSignupButtonDisabled,
    isLoginButtonDisabled,
  };
}
