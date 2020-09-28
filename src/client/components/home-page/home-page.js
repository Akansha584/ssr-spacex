import React from "react";
import "./home-page.css";
import "../styles.css";
import SpaceProgramCard from "../space-program-card/space-program-card";
import FilterCard from "../filter-card/filter-card";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";

const SPACEX_LAUNCH_PROGRAM = "SpaceX Launch Programs";
const DEVELOPED_BY = "Developed by";
const DEVELOPER_NAME = "Akansha Gupta";

const HomePage = (props) => {
  return (
    <div className="bg_clr font_fm">
      <Helmet>
        <title>SpaceX Program Page</title>
        <meta property="og:title" content="SpaceX Program Page" />
        <meta
          property="description"
          content="This page has info about Spacex Programs"
        />
      </Helmet>
      <h1 className="ml_20">{SPACEX_LAUNCH_PROGRAM}</h1>
      <div className="fr mr_20 f_wrap">
        <FilterCard />
        <div className="fr w_1400">
          <SpaceProgramCard />
        </div>
      </div>
      <h3 className="mt_40 center">
        {DEVELOPED_BY}: {DEVELOPER_NAME}
      </h3>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isFetching: state.spaceDataReducer.isFetching,
  };
};

export default connect(mapStateToProps, null)(HomePage);
