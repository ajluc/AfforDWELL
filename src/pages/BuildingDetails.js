import { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useParams } from 'react-router-dom'
import ConstructionModal from '../components/UnderConstructionModal'
import PercentDial from '../components/BuildingDetails/PercentDial'
import RentOverTimeChart from '../components/BuildingDetails/RentOverTimeChart'

const BuildingDetails = () => {
    const { bbl } = useParams()
    const [buildingDetails, setBuildingDetails] = useState(null)
    const [loading, setLoading] = useState(false)
    const [percentStabilized, setPercent] = useState(null)

    const handlePercentage = (uc2018, uc2019, uc2020, uc2021, unitsres) => {
        const mostRecentData = uc2021 || uc2020 || uc2019 || uc2018 || null
        const percentage = (mostRecentData / parseInt(unitsres, 10)) * 100
        setPercent(percentage.toFixed(0))
    }

    useEffect(() => {
        const fetchBuildingDetails = async () => {
            setLoading(true)
            const response = await fetch(`/rentstabs/${bbl}`)
            const data = await response.json()
            console.log(data)
            setBuildingDetails(data)
            handlePercentage(data.uc2018, data.uc2019, data.uc2020, data.uc2021, data.unitsres)
        }

        if (bbl) {
            fetchBuildingDetails()
        }
    }, [bbl])

    return (
        <Container>
            <ConstructionModal />
            <Row>
                <Col xs={12} md={8} className="scrollable-column order-md-1 order-2">
                <div className="content">
                    <PercentDial percentStabilized={percentStabilized}/>
                    <RentOverTimeChart />
                    <p>{percentStabilized}% of this building's residential units are rent stabilized.</p>
                </div>
                </Col>
                <Col xs={12} md={4} className="fixed-column order-md-2 order-1">
                <div className="info">
                    <p>Your fixed info...</p>
                    <h1>Details</h1> 
                    <p>{buildingDetails?.address}</p>
                </div>
                </Col>
            </Row>
        </Container>
    )
}

export default BuildingDetails