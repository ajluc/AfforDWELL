import Container from "react-bootstrap/Container";

const DrawerContainer = ({ isVisible, currentBuilding }) => {
    const DrawerType = () => {
        if (currentBuilding) {
            console.log(currentBuilding)
            return (
                <div>
                    <p>Yes, building exists in database</p>
                    <p>{currentBuilding.ucbbl}</p>
                </div>
            )
        } else {
            return (
                <div>
                    <p>No, building does not exist in database</p>
                </div>
            )
        }
    }
    return (
        <div style={{ width: isVisible ? '100%' : '0%', transition: 'width 0.3s', height: 'calc(100vh - 3.5rem)', overflow: 'auto', position: 'relative' }}>
            {isVisible && (
                <Container>
                    <DrawerType />
                </Container>
            )}
        </div>
    )
}

export default DrawerContainer
