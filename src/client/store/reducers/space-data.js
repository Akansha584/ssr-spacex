import { FILTERED_SPACE_DATA, SET_FILTERS, REMOVE_FILTER, SET_SSR_FILTERS, SET_DATA_SSR } from '../actions/space-data';

const initialState = {
    cardData: [],
    filters: {}
}

const spaceData = (state = initialState, action) => {
    switch (action.type) {
        case FILTERED_SPACE_DATA:
            return {
                ...state,
                cardData: action.data,
            };

        case SET_FILTERS:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    [action.payload.key]: action.payload.value
                }
            }

        case REMOVE_FILTER:
            const modifiedFilters = { ...state.filters };
            delete modifiedFilters[action.payload];
            return {
                ...state,
                filters: modifiedFilters
            }

        case SET_DATA_SSR:
            return {
                ...state,
                filters: {
                    ...action.payload.filters
                },
                cardData: action.payload.data
            }

        default:
            return state;
    }
}

export default spaceData;