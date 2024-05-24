import { BuildingAdd, DoorClosed, DoorClosedFill } from 'react-bootstrap-icons'

const Info = ({ buildingDetails, formattedAddress, borough, mostRecentUc }) => {
    
    // console.log(getBorough(buildingDetails?.ucbbl))
    return (
        <div>
            <h1>{formattedAddress}</h1>
            <p>{borough}, New York, {buildingDetails?.zipcode}</p>
            <div style={{color: '#535353', margin: '20px 0px 50px'}}>
                <p><BuildingAdd /> Built in {buildingDetails?.yearbuilt}</p>
                <p><DoorClosed /> {buildingDetails?.unitsres}  units total</p>
                <p><DoorClosedFill /> {mostRecentUc} stabilized units</p>
            </div>
        </div>
    )
}

export default Info