import React, { useEffect } from "react";
import "./space-program-card.css";
import "../styles.css";
import CardImage from "../card-image/card-image";
import { connect } from "react-redux";
import {
  fetchFilteredData,
  fetchFilteredDataSSR,
} from "../../store/actions/space-data";

const MISSION_IDS = "Mission Ids:";
const LAUNCH_YEAR = "Launch Year:";
const SUCCESSFULL_LAUNCH = "Successful Launch:";
const SUCCESSFULL_LANDING = "Successful Landing:";

const CardDetails = (props) => {
  let missionIds = [];
  if (props.missionIds.length > 0) {
    missionIds = (
      <ul className="mr0 key_color">
        {props.missionIds.map((missionId) => {
          return <li>{missionId}</li>;
        })}
      </ul>
    );
  }
  return (
    <div>
      <div className="mb_12">
        <h3 className="card-heading mb_12 mt_0">{MISSION_IDS}</h3>
        {missionIds}
      </div>
      <div className="fr mb_12 alIc">
        <h3 className="card-heading mr0">{LAUNCH_YEAR}</h3>
        <span className="card-value key_color">{props.launchYear}</span>
      </div>
      <div className="fr mb_12 alIc">
        <h3 className="card-heading mr0"> {SUCCESSFULL_LAUNCH}</h3>
        <span className="card-value key_color t_capital">
          {`${props.successfulLaunch}`}
        </span>
      </div>
      <div className="fr mb_12 alIc">
        <h3 className="card-heading mr0">{SUCCESSFULL_LANDING}</h3>
        <span className="card-value key_color">
          {props.successfullLanding === undefined
            ? "NA"
            : `${props.successfulLanding}`}
        </span>
      </div>
    </div>
  );
};

const SpaceProgramCard = (props) => {
  useEffect(() => {
    props.getFilteredData();
  }, []);

  return (
    <div className="fr fwrap">
      {props.cardData.map((card) => {
        return (
          <div className="card fs_18 frc width_mobile">
            <CardImage
              missionName={card.mission_name}
              flightNumber={card.flight_number}
              imageLink={card.links.mission_patch}
            />
            <CardDetails
              missionIds={card.mission_id}
              launchYear={card.launch_year}
              successfulLaunch={card.launch_success}
              successfulLanding={card.land_success}
            />
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cardData: state.spaceDataReducer.cardData || [],
    filters: state.spaceDataReducer.filters || {},
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFilteredData: (filters) => dispatch(fetchFilteredData(filters)),
  };
};

const loadDataSSR = (store, queryParams) => {
  return store.dispatch(fetchFilteredDataSSR(queryParams));
};

export { loadDataSSR };

export default connect(mapStateToProps, mapDispatchToProps)(SpaceProgramCard);
