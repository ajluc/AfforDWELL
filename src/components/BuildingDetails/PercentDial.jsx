import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import Container from 'react-bootstrap/Container'
import { Row } from 'react-bootstrap'


const PercentDial = ({percentStabilized}) => {
    return (
        <Container fluid className="d-flex justify-content-center align-items-center">
            <Row style={{ width: '70%', margin: '20px 0px' }}>
                <CircularProgressbar value={percentStabilized} text={`${percentStabilized}%`}/>
            </Row>

        </Container>
    )
}

export default PercentDial