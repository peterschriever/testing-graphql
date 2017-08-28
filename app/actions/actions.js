import defaultAxios from 'axios';

const axios = defaultAxios.create({
  baseUrl: 'http://localhost:3000',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/graphql'
  }
});

const startingRequest = () => {
  return {
    type: "STARTING_REQUEST"
  }
}

const finishedRequest = (response) => {
  return {
    type: "FINISHED_REQUEST",
    response: response
  }
}

export const getGraph = (payload) => {
  return dispatch => {
    dispatch(startingRequest());
    return axios.post('/graphql', payload)
      .then(response => {
        console.log("dispatching finishedRequest", response);
        dispatch(finishedRequest(response.data));
      });
  }
}
