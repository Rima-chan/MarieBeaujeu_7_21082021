// Check input value conformity according to different models
// Return an error message if input not conform or an empty string otherwise
export default function useValidator() {
  const isEmpty = (fieldName, fieldValue) => (!fieldValue ? 'Champs requis' : '');
  const minLength = (fieldName, fieldValue, min) => (fieldValue.length < min ? `Ce champs doit avoir au moins ${min} characteres` : '');
  const isEmail = (fieldName, fieldValue) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !re.test(fieldValue) ? `Adresse ${fieldName} pas valide` : '';
  };
  const isPassword = (fieldName, fieldValue) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    return !re.test(fieldValue) ? 'Mot de passe non valide. Doit contenir au moins 8 charactères dont 1 majuscule et 1 chiffre' : '';
  };
  return {
    isEmpty,
    minLength,
    isEmail,
    isPassword,
  };
}
