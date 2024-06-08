import Container from "react-bootstrap/Container";
import useBuildingDetails from "../../hooks/useBuildingDetails";
import PercentDial from "./PercentDial";
import RentOverTimeChart from "./RentOverTimeChart";
import Info from "./Info";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const DrawerContainer = ({ isVisible, currentBuilding }) => {
    const navigate = useNavigate()

    const bbl = currentBuilding?.bbl

    const { buildingDetails, percentStabilized, mostRecentUc, formattedAddress, borough } = useBuildingDetails(bbl)
    
    const DrawerType = () => {
        if (currentBuilding) {
            return (
                <div>
                    <Info buildingDetails={buildingDetails} formattedAddress={formattedAddress} borough={borough} mostRecentUc={mostRecentUc}/>
                    <Button onClick={() => navigate(`/details/${buildingDetails.ucbbl}`)}>More Info</Button>
                    <PercentDial percentStabilized={percentStabilized}/>
                    <RentOverTimeChart data={[buildingDetails?.uc2018, buildingDetails?.uc2019, buildingDetails?.uc2020, buildingDetails?.uc2021]}/>
                </div>
            )
        } else {
            return (
                <div>
                    <p>No, building does not exist in database</p>
                </div>
            )
        }
    }

    return (
        <div style={{ width: isVisible ? '100%' : '0%', transition: 'width 0.3s', height: 'calc(100vh - 3.5rem)', overflow: 'auto', position: 'relative' }}>
            {isVisible && (
                <Container>
                    <DrawerType />
                </Container>
            )}
        </div>
    )
}

export default DrawerContainer
