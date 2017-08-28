import { combineReducers } from 'redux';

const goldbergsReducer = (state = null, action) => {
  let newState, data;
  switch (action.type) {
    case "FETCH_GOLDBERG":
      if (action.payload.status !== 200) return state;
      data = action.payload.data.data.goldberg;
      newState = [data];
      if (state !== null && typeof state === 'object') {
        newState = state.concat(newState);
      }
      return newState;

  }
  return state;
}


const rootReducer = combineReducers({
  goldbergs: goldbergsReducer,
});

export default rootReducer;
