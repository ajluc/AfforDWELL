import React, { useState, useEffect } from "react"

const StreetView = ({ latitude, longitude, address }) => {
    const [imageURL, setImageUrl] = useState()

    useEffect(() => {
        const fetchStreetViewImage = () => {
            try {
                const apiKey = process.env.REACT_APP_GOOGLE_API_KEY
                const streetViewURL = `https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${latitude},${longitude}&key=${apiKey}`
                setImageUrl(streetViewURL)
            } catch (error) {
                console.error('Error fetching street view:', error)
            }
        }

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