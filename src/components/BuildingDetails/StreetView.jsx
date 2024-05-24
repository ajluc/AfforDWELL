import React, { useState, useEffect } from "react"
import axios from "axios"
import Card from 'react-bootstrap/Card'

const StreetView = ({ latitude, longitude, address }) => {
    const [imageURL, setImageUrl] = useState()

    useEffect(() => {
        const fetchStreetViewImage = () => {
            const apiKey = process.env.REACT_APP_GOOGLE_API_KEY
            const streetViewURL = `https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${latitude},${longitude}&key=${apiKey}`
            setImageUrl(streetViewURL)
        }
        
        // Testing: will geocoded lat/long provide better street view images than BBL converted lat/long?
        // Answer: doesn't seem like it
        // const fetchStreetViewImage = async () => {
        //     try {
        //         const apiKey = process.env.REACT_APP_GOOGLE_API_KEY
        //         const geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`
        //         const geocodeResponse = await axios.get(geocodeURL)
        //         const location = geocodeResponse.data.results[0].geometry.location
        //         const streetViewURL = `https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${location.lat},${location.lng}&key=${apiKey}`
        //         setImageUrl(streetViewURL)
        //     } catch (error) {
        //         console.error('Error fetching street view:', error)
        //     }
        // }


        fetchStreetViewImage()
    }, [latitude, longitude, address])
    return (
        <div className="street-view-container">
            {imageURL ? (
                <img src={imageURL} alt={"Street View"} />
            ) : (
                <p>{latitude}</p>
            )}
        </div>
    )
}

export default StreetView