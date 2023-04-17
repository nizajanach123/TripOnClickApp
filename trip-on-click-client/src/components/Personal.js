import React from 'react';
import styled from "styled-components";
import CardT from './Card';
import "../css/Personal.css";
import axios from "axios";
import  { useState, useEffect } from 'react';
import Button from './DesignedComponents/Button';
import {  useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function Personal() {
    const [userTrips, setUserTrips] = useState([]);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies([]);

    useEffect(() => {
        async function getUserConnected() {
            let { data } = await axios.post(
                "http://localhost:8080/",
                {},
                {
                    withCredentials: true,
                }
            );
            if(data.status){
                console.log(data.user._id);
                setUserId(data.user._id);
            }
            else{
                navigate("/login");
            }
        }
        getUserConnected();
    }, []);

    useEffect(() => {
        async function getUserTrips() {
            if (userId === null)
                return;
            const { data } = await axios.get(`http://localhost:8080/users/${userId}/trips`);
            setUserTrips(data);
            console.log(data);
        }
        getUserTrips()
    }, [userId]);

    useEffect(() => {
        const verifyUser = async () => {
            console.log("hii")
            const { data } = await axios.post(
                "http://localhost:8080/",
                {},
                {
                    withCredentials: true,
                }
            );
            if (!data.status) {
               localStorage.clear();
                removeCookie("jwt");
                navigate("/login");
            }

        };
        verifyUser();
    })


const [date, setDate] = useState();

const deleteTrip =async(tripId)=>{
    const id=tripId;
    const {data} = await axios.post(`http://localhost:8080/trips/delete/${id}/${userId}`);
    const newData = userTrips.filter(item => item._id !== id);
    setUserTrips(newData);
    console.log(data)
}

    return (
        <div >
             
            <h3 className='per'>איזור אישי</h3>
            <div className='but'>
            <Button   content="יצירת טיול" type="submit" onClick={() => navigate("/Trip")}>יצירת טיול</Button>
            </div>
            <div class='allCard'>
               
                    {

                        userTrips.map((Item) => {
                            const d = Item.StartDate;
                            let text = d.toString();
                            console.log(text);    
                            const [year, month, day] = text.substring(0, 10).split('-');
                            console.log(`${day}/${month}`)
                            let currentId = Item._id;
                           
                             
                            return (
                     
                                    <div  id='item ' class="col-lg-3 mb-4 ">
                                          <CardT func={deleteTrip} id={currentId} header={`${day}/${month}`} middel={Item.Name} img={Item.Image}  className='card' style={{  display:'inline-block' }}  ></CardT>
                                    </div>
                                 
                           
                          
                           
                            )
                        }
                        )}
                </div>
            </div>
    );
}

const per = styled.h3`
margin: 1rem 0 1rem 0;
color:green ;
`;


export default Personal;