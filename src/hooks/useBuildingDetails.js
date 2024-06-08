import { useEffect, useState } from 'react'
import Client from '../services/api'

const useBuildingDetails = (bbl) => {
    const [buildingDetails, setBuildingDetails] = useState(null)
    const [percentStabilized, setPercent] = useState(null)
    const [mostRecentUc, setMostRecentUc] = useState(null)
    const [formattedAddress, setFormattedAddress] = useState(null)
    const [borough, setBorough] = useState(null)

    const handlePercentage = (uc2018, uc2019, uc2020, uc2021, unitsres) => {
        const mostRecentData = uc2021 || uc2020 || uc2019 || uc2018 || null
        const percentage = (mostRecentData / parseInt(unitsres, 10)) * 100
        setPercent(percentage.toFixed(0))
        setMostRecentUc(mostRecentData)
    }
    
    const formatAddress = (address) => {
        const words = address.split(' ')
        const formattedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        const formattedAddress = formattedWords.join(' ')
        setFormattedAddress(formattedAddress)
    }

    const getBorough = (bbl) => {
        const boroughCode = parseInt(bbl.toString().charAt(0), 10)

        let borough
        switch (boroughCode) {
            case 1:
                borough = 'Manhattan'
                break
            case 2:
                borough = 'Bronx'
                break
            case 3:
                borough = 'Brooklyn'
                break
            case 4:
                borough = 'Queens'
                break
            case 5:
                borough = 'Staten Island'
                break
            default:
                borough = 'Unknown'
        }

        setBorough(borough)
    }

    useEffect(() => {
        if (!bbl) return

        const fetchBuildingDetails = async () => {
            try {
                const response = await Client.get(`/rentstabs/${bbl}`)
                const data = await response.data
                setBuildingDetails(data)
                formatAddress(data.address)
                getBorough(data.ucbbl)
                handlePercentage(data.uc2018, data.uc2019, data.uc2020, data.uc2021, data.unitsres)
            } catch (error) {
                console.error('Error getting building details:', error)
            }
        }

        fetchBuildingDetails()
    }, [bbl])

    return { buildingDetails, percentStabilized, mostRecentUc, formattedAddress, borough }
}

export default useBuildingDetails