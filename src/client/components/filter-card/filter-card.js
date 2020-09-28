import React, { useState, useEffect } from "react";
import "./filter-card.css";
import "../styles.css";
import { connect } from "react-redux";
import { fetchFilteredData, setFilter, removeFilter } from "../../store/actions/space-data";
import { withRouter } from 'react-router';
import { Link } from "react-router-dom";

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

const getLaunchYear = (handleClick, filters, props) => {
  let years = YEARS.map((year, index) => {
    let filteredColorFor1stYear =
      filters["launch_year"] === year[0] ? "bck-click-gr" : "bck-gr";
    let filteredColorFor2ndYear =
      filters["launch_year"] === year[1] ? "bck-click-gr" : "bck-gr";
    return (
      <div className="fr" key={index}>
        <Link
          className={`mr_24 mb_24 p-button br5 filter-button ${filteredColorFor1stYear}`}
          onClick={() => handleClick(year[0], "launch_year")}
          to={`${props.location.pathname}?launch_year=${year[0]}`}
        >
          {year[0]}
        </Link>
        {year[1] && (
          <Link
            className={`mb_24 p-button br5 filter-button ${filteredColorFor2ndYear}`}
            onClick={() => handleClick(year[1], "launch_year")}
            to={`${props.location.pathname}?launch_year=${year[1]}`}
          >
            {year[1]}
          </Link>
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

const getLaunchAndLandFilters = (heading, handleClick, key, filters, props) => {
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
        <Link
          className={`p-button br5 filter-button ${filteredColorForTrue}`}
          onClick={() => handleClick(true, key)}
          to={`${props.location.pathname}?${key}=${true}`}
        >
          True
        </Link>
        <Link
          className={`p-button br5 filter-button ${filteredColorForFalse}`}
          onClick={() => handleClick(false, key)}
          to={`${props.location.pathname}?${key}=${false}`}
        >
          False
        </Link>
      </div>
    </div>
  );
};

const FilterCard = (props) => {
  const { filters, setFilters, removeFilters } = props;

  useEffect(() => {
    props.appliedFilters(filters);
  }, [filters]);

  const handleClick = (value, key) => {
    if (filters[key] === undefined || filters[key] !== value) {
      setFilters(key, value);
    } else {
      removeFilters(key);
    }
  };
  return (
    <div className="card w200 mr_30 pt_8" style={{ height: "fit-content" }}>
      <h3 className="mt_0">{FILTERS}</h3>
      <div className="frc alIc">
        {getLaunchYear(handleClick, filters, props)}
        {getLaunchAndLandFilters(
          SUCCESSFUL_LAUNCH,
          handleClick,
          "launch_success",
          filters,
          props
        )}
        {getLaunchAndLandFilters(
          SUCCESSFUL_LANDING,
          handleClick,
          "land_success",
          filters,
          props
        )}
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    appliedFilters: (filters) => dispatch(fetchFilteredData(filters)),
    setFilters: (key, value) => dispatch(setFilter(key, value)),
    removeFilters: (key) => dispatch(removeFilter(key))
  };
};

const mapStateToProps = state => ({
  filters: state.spaceDataReducer.filters
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FilterCard));
