export default function useValidator() {
  const isEmpty = (fieldName, fieldValue) => (!fieldValue ? `${fieldName} est un champd requis` : '');
  const minLength = (fieldName, fieldValue, min) => (fieldValue.length < min ? `${fieldName} doit avoir au moins ${min} lettres` : '');
  return {
    isEmpty,
    minLength,
  };
}
