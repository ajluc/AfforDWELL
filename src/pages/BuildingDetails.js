import { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useParams } from 'react-router-dom'
import PercentDial from '../components/BuildingDetails/PercentDial'
import RentOverTimeChart from '../components/BuildingDetails/RentOverTimeChart'
import StreetView from '../components/BuildingDetails/StreetView'
import Card from 'react-bootstrap/Card'
import Client from '../services/api'

const BuildingDetails = () => {
    const { bbl } = useParams()
    const [buildingDetails, setBuildingDetails] = useState(null)
    const [loading, setLoading] = useState(false)
    const [percentStabilized, setPercent] = useState(null)
    const [mostRecentUc, setMostRecentUc] = useState(null)

    const handlePercentage = (uc2018, uc2019, uc2020, uc2021, unitsres) => {
        const mostRecentData = uc2021 || uc2020 || uc2019 || uc2018 || null
        const percentage = (mostRecentData / parseInt(unitsres, 10)) * 100
        setPercent(percentage.toFixed(0))
        setMostRecentUc(mostRecentData)
    }

    useEffect(() => {
        const fetchBuildingDetails = async () => {
            setLoading(true)
            const response = await Client.get(`/rentstabs/${bbl}`)
            const data = await response.data
            setBuildingDetails(data)
            handlePercentage(data.uc2018, data.uc2019, data.uc2020, data.uc2021, data.unitsres)
        }

        if (bbl) {
            fetchBuildingDetails()
        }
    }, [bbl])

    return (
        <div>

            <Container fluid className='container-fixed-width'>
                <Row className='content-row'>
                    <Col xs={12} md={5} className="scrollable-column order-md-1 order-2">
                        <Card>
                            <Card.Body>
                                <Card.Title>Overview</Card.Title>
                                <PercentDial percentStabilized={percentStabilized}/>
                                <Card.Text>Out of {buildingDetails?.unitsres} total residential units, {mostRecentUc} apartments (i.e., {percentStabilized} percent) are rent stabilized.</Card.Text>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Body>
                                <Card.Title>Trends</Card.Title>
                                <Card.Text>Curious about the history of rent stabilization in this building? We are!</Card.Text>
                                <RentOverTimeChart data={[buildingDetails?.uc2018, buildingDetails?.uc2019, buildingDetails?.uc2020, buildingDetails?.uc2021]}/>
                                <Card.Text>{percentStabilized} percent of this building's residential units are rent stabilized.</Card.Text>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Body>
                                <Card.Title>Our Info</Card.Title>
                                <Card.Text>We source our data from publicly accessible tax documentation for every building in NYC. Landlords must pay an annual fee for each rent stabilized apartment they own. </Card.Text>
                                <Card.Text>These tax documents are scraped for the unit count of stabilized apartments, and we compare it to the city's recorded total residential unit count for the building.</Card.Text>
                                <Card.Text>Please note: as this data comes from tax documentation (which is self reported by each landlord) we cannot verify with total certainty the accuracy of these numbers.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={7} className="fixed-column order-md-2 order-1">
                        <div>
                            <h1>Details</h1> 
                            <p>{buildingDetails?.address}</p>
                            <StreetView latitude={buildingDetails?.latitude} longitude={buildingDetails?.longitude} address={buildingDetails?.address}/>
                        </div>
                    </Col>
                </Row>
            </Container>
            <footer className='footer'>
                <p>footer content</p>
                <p>footer content</p>
            </footer>
        </div>
    )
}

export default BuildingDetails