import axios from 'axios';

export const FILTERED_SPACE_DATA = "FILTERED_SPACE_DATA";
export const SET_FILTERS = "SET_FILTERS";
export const REMOVE_FILTER = "REMOVE_FILTER";
export const SET_SSR_FILTERS = "SET_SSR_FILTERS";
export const SET_DATA_SSR = "SET_DATA_SSR";

export const receive_filteredData = filteredCardData => {
    return {
        type: FILTERED_SPACE_DATA,
        data: filteredCardData,
    }
}

export const createAPIString = (filters = {}) => {
    let string = '';
    Object.keys(filters).map(key => {
        string = string + `&${key}=${filters[key]}`
    });
    return string;
}


export const fetchFilteredData = (filters) => {
    return async (dispatch) => {
        let apiString = createAPIString(filters);
        const res = await axios.get(`https://api.spacexdata.com/v3/launches?limit=100${apiString}`)
        dispatch(receive_filteredData(res.data, filters));
    }
}

export const setFilter = (key, value) => ({
    type: SET_FILTERS,
    payload: {
        key, value
    }
});

export const removeFilter = (key) => ({
    type: REMOVE_FILTER,
    payload: key
});

export const fetchFilteredDataSSR = (filters) => {
    return async (dispatch) => {
        let apiString = createAPIString(filters);
        const res = await axios.get(`https://api.spacexdata.com/v3/launches?limit=100${apiString}`)
        dispatch({
            type: SET_DATA_SSR,
            payload: {
                data: res.data,
                filters
            },
        });
    }
}