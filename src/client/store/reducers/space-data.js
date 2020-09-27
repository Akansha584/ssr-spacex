import { FILTERED_SPACE_DATA } from '../actions/space-data';

const initialState = {
    cardData: []
}

const spaceData = (state = initialState, action) => {
    switch (action.type) {
        case FILTERED_SPACE_DATA:
            return {
                ...state,
                cardData: action.data,
            };

        default:
            return state;
    }
}

export default spaceData;