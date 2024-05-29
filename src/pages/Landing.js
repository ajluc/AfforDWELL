import { Button, Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useState, useRef } from 'react'
import ConstructionModal from "../components/UnderConstructionModal.jsx"
import { SearchBox } from '@mapbox/search-js-react';

const Landing = ({ setMapSearchResult }) => {
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    const handleSearch = (query) => {
        if (query) {
            setMapSearchResult(query)
            navigate('/map')
        }
    }

    const handleClose = () => setShowModal(false)

    const learnMoreRef = useRef(null)
    const scrollToTarget = () => {
        learnMoreRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div>
            <div className="background-color">
                <ConstructionModal />
                <Container className="container-fixed-landing hero-landing">
                    <h1 className="sidekick-text">Is your nyc apartment</h1>
                    <h1 className="hero-text accent-color">RENT STABILIZED?</h1>
                    <p>We think it should be easier for New Yorkers to find out if their apartment building is rent stabilized. Use the search bar below to find out more about your particular apartment, or browse the map to understand what affordable options exist near you.</p>
                    {/* <SearchBar onSearch={handleSearch}/>
                    <SearchModal show={showModal} handleClose={handleClose}/> */}
                    <SearchBox 
                        accessToken={process.env.REACT_APP_MAPBOX_API_TOKEN}
                        onRetrieve={handleSearch}
                        placeholder='Search for a NYC address'
                        value={null}
                        options={{
                            bbox: '-74.25909,40.477399,-73.700272,40.917577',  // NYC bounding box
                            types: 'address',
                        }}
                    />
                    <div className="d-flex justify-content-center mt-3">
                        <Button onClick={() => navigate('/map')}>Explore Map</Button>
                        <p style={{margin: '10px'}}>or</p>
                        <Button onClick={scrollToTarget}>Learn More</Button>
                    </div>
                </Container>
            </div>
                <Container ref={learnMoreRef} className="container-fixed-landing" style={{height: '100vh', marginTop: '5rem'}}>
                    <p>Learn more coming soon</p>
                    <p>Learn more coming soon</p>
                    <p>Learn more coming soon</p>
                    <p>Learn more coming soon</p>
                </Container>
        </div>
    )
}

export default Landing