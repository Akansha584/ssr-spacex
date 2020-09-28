import { FILTERED_SPACE_DATA } from "../actions/space-data";
import { DISPLAY_LOADING_SPINNER } from "../actions/space-data";

const initialState = {
  cardData: [],
  isFetching: false,
};

const spaceData = (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_LOADING_SPINNER:
      return {
        ...state,
        isFetching: true,
      };

    case FILTERED_SPACE_DATA:
      return {
        ...state,
        cardData: action.data,
        isFetching: false,
      };

    default:
      return state;
  }
};

export default spaceData;
