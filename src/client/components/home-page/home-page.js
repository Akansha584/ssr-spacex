import React from 'react';
import './home-page.css';
import SpaceProgramCard from '../space-program-card/space-program-card';
import FilterCard from "../filter-card/filter-card";
import { fetchFilteredData } from '../../store/actions/space-data'

const SPACEX_LAUNCH_PROGRAM = "SpaceX Launch Programs";
const DEVELOPED_BY = "Developed by";
const DEVELOPER_NAME = "Akansha Gupta"

const HomePage = () => {
    return (
        <div>
            <h1 className="ml_20">{SPACEX_LAUNCH_PROGRAM}</h1>
            <div className="fr mr_20 f_wrap">
                <FilterCard />
                <div className="fr w_1400">
                    <SpaceProgramCard />
                </div>
            </div>
            <h3 className='mt_40 center'>{DEVELOPED_BY}: {DEVELOPER_NAME}</h3>
        </div>

    );
}

export default HomePage;
