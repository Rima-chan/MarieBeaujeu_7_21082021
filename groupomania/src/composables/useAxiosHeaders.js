const userRegistered = JSON.parse(localStorage.getItem('userRegistered'));
const userToken = userRegistered.token;

export default function useAxiosHeaders(token = userToken) {
  const basicHeadersConfig = {
    headers: { 'Content-Type': 'application/json' },
  };
  const formDataAuthHeaders = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  };
  const authHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return {
    basicHeadersConfig,
    formDataAuthHeaders,
    authHeaders,
  };
}
