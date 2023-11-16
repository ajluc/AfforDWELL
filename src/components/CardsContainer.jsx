const CardsContainer = ({ isVisible }) => {
    return (
        <div style={{ width: isVisible ? '100%' : '0%', transition: 'width 0.3s' }}>
            {isVisible && <p>Cards here</p>}
        </div>
    );
};

export default CardsContainer;
