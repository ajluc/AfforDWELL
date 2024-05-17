import Container from 'react-bootstrap/Container'
import ConstructionModal from '../components/UnderConstructionModal'

const About = () => {
    return (
        <Container>
            <ConstructionModal />
            <h1>About Us</h1>
            <p>AfforDWELL is a hub for New Yorkers to inform themselves on the city’s stabilized rental market.</p>
            <p>As the #1 most expensive rental market in America, the city of New York has an affordable housing crisis. To fight this the government provides several forms of housing support, including rent stabilization. For the apartment buildings that fall under this legislation – which covers nearly 44% of the rental housing stock – monthly rents can’t be raised by more than 3% annually. Unfortunately, even today the knowledge of these affordable apartments is primarily distributed by word of mouth, and units that are legally required to be stabilized are often rented at market rate to unknowing tenants or warehoused by owners. The only way to verify that a unit is rent stabilized is via submitting information requests one address at a time via the NYS Homes and Community Renewal portal. These requests must be reviewed by a member of the NYS HCR team, and is not a viable option for those actively looking in this fast-paced market.</p>
            <p>With AfforDWELL, we bring affordability to you. Many of NYC’s buildings that have stabilized units as reported by the Rent Guidelines Board are displayed in a convenient map format to improve accessibility and readability of this publicly provided data. The app displays key information about all available units within each building, scraped from StreetEasy: beds, baths, square footage, and amenities. The Affordable tab takes a user to a map displaying all post-2014 new construction housing projects that include income restricted units, as provided by NYC OpenData. The platform is a one-stop-shop, serving as a hub for multiple routes to affordable apartments.</p>
            <p>Unfortunately, the list provided by the RGB is not comprehensive, and the individual units with stabilization are not publicly provided by the city. AfforDWELL relies on the NYC community to crowdsource additional details: residents are able to self-verify whether or not units they’ve lived in are rent stabilized to help their community gain access to this necessary resource. Users will also be able to report whether they’ve had luck with a building’s landlords accepting Section 8 vouchers – another roadblock to renting for many.</p>
            <p>AfforDWELL seeks to empower our city’s renters to find their next home through an easy-to-use platform that brings affordable housing within reach.</p>
        </Container>
    )
}

export default About