// const userRegistered = JSON.parse(localStorage.getItem('userRegistered'));
// const userToken = userRegistered.token;
let xsrfToken = localStorage.getItem('xsrfToken');
if (!xsrfToken) {
  console.log('Erreur pas de token xsfr');
}
xsrfToken = JSON.parse(xsrfToken);

export default function useAxiosHeaders(tokenXsrf = xsrfToken) {
  const basicHeadersConfig = {
    headers: { 'Content-Type': 'application/json' },
  };
  const formDataAuthHeaders = {
    headers: {
      'Content-Type': 'multipart/form-data',
      // Authorization: `Bearer ${token}`,
      'x-xsrf-token': `${tokenXsrf}`,
    },
  };
  const authHeaders = {
    headers: {
      // Authorization: `Bearer ${token}`,
      'x-xsrf-token': `${tokenXsrf}`,
    },
  };
  return {
    basicHeadersConfig,
    formDataAuthHeaders,
    authHeaders,
  };
}
