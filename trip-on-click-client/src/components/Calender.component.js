import '../css/Calender.css'
import Button2 from "./DesignedComponents/ButtonPop";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import Typography from '@mui/joy/Typography';
import React, { useState, useEffect, useContext } from 'react';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,

} from 'mdb-react-ui-kit';
import Button from '@mui/joy/Button';
import DistanceAndDuration from './Map';
import { AppContext } from './context';
import { TextField, IconButton } from "@material-ui/core";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Delete } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Edit, EditAttributes } from '@mui/icons-material';

const CalendarComponent = (props) => {
    const [open, setOpen] = React.useState(false);
    const [idToDelete, setIdToDelete] = React.useState(null)
    const [value, setValue] = useState('');
    const [disabled, setDisabled] = useState(false);
    const { myTrip } = useContext(AppContext);
    const { updateTrip } = useContext(AppContext);
    const attractionsNotUsed = myTrip.AttractionsNotUsed;
    const attractionArr = myTrip.Attractions;
    const PLANS = props.plans;
    const hours = props.hours;
    const dates = props.dates;
    const [attractionsNotUsedArr, setAttractionsNotUsedArr] = useState([])
    const [attractionUsedArr, setAttractionUsedArr] = useState([])
    const [centredModal, setCentredModal] = useState(false);
    const [centredModalDelete, setCentredModalDelete] = useState(false);
    const [attractionClickedId, setattractionClickedId] = useState("");
    const [attractionClicked, setattractionClicked] = useState(null);
    const [dayIndexAttractionClicked, setdayIndexAttractionClicked] = useState(null);
    const categoriesPreferences = [{ name: "אקסטרים" }, { name: "טבע" }, { name: "תרבות" }, { name: "רחצה" }];
    const [checkedState, setCheckedState] = useState(new Array(categoriesPreferences.length).fill(false));
    const [notUsedAttFilter, setNotUsedAttFilter] = useState([]);
    const [notUsedAttractionClicked, setNotUsedAttractionClicked] = useState(null);
    const [relevantAttractions, setRelevantAttractions] = useState([]);
    const [plansArr, setPlansArr] = useState([]);
    const [myPlans, setMyPlans] = useState([]);
    const [startDayIndex, setStartDayIndex] = useState(0);
    const [endDayIndex, setEndDayIndex] = useState(6);
  

    let flag = 0;
    let attractionObject = {
        allAttractionDetailes: {
            AttractionDetails: String,
            Break: {
                HoursNum: Number,
                End: Date
            },
            Start: Date,
            TravelTimeFromPrev: Number,
            DistanceFromPrev: Number
        },
        end: "",
        start: ""

    };

    let nextAttractionObject = {

        allAttractionDetailes: {
            AttractionDetails: String,
            Break: {
                HoursNum: Number,
                End: Date
            },
            Start: Date,
            TravelTimeFromPrev: Number,
            DistanceFromPrev: Number
        },
        end: "",
        start: ""
    };

    let breakObj = {
        allAttractionDetailes: {
            AttractionDetails: String,
            Break: {
                HoursNum: Number,
                End: Date
            },
            Start: Date,
            TravelTimeFromPrev: Number,
            DistanceFromPrev: Number
        },
        end: "",
        start: ""

    };


    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedState(updatedCheckedState);
    };

    const toggleClose = () => {
        console.log("Byyy");
        setValue('');
        setCentredModal(!centredModal);
    }

    const toggleCloseDelete = () => {
        setValue('');
        setCentredModalDelete(!centredModalDelete);

    }

    const toggleDelete = (id) => {
        const notUsedArr = attractionsNotUsedArr
        const planArr = []
        console.log(id);
    }

    const showPrevWeek = () => {
        setStartDayIndex(startDayIndex - 7);
        setEndDayIndex(endDayIndex - 7);
    }

    const showNextWeek = () => {
        setStartDayIndex(startDayIndex + 7);
        setEndDayIndex(endDayIndex + 7);
    }

    const updateEvent = async () => {
        //here we wiil need to UPDATE in server
        setDisabled(true);
        console.log("the current attraction day index:")
        console.log(dayIndexAttractionClicked)
        // const notUsedArr = attractionsNotUsedArr;
        let notUsedArr = myTrip.AttractionsNotUsed;
        //const planArr = []
        const attractionsArr = attractionArr;
        console.log(attractionsArr);
        if (notUsedAttractionClicked != null) {

            // נכניס את האטרקציה הנוכחית לתוך המערך של האטרקציות שלא בשימוש 
            //נמצא איפה ממוקמת האטרק החלופית במערך ושם נשים את הדיטאלס של הנוכחית 
            const NotUsedAttractionIndex = myTrip.AttractionsNotUsed.findIndex(obj => obj._id === notUsedAttractionClicked._id);
            notUsedArr.splice(NotUsedAttractionIndex, 1, attractionClicked.allAttractionDetailes.AttractionDetails);


            //תמצא איפה ממוקמת האטרקציה הנוכחית במערך האיבנטים של אותו יום
            const eventsArr = props.plans[dayIndexAttractionClicked].events;

            let currentAttIndexInEventArr;
            for (let i = 0; i < eventsArr.length; i++) {
                if (eventsArr[i].allAttractionDetailes.AttractionDetails)
                    if (eventsArr[i].allAttractionDetailes.AttractionDetails._id === attractionClicked.allAttractionDetailes.AttractionDetails._id) {
                        currentAttIndexInEventArr = i;
                        break;
                    }
            }

            //הכתובת של האטרקציה החלופית
            const notUsedAttractionClickedAddress = notUsedAttractionClicked.Address.City + " + " + notUsedAttractionClicked.Address.Number + " + " + notUsedAttractionClicked.Address.Street;
            //פה תתחיל למלא באוביקט מסוג אטרקציה שכן בשימוש, את הנתונים של החלופית
            attractionObject.allAttractionDetailes.AttractionDetails = notUsedAttractionClicked;
            attractionObject.allAttractionDetailes.Break = null;
            //זמן ההתחלה של החלופית יהיה כמו ההתחלה של הנוכחית (לפחות בשלב הזה)
            attractionObject.allAttractionDetailes.Start = new Date();
            const attractionClickedDate = attractionClicked.allAttractionDetailes.Start;
            attractionObject.allAttractionDetailes.Start.setTime(new Date(attractionClickedDate).getTime());
            console.log(attractionObject.allAttractionDetailes.Start);
            attractionObject.allAttractionDetailes.Start.setHours(attractionObject.allAttractionDetailes.Start.getHours());
            console.log("afterrr")
            console.log(attractionObject.allAttractionDetailes.Start);

            const startNum = attractionObject.allAttractionDetailes.Start.getHours() + (attractionObject.allAttractionDetailes.Start.getMinutes() / 60);
            attractionObject.start = startNum;
            const start = new Date(attractionObject.allAttractionDetailes.Start);
            const hoursNum = notUsedAttractionClicked.HoursNum;
            const end = new Date();
            end.setTime(start.getTime());
            end.setHours(start.getHours() + hoursNum);
            const endNum = end.getHours() + (end.getMinutes() / 60);
            attractionObject.end = endNum;
            console.log(attractionObject.end);
            console.log(attractionObject.start);

            //אם הנוכחית היא הראשונה באותו יום אין צורך במרחק וזמן מהקודם
            console.log(currentAttIndexInEventArr);
            if (currentAttIndexInEventArr === 0) {
                console.log("the first att in the day ")
                attractionObject.allAttractionDetailes.DistanceFromPrev = 0;
                attractionObject.allAttractionDetailes.TravelTimeFromPrev = 0;
                console.log(attractionObject)
            }

            // אבל אם הנוכחית לא הראשונה באותו יום
            else {
                console.log("nottt the first att in the day ")
                let prevAttraction = props.plans[dayIndexAttractionClicked].events[currentAttIndexInEventArr - 1];
                //אם הקודמת זה הפסקה 
                if (prevAttraction.allAttractionDetailes.AttractionDetails === null)
                    prevAttraction = props.plans[dayIndexAttractionClicked].events[currentAttIndexInEventArr - 2];


                const prevAttractionAddress = prevAttraction.allAttractionDetailes.AttractionDetails.Address.City + " + " + prevAttraction.allAttractionDetailes.AttractionDetails.Address.Number + " + " + prevAttraction.allAttractionDetailes.AttractionDetails.Address.Street;
                const disAndDur = await (DistanceAndDuration(prevAttractionAddress, notUsedAttractionClickedAddress));
                //מלא באוביקט את המרחק והזמן נסיעה מהקודמת של הנוכחית אל מול החלופית
                attractionObject.allAttractionDetailes.DistanceFromPrev = disAndDur.distance;
                attractionObject.allAttractionDetailes.TravelTimeFromPrev = disAndDur.duration;
                console.log(attractionObject);


            }
            //  אם הנוכחית היא לא האטרקציה האחרונה באותו יום
            if (currentAttIndexInEventArr !== props.plans[dayIndexAttractionClicked].events.length - 1) {

                console.log(" its not the last att in the day ");

                let nextAttraction = props.plans[dayIndexAttractionClicked].events[currentAttIndexInEventArr + 1];

                //אם הבא זה הפסקה
                if (nextAttraction.allAttractionDetailes.AttractionDetails === null)
                    nextAttraction = props.plans[dayIndexAttractionClicked].events[currentAttIndexInEventArr + 2];

                const nextAttractionAddress = nextAttraction.allAttractionDetailes.AttractionDetails.Address.City + " + " + nextAttraction.allAttractionDetailes.AttractionDetails.Address.Number + " + " + nextAttraction.allAttractionDetailes.AttractionDetails.Address.Street;
                const disAndDurNext = await (DistanceAndDuration(notUsedAttractionClickedAddress, nextAttractionAddress));
                nextAttractionObject.allAttractionDetailes.AttractionDetails = nextAttraction.allAttractionDetailes.AttractionDetails;


                nextAttractionObject.allAttractionDetailes.Start = new Date();
                const x = nextAttraction.allAttractionDetailes.Start;
                console.log(x);
                nextAttractionObject.allAttractionDetailes.Start.setTime((x).getTime());
                console.log(nextAttractionObject.allAttractionDetailes.Start);
                //??
                nextAttractionObject.allAttractionDetailes.Start.setHours(nextAttractionObject.allAttractionDetailes.Start.getHours());
                console.log("hii")
                console.log(nextAttractionObject.allAttractionDetailes.Start)

                const startNumN = nextAttractionObject.allAttractionDetailes.Start.getHours() + (nextAttractionObject.allAttractionDetailes.Start.getMinutes() / 60);
                nextAttractionObject.start = startNumN;
                const startN = new Date(nextAttractionObject.allAttractionDetailes.Start);
                const hoursNumN = nextAttraction.allAttractionDetailes.AttractionDetails.HoursNum;
                const endN = new Date();
                endN.setTime(startN.getTime());
                endN.setHours(startN.getHours() + hoursNumN);
                const endNumN = endN.getHours() + (endN.getMinutes() / 60);
                nextAttractionObject.end = endNumN;

                nextAttractionObject.allAttractionDetailes.DistanceFromPrev = disAndDurNext.distance;
                nextAttractionObject.allAttractionDetailes.TravelTimeFromPrev = disAndDurNext.duration;
                nextAttractionObject.allAttractionDetailes.Break = null;

                //אם זמן הפעילות של החלופית קצר משל הנוכחית שאותה מחליפה 
                const hoursnum = attractionObject.allAttractionDetailes.AttractionDetails.HoursNum;

                console.log("the next att new details are:");
                console.log(nextAttractionObject);
                //if (hoursnum < attractionClicked.AttractionDetails.HoursNum) {

                //???

                const startCurrent = new Date();
                startCurrent.setTime(attractionObject.allAttractionDetailes.Start.getTime());
                startCurrent.setHours(startCurrent.getHours());

                const endOfCurrent = new Date();
                endOfCurrent.setTime(startCurrent.getTime());
                endOfCurrent.setHours(endOfCurrent.getHours() + hoursnum);
                console.log(hoursnum);
                console.log(startCurrent);
                console.log(endOfCurrent);

                const arrivalTime = endOfCurrent.getHours() + (endOfCurrent.getMinutes() / 60) + (nextAttractionObject.allAttractionDetailes.TravelTimeFromPrev / 3600);
                console.log(arrivalTime);

                const startNext = new Date();
                startNext.setTime(new Date(nextAttractionObject.allAttractionDetailes.Start).getTime());
                startNext.setHours(startNext.getHours());
                const startNextTime = startNext.getHours() + (startNext.getMinutes() / 60);
                console.log(startNext);
                console.log(startNextTime);

                if (arrivalTime < startNextTime) {
                    //יוצרים הפסקה כי הגענו לפני הזמן
                    console.log("i came before so i need to add a break")
                    //זמני
                    breakObj.allAttractionDetailes.AttractionDetails = null;// nextAttractionObject.allAttractionDetailes.AttractionDetails;
                    breakObj.allAttractionDetailes.DistanceFromPrev = 0;
                    breakObj.allAttractionDetailes.TravelTimeFromPrev = 0;
                    breakObj.allAttractionDetailes.Break.HoursNum = startNextTime - arrivalTime;
                    breakObj.allAttractionDetailes.Break.End = startNext;
                    console.log(breakObj.allAttractionDetailes.Break.End)
                    const hoursNumStr = breakObj.allAttractionDetailes.Break.HoursNum.toString();
                    console.log(hoursNumStr)
                    const splitNum = hoursNumStr.split('.');
                    const hours = splitNum[0];
                    const minutes = breakObj.allAttractionDetailes.Break.HoursNum - splitNum[0];
                    const calcMinutes = Math.floor(minutes * 60);
                    console.log(hours + "  " + minutes);
                    breakObj.allAttractionDetailes.Start = new Date();
                    breakObj.allAttractionDetailes.Start.setTime(endOfCurrent.getTime());
                    breakObj.allAttractionDetailes.Start.setHours(breakObj.allAttractionDetailes.Break.End.getHours() - hours);
                    breakObj.allAttractionDetailes.Start.setMinutes(breakObj.allAttractionDetailes.Break.End.getMinutes() - calcMinutes);
                    console.log("the start of the break");
                    console.log(breakObj.allAttractionDetailes.Start);

                    const startBNum = breakObj.allAttractionDetailes.Start.getHours() + (breakObj.allAttractionDetailes.Start.getMinutes() / 60);
                    breakObj.start = startBNum;
                    const startB = new Date(breakObj.allAttractionDetailes.Start);
                    // const hoursNumB = startNextTime - arrivalTime;
                    const endB = new Date();
                    endB.setTime(nextAttractionObject.allAttractionDetailes.Start.getTime());
                    endB.setHours(nextAttractionObject.allAttractionDetailes.Start.getHours());
                    const endNumB = endB.getHours() + (endB.getMinutes() / 60);
                    breakObj.end = endNumB;

                    //כעת באותו יום במקום של הנוכחית במערך האיבנטים -> שים את האוביקט שיצרתי שבו יושבת האטרקציה החלופית
                    props.plans[dayIndexAttractionClicked].events.splice(currentAttIndexInEventArr, 1, attractionObject);
                    props.plans[dayIndexAttractionClicked].events.splice(currentAttIndexInEventArr + 1, 0, breakObj);
                    props.plans[dayIndexAttractionClicked].events.splice(currentAttIndexInEventArr + 2, 1, nextAttractionObject);
                    flag = 1;
                    console.log("after adding a break");

                }
                else if (arrivalTime > startNextTime) {
                    //call to function
                    const late = arrivalTime - startNextTime;
                    notUsedArr = calcTheDayIfWeLate(arrivalTime, late, dayIndexAttractionClicked, currentAttIndexInEventArr + 1, notUsedArr);
                    // notUsedArr = res;
                    console.log(notUsedArr);
                    console.log(props.plans);
                    props.plans[dayIndexAttractionClicked].events.splice(currentAttIndexInEventArr, 1, attractionObject);

                }
                else {
                    //כעת באותו יום במקום של הנוכחית במערך האיבנטים -> שים את האוביקט שיצרתי שבו יושבת האטרקציה החלופית
                    props.plans[dayIndexAttractionClicked].events.splice(currentAttIndexInEventArr, 1, attractionObject);
                    props.plans[dayIndexAttractionClicked].events.splice(currentAttIndexInEventArr + 1, 1, nextAttractionObject);
                }

            }
            //אם האחרונה באותו יום
            if (currentAttIndexInEventArr === props.plans[dayIndexAttractionClicked].events.length - 1) {
                props.plans[dayIndexAttractionClicked].events.splice(currentAttIndexInEventArr, 1, attractionObject);
            }

            const notUsedServer = notUsedAttractionsToServer(notUsedArr);
            //לבסוף נעשה סאט למערך הלא בשימוש ולמערך הכן בשימוש 
            setAttractionsNotUsedArr(notUsedServer);

            console.log("not used arr after change");
            console.log(attractionsNotUsedArr);

            const plans = props.plans;
            const attractionsUsedToServer = attractionsToServer(structuredClone(plans));
            console.log(attractionsUsedToServer);
            setAttractionUsedArr(attractionsUsedToServer);

            console.log("used arr after change");
            const planArr = props.plans;
            console.log(planArr);

            setCentredModal(!centredModal);

        }
        setValue('');
        setDisabled(false);
    }

    const calcTheDayIfWeLate = (arrivalTime, late, dayIndexAttractionClicked, firstAttToUpdateIndex, notUsedArr) => {
        if (props.plans[dayIndexAttractionClicked].events[firstAttToUpdateIndex].allAttractionDetailes.AttractionDetails === null) {
            //the next is a break , so i remove this break;
            props.plans[dayIndexAttractionClicked].events.splice(firstAttToUpdateIndex, 1);
        }
        for (let i = firstAttToUpdateIndex; i < props.plans[dayIndexAttractionClicked].events.length; i++) {
            //if its an attractioin
            let hoursNum;
            let flag = 0;
            const splitNum = (late.toString()).split('.');
            const hours = splitNum[0];
            const minutes = late - splitNum[0];
            let start;
            let endTime;
            if (props.plans[dayIndexAttractionClicked].events[i].allAttractionDetailes.AttractionDetails) {
                hoursNum = props.plans[dayIndexAttractionClicked].events[i].allAttractionDetailes.AttractionDetails.HoursNum;
                //calc the new Start
                start = new Date();
                start.setTime(new Date(props.plans[dayIndexAttractionClicked].events[i].allAttractionDetailes.Start).getTime());
                console.log(start.getHours());
                start.setHours(start.getHours() + parseInt(hours));
                start.setMinutes(start.getMinutes() + (parseFloat(minutes) * 60));

                //check about closing hour
                endTime = new Date();
                endTime.setTime(start.getTime());
                endTime.setHours(endTime.getHours() + hoursNum);
                const endClockFormat = `${endTime.getHours()}:${endTime.getMinutes()}`;
                if (endClockFormat <= props.plans[dayIndexAttractionClicked].events[i].allAttractionDetailes.AttractionDetails.ClosingHours) {
                    props.plans[dayIndexAttractionClicked].events[i].allAttractionDetailes.Start = start;
                    const startTime = start.getHours() + (start.getMinutes() / 60);
                    console.log(start);
                    console.log(startTime);
                    props.plans[dayIndexAttractionClicked].events[i].start = startTime;
                    props.plans[dayIndexAttractionClicked].events[i].end = startTime + hoursNum;
                }
                else
                    flag = 1;
            }
            else {
                hoursNum = props.plans[dayIndexAttractionClicked].events[i].allAttractionDetailes.Break.HoursNum;
                const eventI = props.plans[dayIndexAttractionClicked].events[i];
                const splitNum = (eventI.start.toString()).split('.');
                // const hours = splitNum[0];
                const minutes = late - splitNum[0];
                const endBreak = new Date();
                endBreak.setTime(new Date(eventI.Break.End).getTime());
                endBreak.setHours(endBreak.getHours() + parseInt(hours));
                endBreak.setMinutes(endBreak.getMinutes() + minutes * 60);
                props.plans[dayIndexAttractionClicked].events[i].Break.End = endBreak;
            }
            if (flag === 1) {
                for (let j = i; j < props.plans[dayIndexAttractionClicked].events.length; j++) {
                    notUsedArr.splice(notUsedArr.length, 0, props.plans[dayIndexAttractionClicked].events[j].allAttractionDetailes.AttractionDetails);
                }
                const l = props.plans[dayIndexAttractionClicked].events.length;
                props.plans[dayIndexAttractionClicked].events.splice(i, 1);
                for (let j = i + 1; j < l; j++) {
                    props.plans[dayIndexAttractionClicked].events.splice(j - 1, 1);
                }
                return notUsedArr;
            }

        }
        return notUsedArr;
    }

    const notUsedAttractionsToServer = (notUsedArr) => {
        const notUsedArrToServer = [];
        notUsedArr.forEach(attraction => {
            delete attraction.start;
            delete attraction.end;
            notUsedArrToServer.push(attraction);
        });
        console.log("notUsedattractionsToServer function");
        console.log(notUsedArrToServer);
        return notUsedArrToServer;
    }

    const attractionsToServer = (plansFromProps) => {
        const attractionsToUpdateInServer = [];
        plansFromProps.forEach(plan => {
            plan.events.forEach(event => {
                const start = new Date();
                start.setTime(new Date(event.allAttractionDetailes.Start).getTime());
                start.setHours(start.getHours() + 2);
                event.allAttractionDetailes.Start = start;
                delete event.start;
                delete event.end;
                attractionsToUpdateInServer.push(event.allAttractionDetailes);
            })
        });

        return attractionsToUpdateInServer;
    }

    const handleShow = (id) => {
        let planIndex = props.plans.reduce((res, elem, index) => {
            const attractionsOnly = elem.events.filter(at => at.allAttractionDetailes.AttractionDetails !== null);
            if (typeof attractionsOnly.find(event => event.allAttractionDetailes.AttractionDetails._id === id) !== "undefined") {
                return index
            }
            return res;
        }, 0)

        setdayIndexAttractionClicked(planIndex);
        setattractionClickedId(id);
        //call POPUP
        setRelevantAttractions([])
        setCentredModal(!centredModal);

    }

    const handleShowDelete = async (id) => {
        console.log("Insert DELETE in child")
        console.log(idToDelete);
        let breakObj = {
            allAttractionDetailes: {
                AttractionDetails: String,
                Break: {
                    HoursNum: Number,
                    End: Date
                },
                Start: Date,
                TravelTimeFromPrev: Number,
                DistanceFromPrev: Number
            },
            end: "",
            start: ""
        };
        let planIndex = props.plans.reduce((res, elem, index) => {
            if (typeof elem.events.filter(event => event.allAttractionDetailes.AttractionDetails !== null).find(event => event.allAttractionDetailes.AttractionDetails._id === idToDelete) !== "undefined") {
                return index
            }
            return res;
        }, 0);

        const notUsedArr = myTrip.AttractionsNotUsed;
        const eventArr = props.plans[planIndex].events;

        let currentAttIndexInEventArr;
        for (let i = 0; i < eventArr.length; i++) {
            if (eventArr[i].allAttractionDetailes.AttractionDetails)
                if (eventArr[i].allAttractionDetailes.AttractionDetails._id === idToDelete) {
                    currentAttIndexInEventArr = i;
                    break;
                }
        }

        const attractionClickedDetails = eventArr[currentAttIndexInEventArr].allAttractionDetailes.AttractionDetails;
        breakObj.allAttractionDetailes.AttractionDetails = null;
        breakObj.allAttractionDetailes.DistanceFromPrev = 0;
        breakObj.allAttractionDetailes.TravelTimeFromPrev = 0;
        breakObj.allAttractionDetailes.Start = new Date();
        breakObj.allAttractionDetailes.Start.setTime(new Date(eventArr[currentAttIndexInEventArr].allAttractionDetailes.Start).getTime());
        breakObj.allAttractionDetailes.Break.End = new Date();
        breakObj.allAttractionDetailes.Break.End.setTime(breakObj.allAttractionDetailes.Start.getTime());
        breakObj.allAttractionDetailes.Break.End.setHours(breakObj.allAttractionDetailes.Break.End.getHours() + attractionClickedDetails.HoursNum);
        breakObj.allAttractionDetailes.Break.HoursNum = attractionClickedDetails.HoursNum;

        const startNum = breakObj.allAttractionDetailes.Start.getHours() + (breakObj.allAttractionDetailes.Start.getMinutes() / 60);
        breakObj.start = startNum;
        const start = new Date(breakObj.allAttractionDetailes.Start);
        const end = new Date();
        end.setTime(start.getTime());
        end.setHours(start.getHours() + attractionClickedDetails.HoursNum);
        const endNum = end.getHours() + (end.getMinutes() / 60);
        breakObj.end = endNum;

        //מוסיפה את פרטי האטרקציה לסוף המערך של אלו שלא בשימוש
        console.log(attractionClickedDetails);
        notUsedArr.splice(notUsedArr.length, 0, attractionClickedDetails);

        props.plans[planIndex].events.splice(currentAttIndexInEventArr, 1);
        const planArr = props.plans;

        const usedArr = attractionsToServer(planArr);

        const notUsedArray = notUsedAttractionsToServer(notUsedArr);

        await updateTripInChild(usedArr, notUsedArray);
        setOpen(false)
    }

    const categoryFilter = (filterArr) => {

        //filter by categories the user want 
        const filterCategories = []
        if (checkedState[0] === true) {
            filterArr.filter(item => {
                if (item.Category === 'אקסטרים') {
                    filterCategories.push(item);
                }
            });
            console.log("print after filter by extreme category")
            console.log(filterCategories)

        }
        if (checkedState[1] === true) {
            filterArr.filter(item => {
                if (item.Category === 'טבע') {
                    filterCategories.push(item);
                }
            });
            console.log("print after filter by nature category")

        }
        if (checkedState[2] === true) {
            filterArr.filter(item => {
                if (item.Category === 'תרבות') {
                    filterCategories.push(item);

                }
            }); console.log("print after filter by culture category")

        }
        if (checkedState[3] === true) {
            filterArr.filter(item => {
                if (item.Category === 'רחצה') {
                    filterCategories.push(item);

                }
            });

        }
        return filterCategories;

    }

    const filterNotUsedAttractions = async () => {
        const filterArr = [];
        // filter by hours (hours of new <= hours of current )
        const notUsedArr = myTrip.AttractionsNotUsed;
        console.log(myTrip)
        notUsedArr.filter(item => {
            console.log("hours: " + item.HoursNum)
            console.log("att clicked hours: " + attractionClicked.allAttractionDetailes.AttractionDetails.HoursNum)
            if (item.HoursNum <= attractionClicked.allAttractionDetailes.AttractionDetails.HoursNum)
                filterArr.push(item);
        });


        if (filterArr.length != 0) {
            const categoryArr = categoryFilter(filterArr);
            if (checkedState[0] != true && checkedState[1] != true && checkedState[2] != true && checkedState[3] != true) {
                console.log("filter without categories")
                setRelevantAttractions(filterArr)

            }
            else {
                console.log("filter with categories")
                setRelevantAttractions(categoryArr)
            }


        }
        else
            setRelevantAttractions([])
        console.log(relevantAttractions)

    }

    const updateTripInChild = async (attractionUsedArr, attractionsNotUsedArr) => {
        console.log("hi updateTripInChild method ");
        const trip = myTrip;
        trip.Attractions = attractionUsedArr;
        trip.AttractionsNotUsed = attractionsNotUsedArr;
        console.log(trip);
        console.log("UPDATE TRIP IN CHILD");
        await updateTrip(trip);
    }

    const clickOnDeleteAndPassId = (id) => {
        console.log("clickOnDeleteAndPassId");
        console.log(id);
        setIdToDelete(id);
        setOpen(true)
    }

    const handleClick = (e) => {
        e.preventDefault();
        window.open(attractionClicked.allAttractionDetailes.AttractionDetails.Url, "_blank");
    }

    useEffect(() => {
        if (attractionClickedId === "" && dayIndexAttractionClicked === null) {
            return;
        }

        console.log(props.plans[dayIndexAttractionClicked]);
        console.log("find attraction in plan[dayIndexAttractionClicked]")

        let attractionClicked = props.plans[dayIndexAttractionClicked].events.filter(event => event.allAttractionDetailes.AttractionDetails !== null).find(event => event.allAttractionDetailes.AttractionDetails._id == attractionClickedId);
        console.log(attractionClicked);
        setattractionClicked(attractionClicked);



    }, [attractionClickedId, dayIndexAttractionClicked]);

    useEffect(() => {
        if (notUsedAttFilter.length === 0)
            return;
        console.log("Yes")


    }, [notUsedAttFilter])
    
    useEffect(() => {
        if (attractionUsedArr.length === 0 || attractionsNotUsedArr.length === 0) { return; }
        updateTripInChild(attractionUsedArr, attractionsNotUsedArr);
    }, [attractionUsedArr, attractionsNotUsedArr])

    useEffect(() => {
        setAttractionsNotUsedArr(attractionsNotUsed)
        setPlansArr(PLANS)
    }, [])

    return (
        <div >
            <div className='allPage'>
                <div className='wrapper'>
                    <IconButton disabled={startDayIndex == 0} onClick={showPrevWeek} aria-label="delete">
                        <ArrowForwardIosIcon />
                    </IconButton>

                    <div className=''>
                        <div className="title-time-wrapper"></div>
                        <div className='hours-wrapper'>
                            {hours.map(
                                hour => <div className='calendar-time-wrapper'><div className='before' />{`${hour.time}:00`}</div>
                            )}
                        </div>
                    </div>

                    {dates.filter((date, index) => index >= startDayIndex && index <= endDayIndex).map(date => {
                        return (

                            <div className='calendar'>
                                <div className="title-wrapper"><div className='title'><div>{`${date.title}`}</div><div>{`${date.day}/${date.month}/${date.year}`}</div></div><div className='title-before' /></div>
                                <div className='hours-wrapper'>
                                    {
                                        props.plans.map((plan) => (plan.month === date.month && plan.day === date.day) &&
                                            plan.events.map(e =>
                                                <div style={{ height: (e.end - e.start) * (400 / hours.length), top: (e.start - hours[0].time) * (400 / hours.length) }}
                                                    className='plan' >
                                                    {
                                                        (e.allAttractionDetailes.AttractionDetails !== null) &&
                                                        <div className='attractionBox'>
                                                            <Typography className='attName' noWrap style={{ width: '100px' }}>
                                                                {e.allAttractionDetailes.AttractionDetails.Name}
                                                            </Typography>
                                                            <div className="buttonsOfAttraction">
                                                                <React.Fragment>
                                                                    {/* <Delete   id={e.allAttractionDetailes.AttractionDetails._id} onClick={(e) => clickOnDeleteAndPassId(e)} style={{cursor:"pointer"}}></Delete> */}
                                                                     {/* <Button
                                                                    className='attButton'

                                                                        variant="outlined"
                                                                        color="danger"
                                                                        id={e.allAttractionDetailes.AttractionDetails._id}
                                                                        onClick={(e) => clickOnDeleteAndPassId(e)}
                                                                    >מחק</Button>  */}
                                                                    <DeleteIcon onClick={ () => clickOnDeleteAndPassId(e.allAttractionDetailes.AttractionDetails._id)} fontSize="medium" style={{ cursor: 'pointer' }}/>

                                                                    <Modal open={open} onClose={() => setOpen(false)}> 
                                                                        <ModalDialog
                                                                            variant="outlined"
                                                                            role="alertdialog"
                                                                            aria-labelledby="alert-dialog-modal-title"
                                                                            aria-describedby="alert-dialog-modal-description"
                                                                        >
                                                                            <Typography
                                                                                id="alert-dialog-modal-title"
                                                                                component="h2"
                                                                                startDecorator={<WarningRoundedIcon />}
                                                                            >
                                                                                TripOnClick
                                                                            </Typography>
                                                                            <Divider />
                                                                            <Typography id="alert-dialog-modal-description" textColor="text.tertiary">
                                                                               ?האם בטוח שתרצה למחוק את האטרקציה
                                                                            </Typography>
                                                                            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 2 }}>
                                                                                <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
                                                                                    ביטול
                                                                                </Button>
                                                                                <button className='deleteB' type="button" id={e.allAttractionDetailes.AttractionDetails._id} onClick={() => { handleShowDelete(e.allAttractionDetailes.AttractionDetails._id) }}  >מחק</button>
                                                                            </Box>
                                                                        </ModalDialog>
                                                                    </Modal>
                                                                </React.Fragment>
                                                                {/* <Button
                                                                 className='attButton'
                                                                    variant="outlined"
                                                                    color="primary"
                                                                    id={e.allAttractionDetailes.AttractionDetails._id}
                                                                    // endDecorator={<DeleteForever />}
                                                                    onClick={(e) => { handleShow(e.target.id) }}
                                                                >
                                                                    עדכון
                                                                </Button> */}
                                                           <Edit onClick={ () => { handleShow(e.allAttractionDetailes.AttractionDetails._id) }} fontSize="medium" style={{ cursor: 'pointer' }}/>
                                                                
                                                            </div>
                                                        </div>
                                                    }
                                                    {
                                                        (e.allAttractionDetailes.AttractionDetails === null) &&
                                                        <div className='breakBox'>
                                                            הפסקה
                                                        </div>
                                                    }
                                                </div>
                                            ))
                                    }
                                    {hours.map(
                                        hour => <div className='calendar-hour-wrapper'><div className="calendar-hour" /><div className='before' /></div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                    <IconButton disabled={endDayIndex == (dates.length - 1)} onClick={showNextWeek} aria-label="delete">
                        <ArrowBackIosNewIcon />
                    </IconButton>
                </div>



                <MDBModal tabIndex='-1' staticBackdrop show={centredModal} setShow={setCentredModal}>
                    <MDBModalDialog centered>
                        <MDBModalContent >
                            <div className='attractionName'>

                                <MDBModalHeader className='popUpData'>

                                    <div>
                                        <MDBBtn className='btn-close' color='none' disabled={disabled} onClick={toggleClose}></MDBBtn>
                                        {

                                            (attractionClicked != null) && <MDBModalTitle><div className='popUptitle'>{attractionClicked.allAttractionDetailes.AttractionDetails.Name}</div></MDBModalTitle>
                                        }
                                    </div>
                                </MDBModalHeader>
                            </div>
                            {
                                (attractionClicked != null) &&
                                <MDBModalBody className='popUpData'>
                                    <p >
                                        <div className='description'>
                                            {
                                                attractionClicked.allAttractionDetailes.AttractionDetails.Description

                                            }
                                        </div>

                                        <form className='buttonAbout' >
                                            <Button2 content="לפרטים"  onClick={(e) =>handleClick(e)} />
                                        </form>
                                        <div className='description'>
                                            סנן לפי קטגוריות ולאחר מכן לחץ על הכפתור תן לי אטרקציות:
                                        </div>
                                        {categoriesPreferences.map(({ name }, index) => {
                                            return (

                                                <div className="checkboxC" >
                                                    <input
                                                        type="checkbox"
                                                        id={`custom-checkbox-${index}`}
                                                        name={name}
                                                        value={name}
                                                        checked={checkedState[index]}
                                                        onChange={() => handleOnChange(index)}
                                                    />&nbsp;&nbsp;
                                                    <label htmlFor={`custom-checkbox-${index}`}>{name} </label>
                                                </div>
                                            );
                                        })}
                                    </p>
                                    <p className='attractionsButton'>  <Button2 content="תן לי אטרקציות" type="button" onClick={filterNotUsedAttractions}></Button2> </p>
                                    <div className='dropDown'>
                                        <Autocomplete
                                            id="combo-box-demo"
                                            options={relevantAttractions}
                                            getOptionLabel={option => option.Name}
                                            style={{ width: 300 }}
                                            renderInput={params => (

                                                <TextField {...params} label="" variant="outlined" />
                                            )}
                                            onChange={(event, newValue) => {
                                                console.log(JSON.stringify(newValue, null, ' '));
                                                setNotUsedAttractionClicked(newValue);
                                                setValue(newValue);
                                            }}
                                        />
                                    </div>
                                </MDBModalBody>
                            }
                            <MDBModalFooter>
                                <MDBBtn color='secondary' disabled={disabled} onClick={toggleClose}>
                                    סגור
                                </MDBBtn>
                                <MDBBtn onClick={updateEvent}>שמור שינויים</MDBBtn>
                            </MDBModalFooter>
                        </MDBModalContent>
                    </MDBModalDialog>
                </MDBModal>


                <MDBModal tabIndex='-1' show={centredModalDelete} setShow={setCentredModalDelete}>
                    <MDBModalDialog centered>
                        <MDBModalContent>
                            <MDBModalHeader>

                                <MDBBtn className='btn-close' color='none' onClick={toggleCloseDelete}></MDBBtn>
                            </MDBModalHeader>
                            {

                                <MDBModalBody>
                                    <p>
                                        האם אתה בטוח רוצה למחוק את האטרקציה הזו מהטיול?
                                    </p>
                                </MDBModalBody>
                            }
                            <MDBModalFooter>
                                <MDBBtn color='secondary' onClick={toggleDelete}>
                                    אישור
                                </MDBBtn>
                                <MDBBtn onClick={toggleCloseDelete}>ביטול</MDBBtn>
                            </MDBModalFooter>
                        </MDBModalContent>
                    </MDBModalDialog>
                </MDBModal>
            </div>
        </div >
    );
}

export default CalendarComponent;