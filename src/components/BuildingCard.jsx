import Card from 'react-bootstrap/Card'

const BuildingCard = ({pin, handlePinClick}) => {
    return (
        <Card onClick={()=> handlePinClick(pin)}>
            <Card.Body>
                <Card.Title>{pin.project_name}</Card.Title>
                <Card.Text>{pin.total_units} affordable units</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default BuildingCard