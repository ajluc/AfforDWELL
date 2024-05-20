import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const PercentDial = ({percentStabilized}) => {
    return (
        <div style={{ width: 200, height: 200 }}>
            <CircularProgressbar value={percentStabilized} text={`${percentStabilized}%`}/>
        </div>
    )
}

export default PercentDial