export default function useApiUrlGenerator(ApiName) {
  const url = `http://localhost:8080/api/${ApiName}/`;
  return {
    url,
  };
}
