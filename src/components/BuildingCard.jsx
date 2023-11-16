import Card from 'react-bootstrap/Card'

const BuildingCard = ({pin}) => {
    console.log(pin)
    return (
        <Card>
            <Card.Body>
                <Card.Title>{pin.project_name}</Card.Title>
                <Card.Text>{pin.total_units} affordable units</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default BuildingCard