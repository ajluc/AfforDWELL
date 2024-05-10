import { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import { useParams } from 'react-router-dom'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

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
            <h1>Details</h1> 
            <p>{buildingDetails?.address}</p>
            <p>{percentStabilized}% of this building's residential units are rent stabilized.</p>
            <div style={{ width: 200, height: 200 }}>
                <CircularProgressbar value={percentStabilized} text={`${percentStabilized}%`}/>
            </div>
        </Container>
    )
}

export default BuildingDetails