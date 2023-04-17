import CalendarComponent from './Calender.component';
import { AppContext } from './context';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import NavButton from './NavButton';

function CalenderParent(props) {
    const [isReady, setIsReady] = React.useState(false);
    const [plans, setPlans] = React.useState([]);
    const [dates, setDates] = React.useState([]);
    const [myTrip, setMyTrip] = React.useState({});
    const location = useLocation();
    const navigate = useNavigate();
    let allTrip;
    let trip = location.state?.data || navigate("/");

    const updateTrip = async (tripToUpdate) => {
        console.log("updateTrip in PARENT")
        console.log(tripToUpdate._id);
        try {
            const { data } = await axios.post(
                `http://localhost:8080/trips/${tripToUpdate._id}`,
                tripToUpdate
            );
            //get the update trip
            if (data) {
                console.log("updated trip")
                console.log(data)
                setMyTrip(data);
                navigate('', { state: { data } })
            }

        } catch (ex) {
            console.log(ex);
        }
        console.log("insert update function in PARENT");
    }
    
    const initialTrip = async () => {
        const { data } = await axios.get(`/trips/${trip._id}`);
        console.log(data);
        setMyTrip(data);
    }

    const initializeDates = () => {
        console.log("insert initialDates PARENT")

        let datesTrip = [];
        const t = myTrip
        let startDateTrip = new Date(myTrip.StartDate);
        startDateTrip.setDate(startDateTrip.getDate() - startDateTrip.getDay());

        let endDateTrip = new Date(myTrip.FinalDate);
        endDateTrip.setDate(endDateTrip.getDate() + (6 - endDateTrip.getDay()));

        for (; startDateTrip <= endDateTrip; startDateTrip.setDate(startDateTrip.getDate() + 1)) {
            datesTrip.push(new Date(startDateTrip));
        }
        var datesProps = datesTrip.map(date => {
            return {
                year: date.getFullYear(),
                month: date.getMonth() + 1,
                day: date.getDate(),
                title: date.toLocaleString('default', { weekday: 'long' })
            }
        })
        console.log(datesProps);
        setDates(datesProps);
    }

    const initializePlans = () => {
        console.log("initualize plans function");
        const attractions = myTrip.Attractions;
        console.log(attractions)
        const plans = [];
        let plan = {
            month: 0,
            day: 0,
            events: []
        };

        dates.forEach(date => {
            let attractionsInCurrentDate = attractions.filter(attr => (new Date(attr.Start).getDate()) === date.day && (new Date(attr.Start).getMonth() + 1) === date.month);
            plan.month = date.month;
            plan.day = date.day;

            const allAttractionsInCurrentDate = attractionsInDayFunc(attractionsInCurrentDate);
            plan.events = allAttractionsInCurrentDate;

            //send copy of the object
            plans.push(structuredClone(plan))
        });

        console.log("FINISH");
        setPlans(plans);
        console.log(plans)
    }

    const attractionsInDayFunc = (attractionsArr) => {

        let attractionInDay;
        const attractionsInDayArr = [];
        attractionsArr.forEach(attraction => {
            attractionInDay = {
                allAttractionDetailes: {},
                start: 0,
                end: 0

            };
            console.log("hi attraction");
            attractionInDay.allAttractionDetailes = attraction;

            console.log(attraction);
            const atStart = new Date();
            atStart.setTime(new Date(attraction.Start).getTime());
            atStart.setHours(atStart.getHours() - 2);
            const startNum = atStart.getHours() + (atStart.getMinutes() / 60);
            attractionInDay.start = startNum;
            console.log(attractionInDay.start);
            let hoursNumStr;
            let hoursNum;
            if (attractionInDay.allAttractionDetailes.AttractionDetails == null) {
                hoursNumStr = attractionInDay.allAttractionDetailes.Break.HoursNum.toString();
                hoursNum = attractionInDay.allAttractionDetailes.Break.HoursNum;
            }

            else {
                hoursNumStr = attractionInDay.allAttractionDetailes.AttractionDetails.HoursNum.toString();
                hoursNum = attractionInDay.allAttractionDetailes.AttractionDetails.HoursNum;
            }
            const end = new Date();
            end.setTime(atStart.getTime());
            const splitNum = hoursNumStr.split('.');
            const hours = parseInt(splitNum[0]);
            const minutes = hoursNum - splitNum[0];
            const calcMinutes = Math.floor(parseFloat(minutes) * 60);
            end.setHours(atStart.getHours() + hours);
            end.setMinutes(atStart.getMinutes() + calcMinutes);
            const endNum = end.getHours() + (end.getMinutes() / 60);
            attractionInDay.end = endNum;
            console.log(attractionInDay.end);


            attractionInDay.allAttractionDetailes.Start = new Date(attraction.Start);
            attractionInDay.allAttractionDetailes.Start.setTime(attraction.Start.getTime());
            attractionInDay.allAttractionDetailes.Start.setHours(attraction.Start.getHours() - 2);
            attractionsInDayArr.push(structuredClone(attractionInDay));

        });
        return attractionsInDayArr;
    }

    useEffect(() => {
        if (plans.length !== 0) {
            setIsReady(true);
        }
    }, [plans])

    useEffect(() => {
        if (dates.length === 0) {
            return;
        }
        initializePlans();
    }, [dates]);

    useEffect(() => {
        if (myTrip === null) {
            return;
        }
        initializeDates();
        allTrip = myTrip;
        console.log(allTrip);
    }, [myTrip]);

    useEffect(() => {
        const iTrip = async () => {
            await initialTrip();
        }
        iTrip();
    }, []);

    useEffect(() => {
        console.log("first render")
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
        verifyUser();
    })
   
    return (
        <div>
            <div>
                {
                    location.state ?
                    <NavButton trip={trip} />
                    : ""
                }
            </div>
            <AppContext.Provider value={{ updateTrip, plans, myTrip}}>
                {
                    isReady ?
                        <CalendarComponent
                            dates={dates}
                            hours={[{ time: 9, backgroundColor: 'black' }, { time: 10, backgroundColor: 'black' }, { time: 11, backgroundColor: 'black' }, { time: 12, backgroundColor: 'black' }, { time: 13, backgroundColor: 'black' }, { time: 14, backgroundColor: 'black' }, { time: 15, backgroundColor: 'black' }, { time: 16, backgroundColor: 'black' }, { time: 17, backgroundColor: 'black' }, { time: 18, backgroundColor: 'black' }, { time: 19, backgroundColor: 'black' } ,{ time: 20, backgroundColor: 'black' } ,{ time: 21, backgroundColor: 'black' },{ time: 22, backgroundColor: 'black' }]}
                            plans={plans}
                        />
                        : ""
                }
            </AppContext.Provider>

        </div>
    );
}

export default CalenderParent;