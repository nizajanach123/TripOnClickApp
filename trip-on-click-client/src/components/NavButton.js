
import { useNavigate } from 'react-router-dom';
import "../css/NavButton.css";



 function NavButton(props) {
    const trip = props.trip;
    console.log("NavButton");
    console.log(trip);
    const navigate = useNavigate();

    const CalenderTrip = async (event) => {
        navigate('/Calender', {state: {data: trip}});
     }
     const MapTrip = async (event) => {
        navigate('/MapMarkers', {state: {data: trip}});
     }
     const DayByDayTrip = async (event) => {
        navigate('/DayByDay', {state: {data: trip}});
     }


    return(
        <div className="butt">
            <button className='button' onClick={(e) =>DayByDayTrip(e)} >יום אחר יום</button>
            <button className='button' onClick={(e) =>MapTrip(e)}>על המפה</button>
            <button className='button'onClick={(e) =>CalenderTrip(e)} >יומן</button>
        </div>
    )

}
export default NavButton;