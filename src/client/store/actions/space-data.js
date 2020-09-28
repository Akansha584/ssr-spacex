import axios from "axios";

export const FILTERED_SPACE_DATA = "FILTERED_SPACE_DATA";
export const DISPLAY_LOADING_SPINNER = "DISPLAY_LOADING_SPINNER";
export const receive_filteredData = (filteredCardData) => {
  return {
    type: FILTERED_SPACE_DATA,
    data: filteredCardData,
  };
};

export const loading_spinner = () => {
  return {
    type: DISPLAY_LOADING_SPINNER,
  };
};

const createAPIString = (filters = {}) => {
  let string = "";
  Object.keys(filters).map(
    (key) => (string = string + `&${key}=${filters[key]}`)
  );
  return string;
};

export const fetchFilteredData = (filters) => {
  return async (dispatch) => {
    dispatch(loading_spinner());
    let apiString = createAPIString(filters);
    const res = await axios.get(
      `https://api.spacexdata.com/v3/launches?limit=100${apiString}`
    );
    dispatch(receive_filteredData(res));
  };
};
