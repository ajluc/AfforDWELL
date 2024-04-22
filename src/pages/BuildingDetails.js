import Container from 'react-bootstrap/Container'
import { useParams } from 'react-router-dom'

const BuildingDetails = () => {
    const { bbl } = useParams()

    return (
        <Container>
            <h1>Details</h1>
            <p>{bbl}</p>
        </Container>
    )
}

export default BuildingDetails