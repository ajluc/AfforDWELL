import Card from 'react-bootstrap/Card'

const BuildingCard = ({pin, handlePinClick}) => {

    const CardType = () => {
        if (pin.project_id) {
            return (
                <Card onClick={()=> handlePinClick(pin)} >
                    <Card.Header>Affordable Housing</Card.Header>
                    <Card.Body>
                        <Card.Title>{pin.project_name}</Card.Title>
                        <Card.Text>{pin.total_units} affordable units</Card.Text>
                    </Card.Body>
                </Card>
            )
        } else if (pin.bldgno1) {
            return (
                <Card onClick={()=> handlePinClick(pin)}>
                    <Card.Header>Rent Stabilized</Card.Header>
                    <Card.Body>
                        <Card.Title>{pin.address.split(',')[0]}</Card.Title>
                        <Card.Text>(#) affordable units</Card.Text>
                    </Card.Body>
                </Card>
            )
        } else {
            return (
                <Card onClick={()=> handlePinClick(pin)}>
                    <Card.Body>
                        <Card.Title>error</Card.Title>
                    </Card.Body>
                </Card>
            )
        }
    }

    return (
        <CardType/>
    )
}

export default BuildingCard