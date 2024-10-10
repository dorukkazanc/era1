// Her istekte token'ı header'a ekleyen fetch wrapper
const fetchWithAuth = async (url, options) => {
  const token = sessionStorage.getItem('token');

  if (!token) {
    throw new Error('Unauthorized');
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`
    }
  });
};

export default fetchWithAuth;