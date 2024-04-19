import { useState } from "react";
import SinglePageNav from "../partials/SinglePageNav";
import WorldInfo from "../partials/WorldInfo";
import TerritoriesInfo from "../partials/TerritoriesInfo";
import RacesInfo from "../partials/RacesInfo";
import PowerSystemInfo from "../partials/PowerSystemInfo";
import { useParams } from "react-router-dom";

const WorldBuildingPage = () => {

    const { id } = useParams();

    const [location, setLocation] = useState('overview');

    const [worldInfo, setWorldInfo] = useState({});
    const [worldHistoryDetails, setWorldHistoryDetails] = useState('');
    const [worldGeographyDetails, setWorldGeographyDetails] = useState('');
    const [worldTechnologyDetails, setWorldTechnologyDetails] = useState('');
    const [worldEconomyDetails, setWorldEconomyDetails] = useState('');
    const [territories, setTerritories] = useState([]);
    const [races, setRaces] = useState([]);
    const [worldPowerSystem, setWorldPowerSystem] = useState({powerSystemDetails: '', powerSystemRankings: []});

    const linkClasses = (link, isLast=false) => {
        let classes = 'mb-10 block';
        let lastClass = 'block';
        if (link === location) {
            return classes + ' border-2 border-primary rounded-e-full px-4 py-1 bg-primary text-background';
        } else if (link === location && isLast === true) {
            return lastClass + ' border-2 border-background rounded-e-full px-4 py-1 transition-all duration-200 hover:bg-primary hover:text-background';
        } else {
            return classes + ' border-2 border-background rounded-e-full px-4 py-1 transition-all duration-200 hover:bg-primary hover:text-background';
        }
    };

    return (
        <div className="flex flex-col items-center pb-24 relative">
            <SinglePageNav/>
            <div className="mt-16"></div>
            <div className="bg-background text-primary fixed w-1/6 h-2/3 left-0 top-44 flex flex-col justify-center border-t-2 border-r-2 border-b-2 border-primary rounded-e-2xl">
                <ul className="text-3xl font-bold -ml-2">
                    <button className={linkClasses('overview')} onClick={() => setLocation('overview')}>World info</button>
                    <button className={linkClasses('territories')} onClick={() => setLocation('territories')}>Territories</button>
                    <button className={linkClasses('races')} onClick={() => setLocation('races')}>Races</button>
                    <button className={linkClasses('powerSystemInfo')} onClick={() => setLocation('powerSystemInfo')}>Power system</button>
                </ul>
            </div>
            {location === 'overview' && (
                <WorldInfo id={id} worldInfo={worldInfo} setWorldInfo={setWorldInfo} worldHistoryDetails={worldHistoryDetails} setWorldHistoryDetails={setWorldHistoryDetails} worldGeographyDetails={worldGeographyDetails} setWorldGeographyDetails={setWorldGeographyDetails} worldTechnologyDetails={worldTechnologyDetails} setWorldTechnologyDetails={setWorldTechnologyDetails} worldEconomyDetails={worldEconomyDetails} setWorldEconomyDetails={setWorldEconomyDetails}/>
            )}
            {location === 'territories' && (
                <TerritoriesInfo id={id} territories={territories} setTerritories={setTerritories}/>
            )}
            {location === 'races' && (
                <RacesInfo id={id} races={races} setRaces={setRaces}/>
            )}
            {location === 'powerSystemInfo' && (
                <PowerSystemInfo id={id} worldPowerSystem={worldPowerSystem} setWorldPowerSystem={setWorldPowerSystem}/>
            )}
        </div>
    );
}
 
export default WorldBuildingPage;