import defaultAxios from 'axios';

const axios = defaultAxios.create({
  baseUrl: 'http://localhost:3000',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/graphql'
  }
});

export const getGraph = (payload, reducerType) => {
  const result = axios.post('/graphql', payload);

  return {
    type: reducerType,
    payload: result
  };
}
