import { ref, watch } from 'vue';

export default function (startVal, onValidate) {
  const input = ref(startVal);
  watch(input, (value) => {
    onValidate(value);
  });
  return {
    input,
  };
}
