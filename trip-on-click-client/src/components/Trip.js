
import { useState } from "react";
import { useEffect } from 'react'
import styled from "styled-components";
import validator from 'validator'
import Form from "react-bootstrap/Form";
import Select from "./DesignedComponents/Select";
import Input from "./DesignedComponents/Input";
import axios, { all } from 'axios'
import DistanceAndDuration from "./Map";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField, IconButton } from "@material-ui/core";
import findNearesAttraction from "./FindNearestAttraction";
import "../css/Trip.css";
import { ToastContainer, toast } from "react-toastify";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import Buttonf from "./DesignedComponents/Buttonf";
import InputDate from "./DesignedComponents/InputDate";
import { Link, renderMatches, Route, Routes, useNavigate } from 'react-router-dom'
import { usePlacesWidget } from "react-google-autocomplete";
import { getHolidays } from 'jewish-dates-core';
import logo from '../Images/logo.jpg';
import { TailSpin } from 'react-loader-spinner';
import Hebcal from 'hebcal';
import ReactDOM from 'react-dom';


export default function FilterComp2() {
    const navigate = useNavigate();
    const [errorMessageStart, setStartErrorMessage] = useState('')
    const [errorMessageEnd, setEndErrorMessage] = useState('')

    const categoriesPreferences = [{ name: "אקסטרים" }, { name: "טבע" }, { name: "תרבות" }, { name: "רחצה" }];
    const options = [
        { value: 'ילדים', label: 'ילדים' },
        { value: 'מבוגרים', label: 'מבוגרים' },
        { value: 'כלל הגילאים', label: 'כלל הגילאים' },
    ]; const [checkedState, setCheckedState] = useState(new Array(categoriesPreferences.length).fill(false));
    const areaOptions = ["צפון", "מרכז", "דרום"];
    //const distanceOptions = ["15", "30", "50", "70"];
    const [allAttractions, setAttractions] = useState([])
    //const [checkedState2, setCheckedState2] = useState(new Array(populationDesti.length).fill(false));
    const [selectedOptionDistance, setSelectedOptionDistance] = useState("");
    const [isReady, setIsReady] = useState(null);
    const [selectedOption, setSelectedOption] = useState("");
    const [commonElements, setCommonElements] = useState([]);
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    const [tripAtractions, setTripAtractions] = useState([]);
    const [hotelPlace, setPlace] = useState("");
    const [tripIsReady, setTripIsready] = useState(false);
    const [tripToDB, setTripToDB] = useState(false);
    const [selectedPop, setSelectedPop] = useState('');
    const [isValidDate, setIsValidDate] = useState(true);
    const [popTouched, setPopTouched] = useState(false);
    const [startTouched, setStartTouched] = useState(false);
    const [endTouched, setEndTouched] = useState(false);
    const [areaTouched, setAreaTouched] = useState(false);
    const [distanceTouched, setDistanceTouched] = useState(false);
    const [placeTouched, setPlaceTouched] = useState(false);
    const [categoryTouched, setCategoryTouched] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    let attractions2 = []

    const ChoosedCategories = [];
    const ChoosedArea = [];
    const ChoosedPopulation = [];
    const ChoosedDistance = [];
    const [choosedAttractions, setChoosedAttractions] = useState([]);
    const [notUsed, setNotUsed] = useState([]);
    const blockingDates = [];

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("http://localhost:8080/Attractions/");
                setAttractions(response.data);
                return setIsReady(response);

            } catch {
                return null;
            }
        }
        fetchData();

    }, []);

    useEffect(() => {
        if (commonElements.length === 0) {
            return;
        }
        distanceFilter();
    }, [commonElements]);

    useEffect(() => {
        if (tripAtractions.length === 0) {
            return;
        }
    }, [tripAtractions]);

    useEffect(() => {
        if (tripAtractions.length === 0) {
            return;
        }
    }, [tripAtractions]);

    useEffect(() => {
        if (choosedAttractions.length === 0) {
            return;
        }
        const finalLength = choosedAttractions.length;
        const finalDateForTrip = choosedAttractions[finalLength - 1].Start;
        console.log(finalDateForTrip)
        setTripIsready(true);
    }, [choosedAttractions]);

    useEffect(() => {
        if (commonElements.length == 0) {
            return;
        }
        else if (commonElements.length !== 0 && tripAtractions.length === 0) {
            toast.error("לא נמצא טיול התואם לחיפוש שהזנת. נא להזין חיפוש חלופי "
                ,
                {
                    position: toast.POSITION.TOP_LEFT,
                    autoClose: 3000,
                    className: 'toast-message',
                    onClose: () => {
                        window.location.reload();
                    },
                })
        }
    }, [tripAtractions]);

    let result = new Array();
    var getMeRandomElements = function (sourceArray, length) {
        for (var i = 0; i < length; i++) {
            result.push(sourceArray[Math.floor(Math.random() * sourceArray.length)]);
        }
        return result
    }

      
useEffect(() => {
    if (tripIsReady === false) {
        console.log("trip-false")
        return;
    }
    console.log("trip ready!")
    let choosedAttractions2 = []

    tripAtractions.map(attraction => attractions2.push(attraction._id))
    choosedAttractions.map(attraction => choosedAttractions2.push(attraction.AttractionDetails._id))

    let filteredArray = attractions2.filter((item) => !choosedAttractions2.includes(item));
    console.log(filteredArray)
    if (filteredArray.length > 10) {
        filteredArray = getMeRandomElements(filteredArray, 10);
    }
    setNotUsed(filteredArray);
}, [tripIsReady])


    useEffect(() => {
        if ((choosedAttractions.length != 0 && notUsed.length === 0 && attractions2.length !== 0) || (choosedAttractions.length === 0)) {
            return;
        }
        let user;
        async function verify() {
            user = await verifyUser();
            axios
                .post("http://localhost:8080/trips/", {
                    _id: null,
                    StartDate: startDate,
                    FinalDate: endDate,
                    Attractions: choosedAttractions,
                    AttractionsNotUsed: notUsed,
                    Name: selectedOption,
                    Image: choosedAttractions[0].AttractionDetails.Image,
                    user: user
                },
                {
                    withCredentials: true,
                }).then(response => {
                    //setLoading(true);
                    // setTimeout(() => {
                    // setLoading(false);
                    // navigate('/DayByDay', { state: { data: response.data.trip } });
                    // }, 20000);
                    navigate('/DayByDay', { state: { data: response.data.trip } });
                    console.log('after get the response');
                    console.log(response.data.trip);
                })
            setTripToDB(true)
        }
        verify();

    }, [notUsed]);

    const verifyUser = async () => {
        const { data } = await axios.post(
            "http://localhost:8080/",
            {},
            {
                withCredentials: true,
            }
        );
        if (data.status) {
            console.log(data.user);
            return data.user;
        }
        return null;
    };

    //Categories
    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );
        setCategoryValue(updatedCheckedState);
        console.log(position)
        setCheckedState(updatedCheckedState);
    };

    //Population
    const handleChangePop = (event) => {
        setPopValue(event.target.value);
        setSelectedPop(event.target.value);
    }
    console.log(selectedPop)

    //Area
    const handleChange4 = (event) => {
        setAreaValue(event.target.value)
        setSelectedOption(event.target.value);
    }
    //Distance
    const handleChange5 = (event) => {
        setDistanceValue(event.target.value)
        setSelectedOptionDistance(event.target.value);

    }

    const currentDate = new Date().toISOString().substr(0, 10);

    //Start date
    const handleChangeStartDate = (event) => {
        event.persist();

        if (!validator.isDate(event.target.value)) {
            setStartErrorMessage('נא להזין תאריך חוקי')
        } else if (event.target.value < currentDate) {
            setStartErrorMessage('לא ניתן להזין תאריך שכבר עבר')
        }
        else {
            setStartValue(event.target.value)
            setSelectedStartDate(event.target.value);
            setStartErrorMessage('');
        }

    };

    //End date

    function handleChangeEndDate(event) {
        event.persist();

        const currentDate = new Date().toISOString().substr(0, 10);
        if (!validator.isDate(event.target.value)) {
            setEndErrorMessage('נא להזין תאריך חוקי')
        }
        else if (event.target.value < currentDate) {
            setEndErrorMessage('לא ניתן להזין תאריך עבר')
        }
        else if (event.target.value < selectedStartDate) {
            setEndErrorMessage('לא ניתן להזין תאריך סיום הקודם לתאריך ההתחלה')
        }
        else {
            setEndValue(event.target.value);
            setSelectedEndDate(event.target.value);
            setEndErrorMessage('');
        }
    }

    function handleFocusEndDate(event) {
        const currentDate = new Date().toISOString().substr(0, 10);
        const minDate = selectedStartDate ? selectedStartDate : currentDate;
        event.target.setAttribute('min', minDate);
    }
    // const { ref } = usePlacesWidget({

    //     onPlaceSelected: async (place) => {
    //         console.log(place.formatted_address)

    //          const place2 = place.formatted_address
    //         // setPlace(place2)

    //         if (place.formatted_address.length !== 0) {
    //             const p = await document.getElementById("SearchLocationBox").value;
    //             setPlace(p)

    //         }
    //         setPlaceValue(place)

    //     },

    //     options: {
    //         types: ['establishment'],
    //         componentRestrictions: { country: "isr" },
    //     },

    // });

    //  const UserSearchLocation = () => {
    const { ref } = usePlacesWidget({
        onPlaceSelected: (place) => {
            const userLocation = document.getElementById("SearchLocationBox").value;
            console.log(userLocation)
            setPlace(userLocation);
            setPlaceValue(place)

        },
        options: {
            types: ['establishment'],
            componentRestrictions: { country: "isr" },
        },

    }
    );

    console.log(hotelPlace)


    const filterAllAtractions = async () => {
        areaFilter();
        categoriesFilter();
        poupulationFilter();
        findCommonElements();
    }
    const areaFilter = async () => {
        allAttractions.filter(item => {
            if (item.Area === selectedOption) {
                ChoosedArea.push(item);
            }
        });
    }

    const categoriesFilter = async () => {

        if (checkedState[0] === true) {
            allAttractions.filter(item => {
                if (item.Category === 'אקסטרים') {
                    ChoosedCategories.push(item);
                }
            });
        }
        if (checkedState[1] === true) {
            allAttractions.filter(item => {
                if (item.Category === 'טבע') {
                    ChoosedCategories.push(item);
                }
            });

        }
        if (checkedState[2] === true) {
            allAttractions.filter(item => {
                if (item.Category === 'תרבות') {
                    ChoosedCategories.push(item);

                }
            });

        }
        if (checkedState[3] === true) {
            allAttractions.filter(item => {
                if (item.Category === 'רחצה') {
                    ChoosedCategories.push(item);

                }
            });

        }

        else
            return
    }

    const poupulationFilter = async () => {

        if (selectedPop === "ילדים") {
            allAttractions.filter(item => {
                if (item.DestiPopulation === 1) {
                    ChoosedPopulation.push(item);

                }
            });
        }


        else if (selectedPop === "מבוגרים") {
            allAttractions.filter(item => {
                if (item.DestiPopulation === 2) {
                    ChoosedPopulation.push(item);

                }
            });
        }
        else if (selectedPop === "כלל הגילאים") {
            allAttractions.filter(item => {
                if ((item.DestiPopulation = 3) || (item.DestiPopulation = 2) || (item.DestiPopulation = 1)) {
                    ChoosedPopulation.push(item);

                }
            });

        }

        else
            return
    }
    function findCommonElements() {

        const final = ChoosedArea.filter(element => ChoosedCategories.includes(element) && ChoosedPopulation.includes(element));
        setCommonElements(final);

    }
    const distanceFilter = async () => {
        let i;
        console.log(hotelPlace)
        for (i = 0; i < commonElements.length; i++) {

            const item = commonElements[i]
            const address = (item.Address.Street + "  " + item.Address.Number + "  " + item.Address.City)
            const res = await (DistanceAndDuration(hotelPlace, address));
            const dis = res.distance.toString();
            
            if (parseInt(dis) <= parseInt(selectedOptionDistance)) {

                ChoosedDistance.push(item);

            }
        }
        setTripAtractions(ChoosedDistance);
    }

    const startDate = new Date(selectedStartDate);
    const endDate = new Date(selectedEndDate);

    //Blocked days for travel
    const hebrewyear = new Date();
    const hebrewDate = new Hebcal.HDate(hebrewyear);
    const currentHebrewYear = hebrewDate.getFullYear();

    const year = currentHebrewYear;
    const filteredHolidays = [];
    let gregorianDates = []
    let holidaysFronHebcal = Hebcal(year).holidays;
    const holidays = Object.keys(holidaysFronHebcal).map((key) => holidaysFronHebcal[key]);
    for (let i = 0; i < holidays.length; i++) {
     
        for (let j = 0; j < holidays[i].length; j++) {

            if ((holidays[i][j].desc[0] == "Rosh Hashana 1") || (holidays[i][j].desc[0] == "Rosh Hashana 2") ||
                (holidays[i][j].desc[0].includes("Yom Kippur")) || (holidays[i][j].desc[0] == "Sukkot: 1") ||
                (holidays[i][j].desc[0] == "Shmini Atzeret") || (holidays[i][j].desc[0] == "Pesach: 1") ||
                (holidays[i][j].desc[0] == "Pesach: 7") || (holidays[i][j].desc.includes("Shavuot 1"))) {
                filteredHolidays.push(holidays[i]);
            }
        }
    }
    const onlyDates = filteredHolidays.map(item => item[0].date);
    onlyDates.forEach((hebcalDate) => {
        gregorianDates.push(hebcalDate.greg());
    });
    gregorianDates.forEach((date, index) => {
        let isDuplicate = false;
        for (let i = 0; i < index; i++) {
            if (date.getTime() === gregorianDates[i].getTime()) {
                isDuplicate = true;
                break;
            }
        }
        if (!isDuplicate) {
            blockingDates.push(date);
        }
    });
    var getDaysArray = function (start, end) {
        for (var arr = [], dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
            arr.push(new Date(dt));
        }
        return arr;
    };


    var days = []
    days = getDaysArray(new Date(startDate), new Date(endDate));
    days.map((v) => v.toUTCString().slice(0, 10)).join("")
    var lenDays = days.length

    let origin = hotelPlace
    console.log(origin)
    const temp = []

    useEffect(() => {
        if (tripAtractions.length === 0)
            return;
        Scheduling();

    }, [tripAtractions])
    let tripAtractions2 = [...tripAtractions];

    let Attractions = []

    //This function is main and slots attractions for the trip
    const Scheduling = async () => {

        Attractions = [...tripAtractions2];
        let start = new Date(startDate);
        let limit = new Date(endDate)
        limit.toLocaleDateString()
        start.setHours(9);
        limit.setHours(20);
        const end = endDate;
        end.setHours(23, 0, 0, 0);
        let length = lenDays
        const date = new Date();

        //loop that goes through the days
        outerloop:
        for (let i = 0; i < length; i++) {

            if (i > 0) {
                start.setDate(start.getDate() + 1)
            }
            console.log(start.getDate(), end.getDate())
            if (start.getDate() > end.getDate() && start.getMonth() === end.getMonth()) {
                break outerloop;
            }
            start.setHours(9, 0, 0, 0)

            //if start date is today
            if (i === 0 && startDate.getDate() === date.getDate() && date.getHours() > 9) {
                start.setHours(date.getHours())
            }
            var dayOfWeek = start.getDay();
            //for saturday
            if ((dayOfWeek === 6) && ((start.getDate() < end.getDate()) || (start.getMonth() < end.getMonth()))) {
                start.setHours(start.getHours() + 24)
            }

            else if ((dayOfWeek == 6) && (start.getDate() === end.getDate())) {
                break outerloop;
            }
            //for friday
            for (let i = 0; i < blockingDates.length; i++) {
                if (start.getDate() == blockingDates[i].getDate() && start.getDay() !== 5 && start.getMonth() == blockingDates[i].getMonth() && (start.getDate() < end.getDate())) {
                    start.setHours(start.getHours() + 24)
                }
                else if (start.getDate() == blockingDates[i].getDate() && start.getDay() === 5 && start.getMonth() == blockingDates[i].getMonth() && (start.getDate() < end.getDate())) {
                    start.setHours(start.getHours() + 48)
                }
                else if (start.getDate() == blockingDates[i].getDate() && start.getMonth() == blockingDates[i].getMonth() && (start.getDate() === end.getDate())) {
                    console.log(end)
                    break outerloop;

                }
            }
            limit.setDate(end.getDate())
            limit.setMonth(end.getMonth())
            console.log(limit)
            limit.setHours(20, 0, 0, 0)
            var dayOfWeek = start.getDay();

            origin = hotelPlace
            let extremeFlag = 0;
            let natureFlag = 0;
            let waterFlag = 0;
            let cultureFlag = 0;

            //attractions for Scheduling
            let attractions = Attractions

            if (attractions.length == 0)
                break;

            if (dayOfWeek === 5) {
                limit.setDate(start.getDate())
                limit.setMonth(limit.getMonth())
                limit.setHours(13)
            }
            console.log(start.getDay(), start)
            //this loop goes through the inlays for each day
            interloop:
            while (start < limit && start.getHours() < limit.getHours()) {
                console.log(start.getDay(), start)

                //prevents readings of more than 25 for maps
                let lessThan25 = new Array();

                var getMeRandomElements2 = function (sourceArray, length) {
                    for (var i = 0; i < length; i++) {
                        lessThan25.push(sourceArray[Math.floor(Math.random() * sourceArray.length)]);

                    }
                    return lessThan25
                }
                if (attractions.length > 24) {
                    attractions = getMeRandomElements2(attractions, 25)
                }
                let travelTime = 0.5;
                //await new Promise((resolve) => setTimeout(resolve, 1000));
                let fitAttractions = attractions.filter(attraction => (parseFloat(attraction.OpeningHours.split(":")[0]) < start.getHours() + travelTime) && (parseFloat(attraction.ClosingHours.split(":")[0]) >= start.getHours() + travelTime + attraction.HoursNum))
                let strAttractions = fitAttractions.map((attraction => attraction.Address.Street + " + " + attraction.Address.Number + " + " + attraction.Address.City))
                console.log(fitAttractions)
                if(fitAttractions.length===0){
                    break interloop;
                }
                //find nearest attraction
                let index = ((await findNearesAttraction(origin, strAttractions)).minDistanceAddressIndex);
                await new Promise((resolve) => setTimeout(resolve, 1000));

                let current = fitAttractions[index]
                let currentString = current.Address.Street + " + " + current.Address.Number + " + " + current.Address.City
                let DisAndDur = (await DistanceAndDuration(origin, currentString));
                await new Promise((resolve) => setTimeout(resolve, 1000));

                let duration = DisAndDur.duration;
                let distance = DisAndDur.distance;

                start.setSeconds(start.getSeconds() + duration)
                let savedValue = new Date(start)
                savedValue.setHours(savedValue.getHours() + 2)
                console.log(start, savedValue)

                //Rounding hours for obj
                if (savedValue.getMinutes() >= 0 && savedValue.getMinutes() < 8) {
                    savedValue.setMinutes(0)
                }
                else if (savedValue.getMinutes() >= 8 && savedValue.getMinutes() <= 15) {
                    savedValue.setMinutes(15)
                }
                else if (savedValue.getMinutes() > 15 && savedValue.getMinutes() < 22) {
                    savedValue.setMinutes(15)
                }
                else if (savedValue.getMinutes() >= 22 && savedValue.getMinutes() < 30) {
                    savedValue.setMinutes(30)
                }
                else if (savedValue.getMinutes() > 30 && savedValue.getMinutes() < 38) {
                    savedValue.setMinutes(30)
                }
                else if (savedValue.getMinutes() >= 38 && savedValue.getMinutes() <= 45) {
                    savedValue.setMinutes(45)
                }
                else if (savedValue.getMinutes() > 45 && savedValue.getMinutes() < 53) {
                    savedValue.setMinutes(45)
                }
                else if (savedValue.getMinutes() >= 53 && savedValue.getMinutes() <= 59) {
                    savedValue.setHours(savedValue.getHours() + 1);
                    savedValue.setMinutes(0);
                }

                //ready attraction
                const obj = {
                    AttractionDetails: current,
                    Break: {
                        HoursNum: null,
                        End: null
                    },
                    Start: savedValue,
                    TravelTimeFromPrev: duration,
                    DistanceFromPrev: distance,
                };

                start.setMinutes(savedValue.getMinutes())
                start.setHours(savedValue.getHours() - 2)


                console.log(obj)
                temp.push({ ...obj });
                if (obj.AttractionDetails.Category === 'אקסטרים') { extremeFlag += 1 }
                else if (obj.AttractionDetails.Category === 'רחצה') { waterFlag += 1 }
                else if (obj.AttractionDetails.Category === 'תרבות') { cultureFlag += 1 }
                else if (obj.AttractionDetails.Category === 'טבע') { natureFlag += 1 }
                console.log(extremeFlag, waterFlag, cultureFlag)
                start.setSeconds(start.getSeconds() + current.HoursNum * 3600)
                origin = current.Address.Street + " + " + current.Address.Number + " + " + current.Address.City
                let index2 = Attractions.findIndex(item => item._id === obj.AttractionDetails._id);

                if (index2 !== -1) {
                    Attractions.splice(index2, 1);
                }

                attractions = Attractions.filter(attraction => parseFloat(attraction.OpeningHours.split(":")[0]) < start.getHours() && parseFloat(attraction.ClosingHours.split(":")[0]) > start.getHours() + travelTime + attraction.HoursNum)
                //Prevents identical categories from being checked on the same day
                if (extremeFlag > 0) {
                    attractions = attractions.filter(attraction => attraction.Category !== 'אקסטרים')
                }
                if (waterFlag > 0) {
                    attractions = attractions.filter(attraction => attraction.Category !== 'רחצה')
                }
                if (cultureFlag > 0) {
                    attractions = attractions.filter(attraction => attraction.Category !== 'תרבות')
                }
                if (natureFlag > 0) {
                    attractions = attractions.filter(attraction => attraction.Category !== 'טבע')
                }



                if (attractions.length === 0)

                    break interloop;

            }


        }
        console.log(temp)
        setChoosedAttractions(temp)
        if (temp.length === 0) {
            toast.error("לא נמצא טיול התואם לחיפוש שהזנת. נא להזין תאריך חלופי  "
                ,
                {
                    position: toast.POSITION.TOP_LEFT,
                    autoClose: 3000,
                    className: 'toast-message',
                    onClose: () => {
                        window.location.reload();
                    },
                })
        }

    }


    const [PopValue, setPopValue] = useState('');
    const [AreaValue, setAreaValue] = useState('');
    const [DistanceValue, setDistanceValue] = useState('');
    const [StartValue, setStartValue] = useState('');
    const [EndValue, setEndValue] = useState('');
    const [PlaceValue, setPlaceValue] = useState('');
    const [CategoryValue, setCategoryValue] = useState('');

    function handleClick(e) {
        e.preventDefault();
        if (isPopValid && isAreaValid && isDistanceValid && isEndValid && isStartValid && isCategoryalid && isPlaceValid)
            setLoading(true)

        setPopTouched(true);
        setAreaTouched(true);
        setStartTouched(true);
        setEndTouched(true);
        setDistanceTouched(true);
        setPlaceTouched(true);
        setCategoryTouched(true);
        setSubmitted(true);

        filterAllAtractions();
    }

    let allFalse = []
    const isPopValid = PopValue !== '';
    const isAreaValid = AreaValue !== '';
    const isDistanceValid = DistanceValue !== '';
    const isStartValid = StartValue !== '';
    const isEndValid = EndValue !== '';
    if (CategoryValue.length != 0) {
        allFalse = CategoryValue.every(item => !item);
    }
    const isCategoryalid = !allFalse;
    const isPlaceValid = PlaceValue !== '';

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
                navigate("/login");
            }

        };
        verifyUser();
    })


    return (
        <div>
            {

                isLoading ?

                    <div className="loading">
                        <div className="items-loading">
                            <div className="">
                                <img src={logo} width="400vw" height="400vh"></img>
                            </div>
                            <div className="">
                                <TailSpin
                                    heigth="500%"
                                    width="100%"
                                    color='green'
                                    ariaLabel='loading'
                                />
                            </div>
                        </div>
                        <ToastContainer />
                        <div className="overture">       <h1>...יוצרים לכם טיול מהחלומות</h1>

                        </div>

                    </div>

                    :
                    <div className="logandreg2">

                        <Form >
                            <MainContainer>


                                <div class="testbox">

                                    <input class="input3" type="text" ref={ref} style={{ width: "50%" }} placeholder="הזן מיקום" id="SearchLocationBox" />
                                    <br></br>
                                    <br></br>
                                    {submitted && !isPlaceValid && <p class="placeValid" >נא להזין מיקום</p>}

                                    &nbsp;<span class="required"></span>  תאריך התחלה
                                    <input type="date" id="date-input"
                                        onBlur={handleChangeStartDate}
                                        class="inputDate"
                                        min={new Date().toISOString().substr(0, 10)} required />


                                    <span class="required"></span >  תאריך סיום
                                    <label htmlFor="date-input"></label>
                                    <input
                                        type="date"
                                        onFocus={handleFocusEndDate}
                                        id="date-input"
                                        class="inputDate"
                                        onBlur={handleChangeEndDate} required
                                    />

                                    <br></br>
                                    <br></br>
                                    <div class="startValid">{errorMessageStart}</div>
                                    <div class="endValid">{errorMessageEnd}</div>
                                    {submitted && !isStartValid && <p class="startValid" >נא להזין תאריך התחלה</p>}
                                    {submitted && !isEndValid && <p class="endValid" >נא להזין תאריך סיום</p>}



                                    <select value={selectedOption} onChange={handleChange4} required class="select2">
                                        <option class="slide" value=""><b>בחר אזור</b></option>
                                        <option class="slide" value="צפון">צפון</option>
                                        <option class="slide" value="מרכז">מרכז</option>
                                        <option class="slide" value="דרום">דרום</option>
                                    </select>

                                    <select class="select2" value={selectedOptionDistance} onChange={handleChange5}>
                                        <option class="slide" value=""><b>בחר מרחק מקסימלי לאטרקציות</b></option>
                                        <option class="slide" value="30000">עד 30 ק"מ</option>
                                        <option class="slide" value="40000">עד 40 ק"מ</option>
                                        <option class="slide" value="50000">עד 50 ק"מ</option>
                                        <option class="slide" value="70000">עד 70 ק"מ</option>
                                    </select>
                                    <br></br>
                                    {submitted && !isAreaValid && <p class="areaValid" >נא להזין אזור מבוקש</p>}

                                    {submitted && !isDistanceValid && <p class="dicValid" >נא להזין מרחק מקסימלי</p>}

                                    <br></br>



                                    <span></span><h7> בחר אטרקציות עבור:</h7>

                                    <div>
                                        {options.map(option => (
                                            <label key={option.value}>

                                                <input
                                                    class="radioPop"
                                                    type="radio"
                                                    name="options"
                                                    value={option.value}
                                                    checked={selectedPop === option.value}
                                                    onChange={handleChangePop}
                                                    onBlur={() => setPopTouched(true)}

                                                />
                                                {option.label}
                                            </label >
                                        ))}
                                    </div>
                                    <br></br>

                                    {submitted && !isPopValid && <p class="popValid" >נא להזין אוכלוסיית יעד</p>}

                                    <span class="required"></span> בחר את סוגי האטרקציות:

                                    {categoriesPreferences.map(({ name }, index) => {
                                        return (

                                            <div className="checkbox">
                                                <input
                                                    type="checkbox"
                                                    class="attOptions"
                                                    id={`custom-checkbox-${index}`}
                                                    name={name}
                                                    value={name}
                                                    checked={checkedState[index]}
                                                    onChange={() => handleOnChange(index)}
                                                />
                                                <label htmlFor={`custom-checkbox-${index}`}>{name} </label>
                                            </div>
                                        );
                                    })}
                                    <br></br>
                                    {submitted && !isCategoryalid && <p class="popValid" >נא להזין סוגי אטרקציות</p>}
                                    <ToastContainer />

                                    <div>
                                        <ButtonContainer>

                                            <Buttonf content="צור טיול" onClick={handleClick} >  </Buttonf>
                                        </ButtonContainer>

                                    </div>
                                </div>
                            </MainContainer>


                        </Form>
                        <ToastContainer rtl={true} />
                    </div>

            }
        </div>

    );

}

const MainContainer = styled.div`

 direction: rtl;
 margin-top:10vh;
 margin-bottom:14vh;
 padding-right:10vh;
  padding-left:10vh;
 padding-top:5vh;

 //width: fit-content;
background: rgba(255, 255, 255, 0.15);
box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
backdrop-filter: blur(8.5px);
-webkit-backdrop-filter: blur(8.5px);
border-radius: 10px;

color: #3c354e;
font-weight: bold;
text-transform: uppercase;
letter-spacing: 0.4rem;
    @media only screen and (min-width: 768px) {
    width: 55vw;
    height:117vh;

    }



`;

const ButtonContainer = styled.div`

width: 70%;
display: flex;
align-items: center;
margin-right: 7vw;
justify-content: center;
`;