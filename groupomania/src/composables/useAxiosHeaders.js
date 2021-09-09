export default function useAxiosHeaders(token) {
  const basicHeadersConfig = {
    headers: { 'Content-Type': 'application/json' },
  };
  const formDataAuthHeaders = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  };
  const AuthHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return {
    basicHeadersConfig,
    formDataAuthHeaders,
    AuthHeaders,
  };
}
