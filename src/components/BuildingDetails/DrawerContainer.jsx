import Container from "react-bootstrap/Container";

const DrawerContainer = ({ isVisible }) => {
    return (
        <div style={{ width: isVisible ? '100%' : '0%', transition: 'width 0.3s', height: 'calc(100vh - 3.5rem)', overflow: 'auto', position: 'relative' }}>
            {isVisible && (
                <Container>
                    <p>placeholder</p>
                </Container>
            )}
        </div>
    )
}

export default DrawerContainer
