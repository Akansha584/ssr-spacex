import React, { useState, useEffect } from "react";
import "./filter-card.css";
import "../styles.css";
import { connect } from "react-redux";
import { fetchFilteredData } from "../../store/actions/space-data";

const FILTERS = "Filters";
const LAUNCH_YEAR = "Launch Year";
const SUCCESSFUL_LAUNCH = "Successful Launch";
const SUCCESSFUL_LANDING = "Successful Landing";
const YEARS = [
  [2006, 2007],
  [2008, 2009],
  [2010, 2011],
  [2012, 2013],
  [2014, 2015],
  [2016, 2017],
  [2018, 2019],
  [2020],
];

const getLaunchYear = (handleClick, filters) => {
  let years = YEARS.map((year) => {
    let filteredColor =
      filters["launch_year"] === year ? "bck-click-gr" : "bck-gr";
    return (
      <div className="fr">
        <button
          className={`mr_24 mb_24 p-button br5 ${filteredColor}`}
          onClick={() => handleClick(year, "launch_year")}
        >
          {year[0]}
        </button>
        {year[1] && (
          <button
            className={`mb_24 p-button br5 ${filteredColor}`}
            onClick={() => handleClick(year, "launch_year")}
          >
            {year[1]}
          </button>
        )}
      </div>
    );
  });
  return (
    <div className="frc alIc">
      <div>{LAUNCH_YEAR}</div>
      <hr className="mb_12 mt_0 w_140 mt_3"></hr>
      <div className="frc">{years}</div>
    </div>
  );
};

const getLaunchAndLandFilters = (heading, handleClick, key, filters) => {
  let filteredColorForTrue = "bck-gr";
  let filteredColorForFalse = "bck-gr";
  if (filters[key] === true) {
    filteredColorForTrue = "bck-click-gr";
  } else if (filters[key] === false) {
    filteredColorForFalse = "bck-click-gr";
  }
  return (
    <div className="mb_12">
      <span>{heading}</span>
      <hr className="mb_12 mt_0 w_140 mt_3"></hr>
      <div className="fr spb mt_12">
        <button
          className={`p-button br5 ${filteredColorForTrue}`}
          onClick={() => handleClick(true, key)}
        >
          True
        </button>
        <button
          className={`p-button br5 ${filteredColorForFalse}`}
          onClick={() => handleClick(false, key)}
        >
          False
        </button>
      </div>
    </div>
  );
};

const FilterCard = (props) => {
  const [filters, setFilters] = useState({});

  useEffect(() => {
    props.appliedFilters(filters);
  }, [filters]);

  const handleClick = (value, key) => {
    if (filters[key] === undefined || filters[key] !== value) {
      setFilters({
        ...filters,
        [key]: value,
      });
    } else {
      delete filters[key];
      setFilters({
        ...filters,
      });
    }
  };
  return (
    <div className="card w200 mr_30 pt_8" style={{ height: "fit-content" }}>
      <h3 className="mt_0">{FILTERS}</h3>
      <div className="frc alIc">
        {getLaunchYear(handleClick, filters)}
        {getLaunchAndLandFilters(
          SUCCESSFUL_LAUNCH,
          handleClick,
          "launch_success",
          filters
        )}
        {getLaunchAndLandFilters(
          SUCCESSFUL_LANDING,
          handleClick,
          "land_success",
          filters
        )}
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    appliedFilters: (filters) => dispatch(fetchFilteredData(filters)),
  };
};

export default connect(null, mapDispatchToProps)(FilterCard);
