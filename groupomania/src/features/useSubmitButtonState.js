// import { computed } from 'vue';

// export default function useSubmitButtonState(errors) {
//   const isSignupButtonDisabled = computed(() => {
//     let disabled = false;
//     for (const item of errors) {
//         console.log(item);
//     }
//     return disabled;
//   });
//   return {
//     isSignupButtonDisabled,
//   };
// }

// Peut-être essayer avec en arg errors, fieldname et chercher avec error[fieldame] != "" ou pas
export default function useSubmitButtonDisable(errors) {
  let disabled = true;
  console.log(errors);
  disabled = false;
  return {
    disabled,
  };
}
