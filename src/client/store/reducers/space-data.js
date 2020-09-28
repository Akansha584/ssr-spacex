import {
  FILTERED_SPACE_DATA,
  SET_FILTERS,
  REMOVE_FILTER,
  SET_DATA_SSR,
  DISPLAY_LOADING_SPINNER,
} from "../actions/space-data";

const initialState = {
  cardData: [],
  filters: {},
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
    case SET_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.key]: action.payload.value,
        },
      };

    case REMOVE_FILTER:
      const modifiedFilters = { ...state.filters };
      delete modifiedFilters[action.payload];
      return {
        ...state,
        filters: modifiedFilters,
      };

    case SET_DATA_SSR:
      return {
        ...state,
        filters: {
          ...action.payload.filters,
        },
        cardData: action.payload.data,
        isFetching: false,
      };

    default:
      return state;
  }
};

export default spaceData;
