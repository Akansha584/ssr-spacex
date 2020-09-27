import axios from 'axios';

export const FILTERED_SPACE_DATA = "FILTERED_SPACE_DATA";
export const receive_filteredData = filteredCardData => {
    return {
        type: FILTERED_SPACE_DATA,
        data: filteredCardData,
    }
}

const createAPIString = (filters = {}) => {
    let string = '';
    Object.keys(filters).map(key =>
        string = string + `&${key}=${filters[key]}`
    );
    return string;
}

export const fetchFilteredData = (filters) => {
    return function (dispatch, getState) {
        let apiString = createAPIString(filters);
        axios.get(`https://api.spacexdata.com/v3/launches?limit=100${apiString}`)
            .then(response => {
                dispatch(receive_filteredData(response));
            })
    }
}