import CardDay from './CardDay';
import { useLocation } from 'react-router-dom';
import "../css/DayByDay.css";
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-vertical-timeline-component/style.min.css';
import car from '../Images/car.png';
import '../css/TimeLine.css';
import NavButton from './NavButton';
import bed from '../Images/bed.png'
import timeout from '../Images/time.png'
import { Button } from 'antd';
import { CalendarOutlined } from '@ant-design/icons'
import { ToastContainer, toast } from 'react-toastify';
import { HourglassBottom } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import axios from "axios";

function DayByDay() {
      
useEffect(() => {
   window.scrollTo(0, 0);
 }, []);
   const location = useLocation();
   const navigate = useNavigate()
   const scrollToRef = useRef(null);
   let trip, allAttractions;
   let first = [], days = [];

   var getDaysArray = function (start, end) {
      for (var arr = [], dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
         arr.push(new Date(dt));
      }
      return arr;
   };

   if (location.state) {
      trip = location.state.data;
      console.log(trip);
      allAttractions = trip.Attractions;
      const StartDate = trip.StartDate;
      const FinalDate = trip.FinalDate;
      console.log(StartDate);
      console.log(FinalDate);

      days = getDaysArray(new Date(StartDate), new Date(FinalDate));
      days.map((v) => v.toUTCString().slice(0, 10)).join("")
   }

   const firstEventForDate = (events, date) => {
      const dateString = new Date(date).toISOString().substring(0, 10);
      const firstEvent = events.find((event) => new Date(event.Start) >= new Date(dateString));
      return firstEvent || null;
   };


   const handleClick = (e, id) => {
      const date = e.target.innerText;
      const dayAndMonthAndYear = date.split("/");
      const day = dayAndMonthAndYear[0];
      const month = dayAndMonthAndYear[1];
      const year = dayAndMonthAndYear[2];
      const attractionsInDate = allAttractions.filter(attraction => (
         new Date(attraction.Start).getMonth() + 1) == month &&
         new Date(attraction.Start).getDate() == day &&
         new Date(attraction.Start).getFullYear() == year);
      if (attractionsInDate.length === 0) {
         generateError("לא קיימות אטרקציות ביום זה")
         return;
      }
      const element = document.getElementById(`object-${id}`);
      element.scrollIntoView({ behavior: 'smooth' });
   }

   const generateError = (error) =>
      toast.error(error, {
         position: "top-left",
      });

   useEffect(() => {
      const verifyUser = async () => {
         const { data } = await axios.post(
            "http://localhost:8080/",
            {},
            {
               withCredentials: true,
            }
         );
         if (!data.status) {
            localStorage.clear();
            // removeCookie("jwt");
            navigate("/login");
         }

      };
      console.log("first render")
      verifyUser();
   })

   useEffect(() => {
      location.state?.data || navigate("/");
   }, [])



   return (
      <div >
         <div>
            {
               location.state ?
                  <NavButton trip={trip} />
                  : ""
            }
         </div>
         <div style={{ display: 'flex' }}>
            <div className="DayByDay-dates-div">
               {days.map((date) => {
                  const eventId = firstEventForDate(allAttractions, date)?._id;
                  first.push(eventId)


                  return (

                     <div key={eventId} style={{}}>
                        <span onClick={(e) => handleClick(e, eventId)}>
                           <Button className="dates-dayByDay" >
                              {date.getDate() + "/" + ((date.getMonth()) + 1) + "/" + (date.getFullYear())}
                              <CalendarOutlined style={{ fontSize: '20px' }} />
                           </Button>
                        </span>
                     </div>
                  );
               })}

            </div>
            <div className='pagefix'>


               <div className='cardsmap'>
                  {
                     allAttractions ?
                        allAttractions.map((item, index) => {
                           const d = new Date();
                           d.setTime(new Date(item.Start).getTime());
                           let text = d.toString();
                           const daymonth = d.getDate() + "/" + ((d.getMonth()) + 1);

                           const startObj = new Date(item.Start);
                           startObj.setHours(startObj.getHours() - 2)

                           let endObj = new Date(item.Start);
                           let hoursDuration;
                           if (item.AttractionDetails) {
                              hoursDuration = item.AttractionDetails.HoursNum
                           }
                           else {
                              hoursDuration = item.Break.HoursNum;
                           }
                           endObj.setHours(endObj.getHours() + hoursDuration - 2)

                           const startHour = startObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                           const endHour = endObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

                           const travelTime = (item.TravelTimeFromPrev / 60);
                           let roundedNumber = Math.round(travelTime);


                           return (

                              (item.AttractionDetails === null) ?
                                 <div>


                                 </div>
                                 :
                                 <div>
                                    {first.includes(item._id) ? <img src={bed} class="bed"></img>
                                       : console.log("no first")}
                                    <div key={item._id} id={`object-${item._id}`} ref={scrollToRef} >
                                    </div>
                                    <div className="timeline-container">
                                       <div className="timeline">
                                          <img src={car} alt='car' className='car'></img>
                                          <div className='nextToEachOther'>
                                             <img src={timeout} className='time'></img>
                                             <div className="travelTime">{" " + roundedNumber + " "} <p className='min'> דקות </p></div>


                                          </div>

                                          <div>

                                             {allAttractions[index - 1] && allAttractions[index - 1].AttractionDetails == null && <>
                                                <span className=''> הפסקה<span>{" " + Math.round(allAttractions[index - 1].Break.HoursNum * 60) + " "} </span> דקות </span>
                                                <span style={{ color: 'white' }}></span>
                                                <HourglassBottom fontSize='large' />

                                                <br />
                                             </>}

                                             {item.AttractionDetails &&
                                                <CardDay
                                                   className='cards'
                                                   header={item.AttractionDetails.Name}
                                                   body={item.AttractionDetails.Description}
                                                   Address={daymonth + ' ' + startHour + '-' + endHour}
                                                   Url={item.AttractionDetails.Url}
                                                   Image={item.AttractionDetails.Image}

                                                ></CardDay>}



                                          </div>
                                       </div>
                                    </div>

                                 </div>

                           );

                        })
                        : ""
                  }
               </div>


               <div>
               </div>
            </div>
         </div>

         <ToastContainer rtl={true} />
      </div>


   );
}



export default DayByDay;