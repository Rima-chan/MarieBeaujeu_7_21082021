export default function useApiUrlGenerator(ApiName) {
  const url = `http://localhost:3000/api/${ApiName}`;
  return {
    url,
  };
}
