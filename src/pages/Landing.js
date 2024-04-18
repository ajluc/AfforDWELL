import { Button, Container } from "react-bootstrap"

const Landing = () => {
    return (
        <Container>
            <h1>Is your apartment rent stabilized?</h1>
            <p>Search bar</p>
            <p>We think it should be easier for New Yorkers to find out if their apartment is rent stabilized, so we put together this resource. By scraping annual tax documents and lists published by the Rental Guidelines Board, we documented how many rent stabilized units each building in NYC has. Use the search bar above to find out more about your particular apartment, or browse the map to understand what affordable options exist near you.</p>
            <Button>View the Map</Button>
            <Button>Learn More about Rent stabilization</Button>
        </Container>
    )
}

export default Landing